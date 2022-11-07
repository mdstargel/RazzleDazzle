const express = require('express');
const app = express();
app.listen('16321');
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

app.put('/setDifficulty', (req, res) => {
    con.query("UPDATE Customer SET Difficulty = " + req.body.diff +
        " WHERE CID = " + req.body.customer_id);
})

module.exports = app;