// authentication routes: register, login, confirmemail, resetpassword

const express = require('express');

const { register, confirm_email, login, forgot_password, reset_password } = require('../controllers/auth');
const { admin_route, email_confirmed_route } = require('../controllers/protected');
const { isAdmin } = require('../middleware/isAdmin');
const { email_confirmed } = require('../middleware/emailConfirmed');


const router = express.Router();


router.route('/register').post(register);

router.route('/confirmemail/:confirmationToken').put(confirm_email);

router.route('/login').post(login);

router.route('/forgotpassword').post(forgot_password);

router.route('/resetpassword/:resetToken').put(reset_password);

router.route('/amadmin').get(isAdmin, admin_route);

router.route('/emailconfirmed').get(email_confirmed, email_confirmed_route);

module.exports = router;