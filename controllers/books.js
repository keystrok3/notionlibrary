const Books = require("../models/books");

/**
 * Add a new book collection not previously avaiable in db
*/
const add_new_book = async (req, res, next) => {
    const { title, isbn, author, number_available } = req.body;

    try {
        const book = Books.create({
            title: title,
            isbn: isbn,
            author: author,
            number_available: number_available
        });

        res.status(201).json({ success: true, book });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
    }
};


module.exports = { add_new_book };