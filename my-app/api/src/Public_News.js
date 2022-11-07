const express = require('express');
const app = express();
app.listen('16400');


// Variables for connection
var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "108.213.201.29",
    user: "root",
    password: "RazzleDazzle1!",
    database: "Horse_Site",
    insecureAuth: true,
    connectTimeout: 30000
});

/**
 * Imports
 */
let { news } = require("./News/Class_News");

app.get('/publicNews', (req, res) => {
    var public_news = [];
    con.query("SELECT * FROM News;", function(err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            public_news.push(new news(result[i].Key, result[i].IMG_Name,
                result[i].Title, result[i].Link, result[i].News_Description));
        }
        res.json(public_news);
    })
})

module.exports = app;