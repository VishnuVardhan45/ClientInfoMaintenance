var mongoose = require('mongoose');


var bookImageSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    bookId: {
        type: String,
        required: true
    }
});

var BookImage = module.exports = mongoose.model('bookimages', bookImageSchema);

module.exports.getBookImage = function (callback, limit) {
    BookImage.find(callback).limit(limit);
}

module.exports.addImage = function (image,callback) {
    BookImage.create(image,callback);
}