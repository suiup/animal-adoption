let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let Character = new Schema(
    {
        username: {type: String, required: true, max: 100},
        password: {type: String, required: true, max: 100},
    }
);

let User = mongoose.model('User', Character );

module.exports = User;
