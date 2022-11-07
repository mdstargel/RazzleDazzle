const express = require('express');
const app = express();
app.listen('16331');
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

app.put('/getCustomers', (req, res) => {
    con.query("UPDATE Login SET Admin = " + req.body.admin + " " +
        "WHERE TID = " + req.body.trainer_id + ";",
        function(err) {
            if (err) throw err;
        });
})

module.exports = app;