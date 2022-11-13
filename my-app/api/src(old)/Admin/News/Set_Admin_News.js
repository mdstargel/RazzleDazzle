const express = require('express');
const app = express();
app.use(express.json());

let con = require('../../mysql.js');

app.put('/Admin/News/Set_ImgURL', (req, res) => {
    var imgURL = req.body.imgURL;
    var news_key = req.body.news_key;
    con.query("UPDATE News SET IMG_Name = '" + imgURL + "' WHERE KEY = " +
        news_key + ";",
        function(err) {
            if (err) throw err;
        })
})

app.put('/Admin/News/Set_Title', (req, res) => {
    var news_title = req.body.news_title;
    var news_key = req.body.news_key;
    con.query("UPDATE News SET Title = '" + news_title + "' WHERE KEY = " +
        news_key + ";",
        function(err) {
            if (err) throw err;
        })
})

app.put('/Admin/News/Set_Link', (req, res) => {
    var news_link = req.body.news_link;
    var news_key = req.body.news_key;
    con.query("UPDATE News SET Link = '" + news_link + "' WHERE KEY = " +
        news_key + ";",
        function(err) {
            if (err) throw err;
        })
})

app.put('/Admin/News/Set_Description', (req, res) => {
    var description = req.body.description;
    var news_key = req.body.news_key;
    con.query("UPDATE News SET IMG_Name = '" + description + "' WHERE KEY = " +
        news_key + ";",
        function(err) {
            if (err) throw err;
        })
})

module.exports = app;