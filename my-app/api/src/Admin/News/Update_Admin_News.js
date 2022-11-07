const express = require('express');
const app = express();
app.listen('16340');
app.use(express.json());

/**
 * Mysql connection
 */
var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "108.213.201.29",
    user: "root",
    password: "RazzleDazzle1!",
    database: "Horse_Site",
    insecureAuth: true,
    connectTimeout: 30000
});

app.get('/updateImgURL', (req, res) => {
    var imgName;
    con.query("SELECT IMG_Name FROM News WHERE Key = " + req.body.news_key + ";",
        function(err, result) {
            if (err) throw err;
            imgName = result[0].IMG_Name;
            res.json(imgName);
        })
    return imgName;
})

app.get('/updateTitle', (req, res) => {
    var news_title;
    con.query("SELECT Title FROM News WHERE Key = " + req.body.news_key + ";",
        function(err, result) {
            if (err) throw err;
            news_title = result[0].Title;
            res.json(news_title);
        })
})

app.get('/updateLink', (req, res) => {
    var news_link;
    con.query("SELECT Link FROM News WHERE Key = " + req.body.news_key + ";",
        function(err, result) {
            if (err) throw err;
            news_link = result[0].Link;
            res.json(news_link);
        })
})

app.get('/updateDescription', (req, res) => {
    var description;
    con.query("SELECT News_Description FROM News WHERE Key = " + req.body.news_key + ";",
        function(err, result) {
            if (err) throw err;
            description = result[0].News_Description;
            res.json(description);
        })
})

module.exports = app;