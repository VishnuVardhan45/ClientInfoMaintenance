var mongoose = require('mongoose');

var bookContactSchema = mongoose.Schema({
    phoneNo: {
        type: String
    },
    address: {
        type: String
    },
    landmark: {
        type: String
    },
    pincode: {
        type: Number,
        required: true
    },
    college: {
        type: String
    }
});

var BookContact = module.exports = mongoose.model('bookcontact', bookContactSchema);


module.exports.getBookContact = function (callback, limit) {
    BookContact.find(callback).limit(limit);
}

module.exports.getBookContactById = function (bookid,callback) {
    BookContact.findById(bookid,callback);
}

module.exports.addBookContact = function (bookContact,callback) {
    BookContact.create(bookContact,callback);
}

module.exports.updateBookContact = function (id,bookContact, options, callback) {
    var query = {_id: id};
    var update = {
        phoneNo: bookContact.phoneNo,
        address: bookContact.address,
        landmark:bookContact.landmark,
        pincode:bookContact.pincode,
        college:bookContact.college
    }
    BookContact.findOneAndUpdate(query, update, options, callback);
}

module.exports.deleteBookContact = function (id,callback) {
    var query = {_id: id};
    BookContact.remove(query,callback);
}
