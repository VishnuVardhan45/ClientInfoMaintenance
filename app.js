var express = require('express');
var app = express();
var bodyParser = require('body-parser');
 var mongoose = require('mongoose');

app.use(bodyParser.json());

// User = require('./models/user');
// BooksInfo = require('./models/bookinfo');
BookImages = require('./models/bookimage');

//connect to Mongoose
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };       
var mongodbUri = 'mongodb://thallapa:xqytw246@ds147274.mlab.com:47274/bmb';
// mongoose.connect('mongodb://localhost/BMB');
mongoose.connect(mongodbUri);

var db= mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));  

db.once('open', function() {
 // Wait for the database connection to establish, then start the app.         
 app.get('/bookimage', function (req, res) {
    BookImages.getBookImage(function (err, users) {
        if (err) {
            throw err;
        }
        res.json(users);
    });
}); 

app.get('/', function (req, res) {
    res.send("Hey TAG!");
});
app.listen(3000);
console.log('Running on port 3000')
});


// app.post('/api/bookimage', function (req, res) {
//     var image = req.body;
//     BookImages.addImage(image,function (err, img) {
//         if (err) {
//             throw err;
//         }
//         res.json(img);
//     });
// });



// app.get('/api/user', function (req, res) {
//     User.getUsers(function (err, users) {
//         if (err) {
//             throw err;
//         }
//         res.json(users);
//     });
// });

// app.delete('/api/books/:id', function (req, res) {
//     var id = req.params.id;
//     BooksInfo.deleteBook(id,function (err, book) {
//         if (err) {
//             throw err;
//         }
//         res.json(book);
//     });
// });

// app.put('/api/books/:id', function (req, res) {
//     var id = req.params.id;
//     var book = req.body;
//     BooksInfo.updateBook(id,book,{},function (err, book) {
//         if (err) {
//             throw err;
//         }
//         res.json(book);
//     });
// });

// app.post('/api/books', function (req, res) {
//     var book = req.body;
//     BooksInfo.addBook(book,function (err, book) {
//         if (err) {
//             throw err;
//         }
//         res.json(book);
//     });
// });

// app.get('/api/books', function (req, res) {
//     BooksInfo.getBooks(function (err, books) {
//         if (err) {
//             throw err;
//         }
//         res.json(books);
//     });
// });

// app.get('/api/books/:_id', function (req, res) {
//     BooksInfo.getBookById(req.params._id,function (err, book) {
//         if (err) {
//            console.log(err);
//         }
//         res.json(book);
//     });
// });

