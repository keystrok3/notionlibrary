//auth controllers
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const send_email = require('../utils/email');



/** 
 * Register a new user and send email 
 * prompting them to confirm their provided email address
 */ 
const register = async (req, res, next) => {

    const { email, firstName, lastName, password } = req.body;

    // Generate JWT token
    const secret = process.env.JWT_SECRET;
    const expiresIn = '1d';
    const payload = {
        email: email,
        expiresIn: Math.floor(Date.now() / 1000) + expiresIn
    }
    const confirmationToken = jwt.sign(payload, secret, { expiresIn });


    const registrationDate = Date.now();  // milliseconds since Jan 1 1970. Used to check for elapsed time

    try {

        const user = await User.create({
            email: email, 
            firstName: firstName, 
            lastName: lastName, 
            password: password,
            registrationDate: registrationDate,
            emailConfirmationToken: confirmationToken
        });

        try {
            await sendMail(confirmationToken, email, 'Email Confirmation');
        } catch (error) {
            console.log('Could not send confirmation email');
        }

        res.status(201).json({ success: true, user });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, msg: error });
    }
};


/**
 * Allows user to confirm that email provided is indeed users
 * */ 
const confirm_email = async (req, res, next) => {
    const confirmationToken = req.params.confirmationToken;

    const jwt_verify = jwt.verify(confirmationToken, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            return res.status(401).json({ success: false, msg: "Confirmation failed"})
        }
    });

    try {
        
        const user = await User.findOne({ where: { emailConfirmationToken: confirmationToken }});

        if(!user) {
            return res.status(404).json({ success: false, msg: "Failed to confirm"});
        }

        user.emailConfirmationToken = null;
        user.confirmationStatus = true;

        await user.save();
        res.status(201).json({ success: true, msg: "Confirmed email" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Could not confirm email"})
    }
};


/**
 * Login controller
 * */ 
const login = async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(404).json({ success: false, msg: "Enter email or password"});
    }

    try {
        const user = await User.findOne({ where: { email: email }});

        if(!user) {
            return res.status(404).json({ success: false, msg: "Enter correct credentials" });
        }

        // Check password
        const correctPassword = await user.comparePassword(password);
        if(correctPassword === false) {
            return res.status(401).json({ success: false, msg: "Wrong password" });
        }

        req.session.user = {
            email: user.email,
            confirmed: user.confirmationStatus,
        }
        let session_data = req.session;
        res.status(200).json({ success: true,  session_data })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Server error" });
    }

};


/**
 * Sends request to send password request token
 * */ 

const forgot_password = async (req, res, next) => {
    const { email } = req.body;

    // Generate JWT token
    const secret = process.env.JWT_SECRET;
    const expiresIn = '30min';
    const payload = {
        email: email,
        expiresIn: Math.floor(Date.now() / 1000) + expiresIn
    }
    const resetPasswordToken = jwt.sign(payload, secret, { expiresIn });

    try {


        const user = await User.findOne({ where: { email: email } });

        if(user) {
            user.passwordResetToken = resetPasswordToken;
            await user.save();
        }

        // Send email
        await send_email({ 
            to: email,
            subject: "Reset Password",
            text: `
                <h1>You requested to change your password </h1>
                <p>Click on this link to change your password</p>
                <a href='http://localhost:${process.env.PORT}/api/auth/resetpassword/${resetPasswordToken}'>Link</>
            `
        });

        res.status(201).json({ success: true, msg: "Email sent" });

    } catch (error) {
        console.log(error);

        res.status(500).json({ success: false, msg: "Server error" });
    }
};


/**
 * User a jwt token to identify an account to change the password column of
 * 
*/

const reset_password = async(req, res, next) => {
    const { resetToken } = req.params;
    const { password } = req.body;

    try {
        console.log(resetToken)
        const user = await User.findOne({ where: { passwordResetToken: resetToken }});

        if(user) {
            user.password = password;
            user.resetPasswordToken = null;
            await user.save();

            return res.status(201).json({ success: true, msg: "Password Changed" });
        }
    } catch (error) {
        console.log(error);

        res.status(500).json({ success: false, msg: "Server Error" });
    }
}

const sendMail = async (token, email, subject) => {
    const confirmationUrl = `http://localhost:${process.env.PORT}/${token}`;

    const message = `
        <h1>Thank you for signing up!</h1>
        <p> Please confirm your email address by clicking on this link: </p>
        <a href=${confirmationUrl} clicktracking=off> Confirm Email </a>
    `;

    try {
        await send_email({
            to: email, 
            subject: subject,
            text: message
        })
    } catch (error) {
        console.log(error);
    }
};

module.exports = { register, confirm_email, login, forgot_password, reset_password };