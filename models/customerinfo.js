var mongoose = require('mongoose');

var customerInfoSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    }
});
var CustomerInfo = module.exports = mongoose.model('customer',customerInfoSchema);


module.exports.getCustomerInfo = function (callback, limit) {
    CustomerInfo.find(callback).limit(limit);
}
