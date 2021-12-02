const ebooks = require('../../../models/ebook');
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";
let arr = [];

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("samplebooks");
    dbo.collection("ebooks").find({}).toArray(function(err, result) {
        if (err) throw err;
        arr.push(...result);
        db.close();
        
    });
})

const findit=(str)=>
{
   
}
function isSubstring( s1,  s2)
{
    let M = s1.length();
    let N = s2.length();
 
    /* A loop to slide pat[] one by one */
    for (let i = 0; i <= N - M; i++) {
        let j;
 
        /* For current index i, check for
 pattern match */
        for (j = 0; j < M; j++)
            if (s2[i + j] != s1[j])
                break;
 
        if (j == M)
            return i;
    }
 
    return -1;
}
 

// const findit = async() => {
//     console.log(ebooks.);
// }
// findit();