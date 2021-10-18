const mongoose = require('mongoose');
const books = require('./books');
const Book = require('../models/book');


mongoose.connect('mongodb://localhost:27017/samplebooks', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async() => {
    await Book.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const book = new Book({
            name: `${books[random1000].name}`,
            price,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, autem neque voluptas dignissimos deleniti quibusdam aliquam numquam sapiente vel rem, ut facere natus temporibus repellendus ab omnis laborum odit incidunt.",
            author: `${books[random1000].author}`
        });
        await book.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})