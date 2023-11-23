
/**
 * Checks that logged in user has confirmed email
*/
function email_confirmed(req, res, next) {

    if(req.session.user && req.session.user.confirmationStatus) {
        return next();
    }

    return res.status(401).json({ success: false, msg: "Please confirm you email address."});
}

module.exports = { email_confirmed };
