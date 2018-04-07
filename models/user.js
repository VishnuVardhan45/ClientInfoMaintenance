var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
    id:{
        type : String
    },
    useremailaddress: {
        type: String,
        required: true
    },
    userencryptedpwd: {
        type: String,
        required: true
    },
    userdob: {
        type: Date,
        required: true
    }
});

var User = module.exports = mongoose.model('usermaster', userSchema);

module.exports.authorizeUser = function (obj, callback) {
    User.findOne({ 'user_email_address':  obj.email, 'user_encrypted_pwd': obj.password }, '_id email name created_date updated_date', callback);
}

module.exports.addUser = function (obj, callback) {
    User.count({ 'email': obj.email }, function (err, docs) {
        if(err){callback({erroMsg:"ERROR"})};
        if (!docs) {
            obj.created_date = new Date();
             User.create(obj, callback);
        } else {
            callback({ erroMsg: "INVALID" });
        }
    });
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
