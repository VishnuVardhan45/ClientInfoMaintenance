var mongoose = require('mongoose');


var bookInfoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    edition: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    isAcademic: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: null
    },
    updated_date: {
        type: Date,
        default: null
    }
});

var bookTotalDetails = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    edition: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    isAcademic: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: null
    },
    updated_date: {
        type: Date,
        default: null
    },
    bookImages: [{ type: Schema.Types.ObjectId, ref: 'BookImage' }],
    bookContact: [{ type: Schema.Types.ObjectId, ref: 'BookContact' }],
    bookAcademic: [{ type: Schema.Types.ObjectId, ref: 'BookAcademic' }],
})

var BookInfo = module.exports = mongoose.model('bookinfo', bookInfoSchema);

var BookTotalInfo = module.exports = mongoose.model('bookinfo', bookTotalDetails);


module.exports.getBooks = function (callback, limit) {
    BookTotalInfo.find(callback).limit(limit);
}

module.exports.getBookById = function (id,callback) {
    BookInfo.findById(id,callback);
}

module.exports.addBook = function (book,callback) {
    book.created_date = new Date();
    book.status = "NEW";
    book.uid =  "5aa93239734d1d6b7120f9de";
    BookInfo.create(book,callback);
}

module.exports.updateBook = function (id,book, options, callback) {
    var query = {_id: id};
    var update = {
        name: book.name,
        author: book.author,
        publisher:book.publisher,
        edition:book.edition,
        price:book.price,
        description:book.description,
        uid:book.uid,
        status:book.status,
        isAcademic:book.isAcademic,
        updated_date: Date.now
    }
    BookInfo.findOneAndUpdate(query, update, options, callback);
}

module.exports.deleteBook = function (id,callback) {
    var query = {_id: id};
    BookInfo.remove(query,callback);
}
