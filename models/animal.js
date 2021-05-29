let mongoose = require('mongoose');

let Schema = mongoose.Schema;

var animalSchema = new Schema({
    name: {type: String, required:true},
    breed: {type: String, required:true},
    location: {type: String, required:true},
    adopted: {type: Boolean, default: false},
    img: {type: String},
    comments:{type: Array}
});
animalSchema.methods.adoption = function (){
    this.adopted = true;

    return this.adopted;
};

var Entry = mongoose.model('Animal', animalSchema);

module.exports = Entry;