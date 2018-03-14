var mongoose = require('mongoose');


var bookImageSchema = mongoose.Schema({
    bookId: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    }
});

var BookImage = module.exports = mongoose.model('bookimages', bookImageSchema);

module.exports.getBookImage = function (callback, limit) {
    BookImage.find(callback).limit(limit);
}

module.exports.addImage = function (image,callback) {
    BookImage.create(image,callback);
}