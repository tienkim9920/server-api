var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        username: String,
        password: String,
        fullname: String,
        gender: String,
        email: String,
        phone: String

    }
);

var Users = mongoose.model('Users', schema, 'user');

module.exports = Users;