var mongoose = require('mongoose');


var bookAcademicSchema = mongoose.Schema({
    course: {
        type: String
    },
    branch: {
        type: String
    },
    year: {
        type: Number
    },
    sem: {
        type: Number
    }
});

var BookAcademic = module.exports = mongoose.model('bookAcademicInfo', bookAcademicSchema);


module.exports.getBookAcademic = function (callback, limit) {
    BookAcademic.find(callback).limit(limit);
}

module.exports.getBookAcademicById = function (bookid,callback) {
    BookAcademic.find({'bookId':bookid},callback);
}

module.exports.addBookAcademic = function (bookAcademic,callback) {
    BookAcademic.create(bookAcademic,callback);
}

module.exports.updateBookAcademic = function (id,bookAcademic, options, callback) {
    var query = {_id: id};
    var update = {
        course: bookAcademic.course,
        branch: bookAcademic.branch,
        year:bookAcademic.year,
        sem:bookAcademic.sem
    }
    BookAcademic.findOneAndUpdate(query, update, options, callback);
}

module.exports.deleteBookAcademic = function (id,callback) {
    var query = {_id: id};
    BookAcademic.remove(query,callback);
}
