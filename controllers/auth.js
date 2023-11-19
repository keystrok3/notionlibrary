//auth controllers
const User = require('../models/user');

const register = async (req, res, next) => {

    const { email, firstName, lastName, password } = req.body;

    const registrationDate = Date.now();  // milliseconds since Jan 1 1970. Used to check for elapsed time

    try {

        const user = await User.create({
            email: email, 
            firstName: firstName, 
            lastName: lastName, 
            password: password,
            registrationDate: registrationDate

        });

        res.status(201).json({ success: true, user });

    } catch (error) {
        res.status(500).json({ success: false, msg: error });
    }
};


module.exports = { register };