
const express = require('express');
const { add_new_book } = require('../controllers/books');


const router = express.Router();

// routes
router.route('/newbook').post(add_new_book);

module.exports = router;