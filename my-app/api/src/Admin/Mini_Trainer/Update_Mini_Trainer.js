const express = require('express');
const app = express();
app.listen('16330');

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

app.get('/updateName', (req , res) => {
    var name;
    con.query("SELECT Train_Name FROM Trainer WHERE TID = '" +
        req.body.trainer_id + "';",
        function(err, result) {
            if (err) throw err;
            name = result[0].Train_Name;
            res.json(name);
        })
})

app.get('/updateAddress', (req , res) => {
    var address;
    con.query("SELECT Train_Address FROM Trainer WHERE TID = '" +
    req.body.trainer_id + "';",
        function(err, result) {
            if (err) throw err;
            address = result[0].Train_Address;
            res.json(address);
        })
})

app.get('/updatePhone', (req , res) => {
    var phone;
    con.query("SELECT Train_Phone_Num FROM Trainer WHERE TID = '" +
    req.body.trainer_id + "';",
        function(err, result) {
            if (err) throw err;
            phone = result[0].Train_Phone_Num;
            res.json(phone);
        })
})

app.get('/updateEmail', (req , res) => {
    var email;
    con.query("SELECT Train_Email_Addr FROM Trainer WHERE TID = '" +
    req.body.trainer_id + "';",
        function(err, result) {
            if (err) throw err;
            email = result[0].Train_Email_Addr;
            res.json(email);
        })
})

app.get('/updateEmerName', (req , res) => {
    var emerName;
    con.query("SELECT Train_Emer_Name FROM Trainer WHERE TID = '" +
    req.body.trainer_id + "';",
        function(err, result) {
            if (err) throw err;
            emerName = result[0].Train_Emer_Name;
            res.json(emerName);
        })
})

app.get('/updateEmerPhone', (req , res) => {
    var emerPhone;
    con.query("SELECT Train_Emer_Num FROM Trainer WHERE TID = '" +
    req.body.trainer_id + "';",
        function(err, result) {
            if (err) throw err;
            emerPhone = result[0].Train_Emer_Num;
            res.json(emerPhone);
        })
})

app.get('/updateAdmin', (req , res) => {
    var admin;
    con.query("SELECT Admin FROM Trainer WHERE TID = '" +
    req.body.trainer_id + "';",
        function(err, result) {
            if (err) throw err;
            admin = result[0].Admin;
            res.json(admin);
        })
})

module.exports = update_Mini_Trainer;