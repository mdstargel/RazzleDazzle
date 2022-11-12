const express = require('express');
const app = express();
app.listen('16410');
app.use(express.json());

const con = require('../mysql.js');

app.get('/News/Update_ImgURL', (req, res) => {
    var imgURL;
    news_key = req.body.news_key;
    con.query("SELECT IMG_Name FROM News WHERE Key = " + news_key + ";",
        function(err, result) {
            if (err) throw err;
            imgName = result[0].IMG_Name;
            res.send(imgURL);
        })
    return imgName;
})

app.get('/News/Update_Title', (req, res) => {
    var news_title;
    news_key = req.body.news_key;
    con.query("SELECT Title FROM News WHERE Key = " + news_key + ";",
        function(err, result) {
            if (err) throw err;
            news_title = result[0].Title;
            res.send(news_title);
        })
})

app.get('/News/Update_Link', (req, res) => {
    var news_link;
    news_key = req.body.news_key;
    con.query("SELECT Link FROM News WHERE Key = " + news_key + ";",
        function(err, result) {
            if (err) throw err;
            news_link = result[0].Link;
            res.send(news_link);
        })
})

app.get('/News/Update_Description', (req, res) => {
    var description;
    news_key = req.body.news_key;
    con.query("SELECT News_Description FROM News WHERE Key = " + news_key + ";",
        function(err, result) {
            if (err) throw err;
            description = result[0].News_Description;
            res.json(description);
        })
})

module.exports = app;