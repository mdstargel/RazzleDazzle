const express = require('express');
const app = express();
app.listen('16304');

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

app.put('/createNews', (req, res) => {
    con.query("INSERT INTO News (IMG_Name, Title, Link, News_Description) VALUES ('" +
        req.body.news_name + "', '" + req.body.news_title + "', '" +
        req.body.news_link + "', '" + req.body.description +
        "');",
        function(err) {
            if (err) throw err;
        });
})

module.exports = app;