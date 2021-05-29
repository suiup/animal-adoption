let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let Character = new Schema(
    {
        userId: {type: String, required: true, max: 100},
        userName: {type: String},
        animalId: {type: String, required: true, max: 100},
        img: {type: String},
        comments: {type: String}
    }
);

let Comments = mongoose.model('Comments', Character );

module.exports = Comments;
