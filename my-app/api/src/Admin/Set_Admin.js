const express = require('express');
const app = express();
app.listen('16301');
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

app.put('/setName', (req, res) => {
    con.query("UPDATE Trainer SET Train_Name = '" + req.body.name +
        "' WHERE TID = " + req.body.admin_id + ";",
        function(err) {
            if (err) throw err;
        });
})

app.put('/setAddress', (req, res) => {
    con.query("UPDATE Trainer SET Train_Address = '" + req.body.address +
        "' WHERE TID = " + req.body.admin_id + ";",
        function(err) {
            if (err) throw err;
        });
})

app.put('/setPhone', (req, res) => {
    con.query("UPDATE Trainer SET Train_Phone_Number = '" + req.body.phone +
        "' WHERE TID = " + req.body.admin_id + ";",
        function(err) {
            if (err) throw err;
        });
})

app.put('/setEmail', (req, res) => {
    con.query("UPDATE Trainer SET Train_Email_Addr = '" + req.body.email +
        "' WHERE TID = " + req.body.admin_id + ";",
        function(err) {
            if (err) throw err;
        });
})

app.put('/setEmerName', (req, res) => {
    con.query("UPDATE Trainer SET Train_Emer_Name = '" + req.body.name +
        "' WHERE TID = " + req.body.admin_id + ";",
        function(err) {
            if (err) throw err;
        });
})

app.put('/setEmerPhone', (req, res) => {
    con.query("UPDATE Trainer SET Train_Emer_Num = '" + req.body.phone +
        "' WHERE TID = " + req.body.admin_id + ";",
        function(err) {
            if (err) throw err;
        });
})

module.exports = app;