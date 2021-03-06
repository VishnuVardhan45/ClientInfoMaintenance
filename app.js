var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer = require('multer');
var cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

/*BooksInfo = require('./models/bookinfo');
BookImages = require('./models/bookimage');
BookContact = require('./models/bookcontact');
BookAcademic = require('./models/bookAcademicInfo');*/
CustomerInfo = require('./models/customerinfo');
User = require('./models/user');


//connect to Mongoose
var options = {
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
};
var mongodbUri = 'mongodb://clientdbuser:clientdbpwd@ec2-54-145-92-130.compute-1.amazonaws.com:27017/clientinfo_db';
//var mongodbUri = 'mongodb://localhost/clientinfo_db';
// mongoose.connect('mongodb://localhost/BMB');
mongoose.connect(mongodbUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    // Wait for the database connection to establish, then start the app.

  /*  app.post('/postbook', function (req, res) {
        var book = req.body.bookObj;

        var imageArr = req.body.imageArr;
        var imgFinalArr = [];
        imageArr.forEach(function (element, index) {
            var obj = {
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
            var imageIds = [];
            suc.forEach(function (element) {
                imageIds.push(element._id);
            }, this);
            BookContact.addBookContact(book, function (err1, suc1) {
                if (err1) {
                    res.json(err1);
                }
                var bookContactIds = [];
                bookContactIds.push(suc1._id);
                BookAcademic.addBookAcademic(book, function (err2, suc2) {
                    if (err2) {
                        res.json(err2);
                    }
                    var bookAcademicIds = [];
                    if (suc2._id) bookAcademicIds.push(suc2._id);
                    book.bookImages = imageIds;
                    book.bookContact = bookContactIds;
                    book.bookAcademic = bookAcademicIds;
                    BooksInfo.addBook(book, function (err3, suc3) {
                        if (err3) {
                            res.json(err3);
                        };
                        res.json(suc3);
                    });
                });
            });
        });
    });
*/
    app.post('/login', function (req, res) {
        var obj = req.body;
        console.log(JSON.stringify(obj));
        User.authorizeUser(obj, function (err, suc) {
            if (err) {
                res.json(err);
            }
            res.json(suc);
        });
    });
    var storage = multer.diskStorage({ //multers disk storage settings
      destination: function (req, file, cb) {
          cb(null, './uploads/');
      },
      filename: function (req, file, cb) {
          var datetimestamp = Date.now();
          cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
      }
  });

  var upload = multer({ //multer settings
                  storage: storage
              }).single('file');

  /** API path that will upload the files */
  app.post('/upload', function(req, res) {
      upload(req,res,function(err,suc){
          if(err){
               res.json(err);
               return;
          }
           res.json(suc);
      });
  });

/*
    app.post('/register', function (req, res) {
        var obj = req.body;
        User.addUser(obj, function (err, suc) {
            if (err) {
                res.json(err);
            }
            res.json(suc);
        });
    });

    app.get('/booksinfo', function (req, res) {
        BooksInfo.getBooks(function (err, suc) {
            if (err) {
                throw err;
            }
            res.json(suc);
        });
    });
*/
    app.get('/customerinfo', function (req, res) {
        CustomerInfo.getCustomerInfo(function (err, suc) {
            if (err) {
                throw err;
            }
            res.json(suc);
        });
    });

/*
    app.get('/booksinfo/:_id', function (req, res) {
        BooksInfo.getBookById(req.params._id, function (err, book) {
            if (err) {
                console.log(err);
            }
            res.json(book);
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
*/
    app.get('/', function (req, res) {
        res.send("Hey TAG!");
    });

    app.listen(process.env.PORT || 5000);
    console.log('Running on port 3000')
});



// app.post('/bookimage', function (req, res) {
//     var data = req.body;
//     // var imageObj = {
//     //   contentType = "image/png",
//     //   image = new Buffer(data.image,"base64")
///===//     // }
//     var obj = {
//         bookId: data.bookId,
//         image: {
//             data: new Buffer(data.image.split(",")[1], "base64"),
//             contentType: "image/png"
//         }
//     }
//     //  res.json(obj);
//     BookImages.addImage(obj, function (err, res) {
//         if (err) {
//             res.json(err);
//         }
//         var obj = {
//             data: new Buffer(res.image.data).toString("base64")
//         }
//         res.json(obj);
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
