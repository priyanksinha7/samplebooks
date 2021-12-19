const mongoose = require('mongoose');
const eBook = require('../../../models/ebook');
const { max, longestCommonSubsequence } = require("./searchutils/lcsubs");

mongoose.connect('mongodb://localhost:27017/samplebooks', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
let arr = [{}];
const findDB = async() => {
    const books = await eBook.find({});
    return books;
}

const makeString = async(booktofind) => {
    let bookName = [{}];
    const res = await findDB();


    for (r of res) {
        let temp_st = "" + r.title;
        temp_st = temp_st.toLowerCase();
        let booktf = "" + booktofind;
        booktf = booktf.toLowerCase();

        if (longestCommonSubsequence(booktf, temp_st) >= 3) {

            bookName.push(r);
        }


    }
    return bookName;



}
module.exports = makeString;