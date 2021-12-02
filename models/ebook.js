const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const eBookSchema = new Schema({
    title: String,
    subtitle: String,
    price: String,
    image: String,
    url: String,
    isbn13: String,
});
module.exports = mongoose.model('eBook', eBookSchema);