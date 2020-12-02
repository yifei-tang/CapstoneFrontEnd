const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const act = new Schema({
    City:{type: String},
    Year:{type: String},
    Type:{type: String},
    Values:{type: Array}},{collection: 'err'}
);

module.exports=mongoose.model('Err',act);