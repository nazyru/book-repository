const books = require('../books');

const getAllBooks = (req, res) => {
    res.json(books);
}

const getBookById = (req, res) => {
    const id = req.params.id;
    const book = books.find(book => book.id == id);
    if (book) res.send(book);
    else res.status(204).send({message:`No book found with id of ${id}`});
}

const updateBook = (req, res) => {
    const payload = req.body;
    const id = req.params.id;
    const index = books.findIndex(book => book.id == id);
    if (index < 0) {
        return res.status(400).send({message: `Book with Id ${id} is not found`});
    } 

    console.log(`Book index ${index}`)
    books[index] = payload;
    res.send(payload);
}

const createBook = (req, res) => {
    const payload = req.body;
    const newBook = {id: books.length + 1, ...payload}
    books.push(newBook);
    res.send(newBook);
}

module.exports = {getAllBooks, getBookById, updateBook, createBook}