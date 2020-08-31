const express = require('express');
const router = express.Router();
const BooksController = require('../controllers/BooksController');
const Validator = require('../middlewares/BookValidator');

//get all books
router.get('/', BooksController.getAllBooks);

//get by id
router.get('/:id', BooksController.getBookById);

//update a book
router.put('/:id', Validator, BooksController.updateBook);

//create a new book
router.post('/', Validator, BooksController.createBook);


module.exports = router;