const Books = require("../models/books");

/**
 * Add a new book collection not previously avaiable in db
*/
const add_new_book = async (req, res, next) => {
    const { title, isbn, author, number_available } = req.body;

    try {
        const book = await Books.create({
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

/**
 * Add new copy of a book
*/
const add_new_copies = async (req, res, next) => {
    const { isbn, quantity } = req.body;

    try {
        const book = await Books.findOne({ where: { isbn: isbn }});

        if(book === null) {
            return res.status(200).json({ success: false, msg: "No book by that isbn" });
        }

        book.number_available += parseInt(quantity);
        await book.save();

        res.status(200).json({ success: true, book });
    } catch (error) {

        console.log(error);
        res.status.json({ success: false, msg: "Server Error" });
    }
}

/**
 * Get entire list of books
*/
const show_all_books = async (req, res, next) => {

    try {
        const books = await Books.findAll();

        res.status(200).json({ success: true, data: books });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, data: "Server Error" });
    }
}

/**
 * Find book by title
 * request using request parameters
*/
const find_by_title = async (req, res, next) => {
    const { title } = req.params;
    console.log('\n\n\n',title)
    try {
        const book = await Books.findOne({ where: { title: title } });

        if(book === null) {
            return res.status(404).json({
                success: false, msg: "No book by that title"
            });
        }

        res.status(200).json({ success: true, book });
    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, msg: "Server Error" });
    }
}


module.exports = { 
    add_new_book, 
    show_all_books, 
    find_by_title, 
    add_new_copies 
};