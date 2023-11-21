// authentication routes: register, login, confirmemail, resetpassword

const express = require('express');
const { register, confirm_email, login } = require('../controllers/auth');

const router = express.Router();



router.route('/register').post(register);

router.route('/confirmemail/:confirmationToken').put(confirm_email);

router.route('/login').post(login);

module.exports = router;