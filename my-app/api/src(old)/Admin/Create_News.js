const express = require('express');
const app = express();
app.use(express.json());

let con = require('../mysql.js');

app.put('/Admin/Create_News', (req, res) => {
    var imgURL = req.body.imgURL;
    var news_title = req.body.news_title;
    var news_link = req.body.news_link;
    var description = req.body.news_description;

    if (description == "") description = null;
    con.query("INSERT INTO News (IMG_Name, Title, Link, News_Description) " +
        "VALUES ('" + imgURL + "', '" + news_title + "', '" + news_link +
        "', '" + description + "');",
        function(err) {
            if (err) throw err;
        });
})

module.exports = app;