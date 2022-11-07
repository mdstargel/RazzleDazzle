const express = require('express');
const app = express();
app.listen('16342');
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

con.connect(function(err) {
    if (err) throw err;
});

app.put('/deleteNews', (req, res) => {
    con.query("DELETE FROM News WHERE Key = " + req.body.news_key + ";",
        function(err) {
            if (err) throw err;
        })
})

module.exports = app;