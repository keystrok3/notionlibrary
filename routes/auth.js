// authentication routes: register, login, confirmemail, resetpassword

const express = require('express');

const { register, confirm_email, login, forgot_password, reset_password } = require('../controllers/auth');


const router = express.Router();


router.route('/register').post(register);

router.route('/confirmemail/:confirmationToken').put(confirm_email);

router.route('/login').post(login);

router.route('/forgotpassword').post(forgot_password);

router.route('/resetpassword/:resetToken').put(reset_password);

module.exports = router;