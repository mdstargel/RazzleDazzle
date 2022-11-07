const express = require('express');
const app = express();
app.listen('16341');
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

app.put('/setImgURL', (req, res) => {
    con.query("UPDATE News SET IMG_Name = '" + req.body.imgName + "' WHERE KEY = " +
        req.body.news_key + ";",
        function(err) {
            if (err) throw err;
        })
})

app.put('/setTitle', (req, res) => {
    con.query("UPDATE News SET Title = '" + req.body.news_title + "' WHERE KEY = " +
        req.body.news_key + ";",
        function(err) {
            if (err) throw err;
        })
})

app.put('/setLink', (req, res) => {
    con.query("UPDATE News SET Link = '" + req.body.news_link + "' WHERE KEY = " +
        req.body.news_key + ";",
        function(err) {
            if (err) throw err;
        })
})

app.put('/setDescription', (req, res) => {
    con.query("UPDATE News SET IMG_Name = '" + req.body.description + "' WHERE KEY = " +
        req.body.news_key + ";",
        function(err) {
            if (err) throw err;
        })
})

module.exports = app;