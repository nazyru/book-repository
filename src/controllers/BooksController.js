const books = require('../books');

const getAllBooks = (req, res) => {
    res.json(books);
}

const getBookById = (req, res) => {
    const id = req.params.id;
    const book = books.find(book => book.id == id);
    if (book) res.send(book);
    else res.status(404).send({message:`No book found with id of ${id}`});
}

const updateBook = (req, res) => {
    const payload = req.body;
    const id = req.params.id;
    const index = books.findIndex(book => book.id == id);
    if (index < 0) {
        return res.status(404).send({message: `Book with Id ${id} is not found`});
    } 

    books[index] = payload;
    res.send(payload);
}

const createBook = (req, res) => {
    const payload = req.body;
    const newBook = {id: books.length + 1, ...payload}
    books.push(newBook);
    res.status(201).send(newBook);
}

const searchBooks = (req, res) => {
    let searchText = req.query.query;
    if (!searchText) return getAllBooks(req, res);

    const filteredBooks = books.filter(book => containsIgnoreCase(book.title, searchText) 
                                ||  containsIgnoreCase(book.description, searchText)
                                || containsIgnoreCase(book.isbn, searchText));

    res.send(filteredBooks);
}

const containsIgnoreCase = (source, value) => {
    source = source.toLowerCase();
    value = value.toLowerCase();

    return source.search(value) >= 0;
}

module.exports = {getAllBooks, getBookById, updateBook, createBook, searchBooks}