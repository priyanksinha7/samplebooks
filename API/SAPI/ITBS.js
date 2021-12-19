const axios = require('axios');
const getBook = async(query) => {
    let ebooks = [{}];
    await axios.get(`https://api.itbook.store/1.0/search/${query}`)
        .then(res => {

            ebooks.push(...res.data.books);

        })
        .catch(err => {
            return err;
        })
    return ebooks;

}
module.exports = getBook;