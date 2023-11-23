
const email_confirmed_route = (req, res) => {

    return res.status(200).json({ success: true, msg: "Email Confimed!" });
};


const admin_route = (req, res) => {
    return res.status(200).json({ success: true, msg: "You're admin!" });
};


module.exports = { email_confirmed_route, admin_route };