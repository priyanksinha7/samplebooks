const axios = require('axios');
const mongoose = require('mongoose');
const eBook = require('../models/ebook');
const ebooks = [{}];
mongoose.connect('mongodb://localhost:27017/samplebooks', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const getBook = async() => {

    await axios.get('https://api.itbook.store/1.0/new')
        .then(res => {

            ebooks.push(...res.data.books);

        })
        .catch(err => {
            return err;
        })

}
getBook().then(() => {
    makeEbook().then(() => {
        mongoose.connection.close();
    })
})
const makeEbook = async() => {
    await eBook.deleteMany({});
    for (let i = 0; i < ebooks.length; i++) {
        const ebook = new eBook({
            title: ebooks[i].title,
            subtitle: ebooks[i].subtitle,
            price: ebooks[i].price,
            image: ebooks[i].image,
            url: ebooks[i].url,
            isbn13: ebooks[i].isbn13
        });
        await ebook.save();
    }
}