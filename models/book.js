const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const BookSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    author: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
}, );
module.exports = mongoose.model('Book', BookSchema);