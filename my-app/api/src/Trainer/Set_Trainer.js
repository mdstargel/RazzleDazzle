const express = require('express');
const app = express();
app.listen('16201');

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

/**
 * Setters for Trainer class
 */

app.put('/setName', (req , res) => {
    con.query("UPDATE Trainer SET Train_Name = '" + req.body.name +
        "' WHERE TID = " + req.body.trainer_id + ";",
        function(err) {
            if (err) throw err;
        });
})

app.put('/setAddress', (req , res) => {
    con.query("UPDATE Trainer SET Train_Address = '" + req.body.address +
        "' WHERE TID = " + req.body.trainer_id + ";",
        function(err) {
            if (err) throw err;
        });
})

app.put('/setPhone', (req , res) => {
    con.query("UPDATE Trainer SET Train_Phone_Number = '" + req.body.phone +
        "' WHERE TID = " + req.body.trainer_id + ";",
        function(err) {
            if (err) throw err;
        });
})

app.put('/setEmail', (req , res) => {
    con.query("UPDATE Trainer SET Train_Email_Addr = '" + req.body.email +
        "' WHERE TID = " + req.body.trainer_id + ";",
        function(err) {
            if (err) throw err;
        });
})

app.put('/setEmerName', (req , res) => {
    con.query("UPDATE Trainer SET Train_Emer_Name = '" + req.body.name +
        "' WHERE TID = " + req.body.trainer_id + ";",
        function(err) {
            if (err) throw err;
        });
})

app.put('/setEmerPhone', (req , res) => {
    con.query("UPDATE Trainer SET Train_Emer_Num = '" + req.body.phone +
        "' WHERE TID = " + req.body.trainer_id + ";",
        function(err) {
            if (err) throw err;
        });
})

app.put('/setPassword', (req , res) => {
    var db_old_pw;
    con.query("SELECT Log_Password FROM Login WHERE Email = '" + req.body.email +
        "';",
        function(err, result) {
            if (err) throw err;
            db_old_pw = result[0].Log_Password;
            res.json(db_old_pw);
        })

    if (db_old_pw == old_pw) {
        con.query("UPDATE Login SET Log_Password = '" + req.body.new_pw + "' WHERE Email = '" +
            req.body.email + "';",
            function(err) {
                if (err) throw err;
            })
    }
})

module.exports = set_Trainer;