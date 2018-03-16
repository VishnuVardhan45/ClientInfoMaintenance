var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
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

module.exports.authorizeUser = function (obj, callback) {
    User.findOne({ 'email': obj.email, 'password': obj.password }, 'email name created_date updated_date', callback);
}

module.exports.addUser = function (obj, callback) {
    User.count({ 'email': obj.email }, function (err, docs) {
                return function(err,docs){};
        });
   
    // User.count({ 'email': obj.email }, function (err, docs) {
    //         if(!docs){
    //             obj.created_date = new Date();
    //             User.create(obj, callback);
    //         } else {
    //              callback = function() {
    //                 return  {data:"Email already exits"};
                    
    //             }
    //             return callback;
    //         }
    // });
}

module.exports.updateUser = function (id, user, options, callback) {
    var query = { _id: id };
    var update = {
        name: user.name,
        email: user.title,
        password: user.password,
        updated_date: new Date()
    }
    User.findOneAndUpdate(query, update, options, callback);
}

module.exports.deleteUser = function (id, callback) {
    var query = { _id: id };
    User.remove(query, callback);
}
