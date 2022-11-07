const express = require('express');
const app = express();
app.listen('16210');

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
 * Updaters for Trainer Appointment class
 */

app.get('/updateName', (req , res) => {
    var name;
    con.query("SELECT Appt_Name FROM Appointment WHERE Appt_Key = '" +
        req.body.appt_key + "';",
        function(err, result) {
            if (err) throw err;
            name = result[0].Appt_Name;
            res.json(name);
        })
})

app.get('/updateDate', (req , res) => {
    var date;
    con.query("SELECT Appt_Date FROM Appointment WHERE Appt_Key = '" +
        req.body.appt_key + "';",
        function(err, result) {
            if (err) throw err;
            date = result[0].Appt_Date;
            res.json(date);
        })
})

app.get('/updateTime', (req , res) => {
    var time;
    con.query("SELECT Appt_Time FROM Appointment WHERE Appt_Key = '" +
        req.body.appt_key + "';",
        function(err, result) {
            if (err) throw err;
            time = result[0].Appt_Time;
            res.json(time);
        })
})

app.get('/updateDescription', (req , res) => {
    var description;
    con.query("SELECT Appt_Description FROM Appointment WHERE Appt_Key = '" +
        req.body.appt_key + "';",
        function(err, result) {
            if (err) throw err;
            description = result[0].Appt_Description;
            res.json(description);
        })
})

app.get('/updatePublicNotes', (req , res) => {
    var publicNotes;
    con.query("SELECT Appt_Public_Notes FROM Appointment WHERE Appt_Key = '" +
        req.body.appt_key + "';",
        function(err, result) {
            if (err) throw err;
            publicNotes = result[0].Appt_Public_Notes;
            res.json(publicNotes);
        })
})

app.get('/updatePrivateNotes', (req , res) => {
    var privateNotes;
    con.query("SELECT Appt_Private_Notes FROM Appointment WHERE Appt_Key = '" +
        req.body.appt_key + "';",
        function(err, result) {
            if (err) throw err;
            privateNotes = result[0].Appt_Private_Notes;
            res.json(privateNotes);
        })
})

module.exports = update_Trainer_Appointment;