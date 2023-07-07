/*
Name: Agam Patel
ID: 301277925
Course code: COMP 229
Course name: Web Application Development
*/

// modules required for routing

var importDefault = (this && this.importDefault) || function(mod){
  return (mod && mod._esModule ? mod : {"default" : mod});
}

let express = require('express');
let router = express.Router();
let mongoDB = require('mongoose');

// define the book model
let myBook = importDefault(require('../models/books'));

/* GET books List page. READ */
router.get('/', (req, res, next) => {
// find all books in the books collection
myBook.default.find((err, books) => {
  if (err) {
    return console.error(err);
  }
  else {
    res.render('books/index', {
      title: 'Books',
      books: books
    });
  }
});

});

// GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  res.render('books/details', {title: 'Add Book', page: 'books', books: ''});

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
let newBook = new myBook.default({
    "Title": req.body.title,
    "Description": "",
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
});
myBook.default.create(newBook, (err) => {
    if (err) {
        console.error(err);
        res.end(err);
    }
    res.redirect('/books');
});
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
let id = req.params.id;
myBook.default.findById(id, {}, {}, (err, bookItemToEdit) => {
    if (err) {
        console.error(err);
        res.end(err);
    }
    res.render('books/details', { title: 'Edit', page: 'books', books: bookItemToEdit });
});
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
let id = req.params.id;
let editBookItem = new myBook.default({
    "_id": id,
    "Title": req.body.title,
    "Description": "",
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
});
myBook.default.updateOne({ _id: id }, editBookItem, {}, (err) => {
    if (err) {
        console.error(err);
        res.end(err);
    }
    res.redirect('/books');
});
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
let id = req.params.id;
myBook.default.remove({ _id: id }, (err) => {
    if (err) {
        console.error(err);
        res.end(err);
    }
    res.redirect('/books');
});
});

module.exports = router;
