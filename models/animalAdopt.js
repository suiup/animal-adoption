let mongoose = require('mongoose');

let Schema = mongoose.Schema;

var adopterSchema = new Schema({
    name: {type: String, required:true},
    phone: {type: String, required:true},
    email: {type: String, required:true},
    userId: {type: String, required: true},
    animalId: {type: String, required: true},
    method: {type: Boolean, default:true},
    address: {type: String}
});

var Adopter = mongoose.model('Adopter', adopterSchema);

module.exports = Adopter;

