// modules required for routing

var importDefault = (this && this.importDefault) || function(mod){
    return (mod && mod._esModule ? mod : {"default" : mod});
}

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book1 = importDefault(require('../models/books'));

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book1.default.find( (err, books) => {
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

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    res.render('books/details',{title: 'Add Book', page: 'books', books:''});

});

router.post('/add', (req, res, next) => {
  let newBook = new book1.default({
      "Title": req.body.title,
      "Description": "",
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
  });
  book1.default.create(newBook, (err) => {
      if (err) {
          console.error(err);
          res.end(err);
      }
      res.redirect('/books');
  });
});
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  book1.default.findById(id, {}, {}, (err, bookItemToEdit) => {
      if (err) {
          console.error(err);
          res.end(err);
      }
      res.render('books/details', { title: 'Edit', page: 'books', books: bookItemToEdit });
  });
});
router.post('/:id', (req, res, next) => {
  let id = req.params.id;
  let editBookItem = new book1.default({
      "_id": id,
      "Title": req.body.title,
      "Description": "",
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
  });
  book1.default.updateOne({ _id: id }, editBookItem, {}, (err) => {
      if (err) {
          console.error(err);
          res.end(err);
      }
      res.redirect('/books');
  });
});
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;
  book1.default.remove({ _id: id }, (err) => {
      if (err) {
          console.error(err);
          res.end(err);
      }
      res.redirect('/books');
  });
});

// // POST process the Book Details page and create a new Book - CREATE
// router.post('/add', (req, res, next) => {

//     /*****************
//      * ADD CODE HERE *
//      *****************/

// });

// // GET the Book Details page in order to edit an existing Book
// router.get('/:id', (req, res, next) => {

//     /*****************
//      * ADD CODE HERE *
//      *****************/
// });

// // POST - process the information passed from the details form and update the document
// router.post('/:id', (req, res, next) => {

//     /*****************
//      * ADD CODE HERE *
//      *****************/

// });

// // GET - process the delete by user id
// router.get('/delete/:id', (req, res, next) => {

//     /*****************
//      * ADD CODE HERE *
//      *****************/
// });


module.exports = router;
