

/**
 * Checks that the request is coming from an account with
 * 'admin' role
 * */ 
function isAdmin(req, res, next) {
    console.log(req.session)
    if(req.session.user && req.session.user.role === "admin") {
        return next()
    }

    return res.status(401).json({ success: false, msg: "Admin only" });
}

module.exports = { isAdmin };