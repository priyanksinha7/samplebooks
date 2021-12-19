const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const Book = require('./models/book');
const app = express();
const eBook = require('./models/ebook');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const Review = require('./models/review');
const makeString = require('./public/javascripts/search/searchquery');
const getBook = require('./API/SAPI/ITBS');
mongoose.connect('mongodb://localhost:27017/samplebooks', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))

app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





app.get('/', (req, res) => {
    res.render('home');
})


app.get('/home', (req, res) => {
    res.render('home');
})

//BOOK STARTS
app.get('/books', async(req, res) => {

    const books = await Book.find({});

    res.render('samplebooks/books', { books });
})

app.get('/books/:id', async(req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id).populate({
        path: 'reviews',
    });
    console.log(book);
    res.render('samplebooks/view', { book });
})
app.post('/books/:id/review', async(req, res) => {
        const book = await Book.findById(req.params.id);
        const review = new Review(req.body.review);
        // review.author = req.user._id;
        book.reviews.push(review);
        await review.save();
        await book.save();
        res.redirect(`/books/${book._id}`);
    })
    //BOOK ENDS

//Ebooks
app.get('/ebooks', async(req, res) => {
    const ebooks = await eBook.find({});
    res.render('ebooks/newebooks', { ebooks });

})
app.get('/ebooks/upload', async(req, res) => {
    res.render('ebooks/uploadForm');
})
app.post('/ebooks/upload', async(req, res) => {
    const ebook = req.body.ebook;
    console.log(ebook.title);
    const EBook = new eBook({
        title: ebook.title,
        subtitle: ebook.subtitle,
        price: ebook.price,
        image: ebook.image,
        url: ebook.url,

    });
    await EBook.save();
    console.log(EBook);
    res.redirect('/ebooks');

})
app.get('/ebooks/request', async(req, res) => {
    res.render('ebooks/requests');
})

app.get('/order/:id', async(req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.render('samplebooks/order', { book });
})
app.post('/order/submit/:id', async(req, res) => {
        console.log("That's the book", req.body);
        res.render('samplebooks/orderconfirm');
    })
    //E books end
    // Search
app.post('/search', async(req, res) => {
        const { searchquery } = req.body;
        const temp_st = "" + searchquery;
        console.log(temp_st);
        //https://api.itbook.store/1.0/search/mongodb
        const ebooks = await makeString(temp_st);
        const temp_res = await getBook(temp_st);
        ebooks.push(...temp_res);
        res.render('ebooks/searchresults', { ebooks });

    })
    //Search ends

//A and A

app.get('/register', async(req, res) => {
    res.render('users/register');
})
app.post('/register', async(req, res) => {

})
app.get('/login', async(req, res) => {
    res.render('users/login');
})

//A and A









app.listen(3000, () => {
    console.log("llistening to it!!");
})