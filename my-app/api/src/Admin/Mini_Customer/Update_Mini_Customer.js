const express = require('express');
const app = express();
app.listen('16320');
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

app.get('/updateName', (req, res) => {
    var name;
    con.query("SELECT Cust_Name FROM Customer WHERE CID = '" +
        req.body.customer_id + "';",
        function(err, result) {
            if (err) throw err;
            name = result[0].Cust_Name;
            res.json(name);
        });
})

app.get('/updateAddress', (req, res) => {
    var addr;
    con.query("SELECT Cust_Address FROM Customer WHERE CID = '" +
        req.body.customer_id + "';",
        function(err, result) {
            if (err) throw err;
            addr = result[0].Cust_Address;
            res.json(addr);
        })
})

app.get('/updatePhone', (req, res) => {
    var phone_num;
    con.query("SELECT Cust_Phone_Num FROM Customer WHERE CID = '" +
        req.body.customer_id + "';",
        function(err, result) {
            if (err) throw err;
            phone_num = result[0].Cust_Phone_Num;
            res.json(phone_num);
        })
})

app.get('/updateEmail', (req, res) => {
    var email_addr;
    con.query("SELECT Cust_Email_Addr FROM Customer WHERE CID = '" +
        req.body.customer_id + "';",
        function(err, result) {
            if (err) throw err;
            email_addr = result[0].Cust_Email_Addr;
            res.json(email_addr);
        })
})

app.get('/updateEmerName', (req, res) => {
    var name;
    con.query("SELECT Cust_Emer_Name FROM Customer WHERE CID = '" +
        req.body.customer_id + "';",
        function(err, result) {
            if (err) throw err;
            name = result[0].Cust_Emer_Name;
            res.json(name);
        })
})

app.get('/updateEmerPhone', (req, res) => {
    var phone_num;
    con.query("SELECT Cust_Emer_Num FROM Customer WHERE CID = '" +
        req.body.customer_id + "';",
        function(err, result) {
            if (err) throw err;
            phone_num = result[0].Cust_Emer_Num;
            res.json(phone_num);
        })
})

app.get('/updateDifficulty', (req, res) => {
    var difficulty;
    con.query("SELECT Difficulty FROM Customer WHERE CID = '" +
        req.body.customer_id + "';",
        function(err, result) {
            if (err) throw err;
            difficulty = result[0].Difficulty;
            res.json(difficulty);
        })
})

app.get('/updateNotifications', (req, res) => {
    var notif;
    con.query("SELECT Phone_Notif FROM Customer WHERE CID = '" +
        req.body.customer_id + "';",
        function(err, result) {
            if (err) throw err;
            notif = result[0].Phone_Notif;
            res.json(notif);
        })
})

module.exports = app;