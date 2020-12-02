const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pred = new Schema({
    City:{type: String},
    Year:{type: String},
    Type:{type: String},
    Values:{type: Array}},{collection: 'pred'}
);

module.exports=mongoose.model('Pred',pred);