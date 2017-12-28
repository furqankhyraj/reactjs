var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// var index = require('./routes/index');
// var users = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// API Start
var mongoose = require('mongoose');
// MongoLab
mongoose.connect('mongodb://furqan:furqan@ds133597.mlab.com:33597/bookshop');
// Local DB
// mongoose.connect('mongodb://localhost:27017/bookshop');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error'));
// Setup Session Start
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 },
  store: new MongoStore({ mongooseConnection: db, ttl: 2 * 24 * 60 * 60 })
  // ttl: 2 days * 24 hours * 60 minutes * 60 seconds
}))
// Save to Session
app.post('/cart', function (req, res) {
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function (err) {
    if (err) {
      console.log('Cart POST Failed and error = '+err) ;
    }
    res.json(req.session.cart);
  })
})

// Get Session Cart API
app.get('/cart', function (req, res) {
  if (typeof req.session.cart !== 'undefined') {
    res.json(req.session.cart);
  }
})
// Setup Session End

var Books = require('./models/books.js');
// Post Books
app.post('/books', function (req, res) {
  var book = req.body;

  Books.create(book, function (err, books) {
    if (err) {
      console.error('Book Create Failed'+err);
    }
    res.json(books);
  })
})

// Get All Books
//----->>>> GET BOOKS <<<---------
app.get('/books', function (req, res) {
  Books.find(function (err, books) {
    if (err) {
      console.log('books get failed err = '+err);
    }
    res.json(books)
  })
});

//---->>> DELETE BOOKS <<<------
app.delete('/books/:_id', function (req, res) {
  var query = { _id: req.params._id };
  Books.remove(query, function (err, books) {
    if (err) {
      console.log('delete book failed,err = '+err);
    }
    res.json(books);
  })
});

// Update Books
app.put('/books/:_id', function (req, res) {
  console.log('in udpate book API');
  var book = req.body;
  var query = req.params._id;
  console.log('query = ', query);
  // if the field doesn't exist $set will set a new field
  var update = {
    '$set': {
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  };
  console.log('update = ', update);
  // When true returns the updated document
  var options = { new: true };
  Books.findOneAndUpdate(query, update, options, function (err, books) {
    if (err) {
      console.log('update book failed and err  = '+err);
    }
    res.json(books);
  })
})

// API to get Book Images - Start

app.get("/images", function(req, res){
  console.log('get images API call');
  const imgFolder = __dirname + "/public/images";
  const fs = require('fs');
  fs.readdir(imgFolder, function(err, files){
    if(err){
      return console.error('error while readdir ('+imgFolder+')'+err);
    }

    const filesArr = [];
    // Iterate all images in the directory 
    files.forEach(function(file){
      filesArr.push({name: file});
    })
    res.json(filesArr);
  })
  
})

// API to get Book Images - End

// API End

app.listen(3001, function (err) {
  if (err) {
    console.log(err);
  }
  console.log('API Server is running at 3001');
})