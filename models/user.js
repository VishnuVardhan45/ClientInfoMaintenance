var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
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

var User = module.exports = mongoose.model('users', userSchema);

//Get Users

module.exports.getUsers = function (callback, limit) {
    User.find(callback).limit(limit);
}

module.exports.getUsersByEmail = function (email,callback) {
    User.findById(email,callback);
}

module.exports.addUser = function (user,callback) {
    User.create(user,callback);
}

module.exports.updateUser = function (id,user, options, callback) {
    var query = {_id: id};
    var update = {
        email: user.title,
        password: user.author,
        updated_date: Date.now
    }
    User.findOneAndUpdate(query, update, options, callback);
}

module.exports.deleteUser = function (id,callback) {
    var query = {_id: id};
    User.remove(query,callback);
}
