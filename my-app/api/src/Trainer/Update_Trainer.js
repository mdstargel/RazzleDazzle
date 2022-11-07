const express = require('express');
const app = express();
app.listen('16200');

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
 * Imports
 */
let { trainer_appt } = require("./Class_Trainer_Appt");

/**
 * Updaters for Trainer class
 */
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

app.get('/updateCalendar', (req , res) => {
    var calendar = [];
    con.query("SELECT Appt_Key, Appt_Name, Appt_Date, Appt_Time, Appt_Difficulty, Appt_Description, " +
        "Appt_Public_Notes, Appt_Private_Notes, Appt_Size FROM Appointment " +
        "WHERE Appt_TID_1 = " + req.body.trainer_id + " " +
        "OR Appt_TID_2 = " + req.body.trainer_id + ";",
        function(err, result) {
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                calendar.push(new trainer_appt(result[i].Appt_Key,
                    result[i].Appt_Name, result[i].Appt_Date, result[i].Appt_Time,
                    result[i].Appt_Description, result[i].Appt_Public_Notes,
                    result[i].Appt_Private_Notes));
            };
            res.json(calendar);
        });
})

module.exports = update_Trainer;