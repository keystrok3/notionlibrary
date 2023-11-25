
const express = require('express');
const { add_new_book, show_all_books, find_by_title, add_new_copies } = require('../controllers/books');


const router = express.Router();

// routes
router.route('/newbook').post(add_new_book);

router.route('/allbooks').get(show_all_books);

router.route('/findbytitle/:title').get(find_by_title);

router.route('/addnewcopies').post(add_new_copies);

module.exports = router;