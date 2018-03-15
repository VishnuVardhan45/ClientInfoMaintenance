var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
app.use(cors({origin: '*'}));

app.use(bodyParser.json());

BooksInfo = require('./models/bookinfo');
BookImages = require('./models/bookimage');
BookContact = require('./models/bookcontact');
BookAcademic = require('./models/bookAcademicInfo');
User = require('./models/user');


//connect to Mongoose
var options = {
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
};
var mongodbUri = 'mongodb://thallapa:xqytw246@ds147274.mlab.com:47274/bmb';
// mongoose.connect('mongodb://localhost/BMB');
mongoose.connect(mongodbUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    // Wait for the database connection to establish, then start the app.    

    app.post('/postbook', function (req, res) {
        var book = req.body.bookObj;
        var reqCount = 0;
        BooksInfo.addBook(book, function (err, suc) {
            if (err) {
                res.json(err);
            }
            reqCount++;
            book.bookId = suc._id;
            BookContact.addBookContact(book, function (err, suc) {
                if (err) {
                    res.json(err);
                }
                reqCount++;
            });

            if(book.isAcademic == 'Y') {
                book.bookId = suc._id;
                BookAcademic.addBookAcademic(book, function (err, suc) {
                    if (err) {
                        res.json(err);
                    }
                    reqCount++;
                });

            }


            var imageArr = req.body.imageArr;
            var imgFinalArr = [];
            imageArr.forEach(function (element, index) {
                var obj = {
                    bookId: suc._id,
                    image: {
                        data: new Buffer(element.split(",")[1], "base64"),
                        contentType: "image/png"
                    }
                };
                imgFinalArr.push(obj);
            }, this);
            BookImages.inserManyImages(imgFinalArr, function (err, suc) {
                if (err) {
                    res.json(err);
                }
                reqCount++;
            });
            if (reqCount == 4)
                res.json(suc);
        });


    });

    app.post('/login', function (req, res) {
        var obj = req.body;
        User.authorizeUser(obj, function (err, suc) {
            if (err) {
                res.json(err);
            }
            res.json(suc);
        });
    });
    app.post('/register', function (req, res) {
        var user = req.body;
        User.addUser(user, function (err, suc) {
            if (err) {
                res.json(err);
            }
            res.json(suc);
        });
    });


    app.get('/bookimage', function (req, res) {
        BookImages.getBookImage(function (err, result) {
            if (err) {
                throw err;
            }
            var obj = [];
            result.forEach(function (element) {
                var temp = {
                    bookId: element.bookId,
                    image: "data:image/jpeg;base64," + new Buffer(element.image.data).toString('base64')
                };
                obj.push(temp);
            }, this);
            res.json(obj);
        });
    });

    app.post('/bookimage', function (req, res) {
        var data = req.body;
        // var imageObj = {
        //   contentType = "image/png",
        //   image = new Buffer(data.image,"base64")
        // }
        var obj = {
            bookId: data.bookId,
            image: {
                data: new Buffer(data.image.split(",")[1], "base64"),
                contentType: "image/png"
            }
        }
        //  res.json(obj);
        BookImages.addImage(obj, function (err, res) {
            if (err) {
                res.json(err);
            }
            var obj = {
                data: new Buffer(res.image.data).toString("base64")
            }
            res.json(obj);
        });
    });

    app.get('/', function (req, res) {
        res.send("Hey TAG!");
    });

    app.listen(process.env.PORT || 5000);
    console.log('Running on port 3000')
});






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

