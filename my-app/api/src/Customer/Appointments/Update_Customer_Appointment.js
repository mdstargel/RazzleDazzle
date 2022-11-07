const express = require('express');
const app = express();
app.listen('16110');

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
    con.query("SELECT Appt_Name FROM Appointment WHERE Appt_Key = '" +
        req.body.appt_key + "';",
        function(err, result) {
            if (err) throw err;
            name = result[0].Appt_Name;
            res.json(name);
        })
})

app.get('/updateDate', (req, res) => {
    var date;
    con.query("SELECT Appt_Date FROM Appointment WHERE Appt_Key = " +
        req.body.appt_key + ";",
        function(err, result) {
            if (err) throw err;
            date = result[0].Appt_Date;
            res.json(date);
        })
})

app.get('/updateTime', (req, res) => {
    var time;
    con.query("SELECT Appt_Time FROM Appointment WHERE Appt_Key = " +
        req.body.appt_key + ";",
        function(err, result) {
            if (err) throw err;
            time = result[0].Appt_Time;
            res.json(time);
        })
    return time;
})

app.get('/updateDescription', (req, res) => {
    var description;
    con.query("SELECT Appt_Description FROM Appointment WHERE Appt_Key = '" +
        req.body.appt_key + "';",
        function(err, result) {
            if (err) throw err;
            description = result[0].Appt_Description;
            res.json(description);
        })
})

app.get('/updatePublicNotes', (req, res) => {
    var pub_notes;
    con.query("SELECT Appt_Public_Notes FROM Appointment WHERE Appt_Key = '" +
        req.body.appt_key + "';",
        function(err, result) {
            if (err) throw err;
            pub_notes = result[0].Appt_Public_Notes;
            res.json(pub_notes);
        })
})

app.get('/updateGroupSize', (req, res) => {
    var group;
    con.query("SELECT Appt_Size FROM Appointment WHERE Appt_Key = '" +
        req.body.appt_key + "';",
        function(err, result) {
            if (err) throw err;
            group = result[0].Appt_Size;
            res.json(group);
        })
})

app.get('/updateReserved', (req, res) => {
    var reserved;
    con.query("SELECT CID_1, CID_2, CID_3, CID_4 FROM Customer_Group INNER " +
        "JOIN Appointment ON GID = Appointment.Appt_GID WHERE Appt_Key = '" +
        req.body.appt_key + "';",
        function(err, result) {
            if (err) throw err;
            if (result[0].CID_1 == this.cust_id ||
                result[0].CID_2 == this.cust_id ||
                result[0].CID_3 == this.cust_id ||
                result[0].CID_4 == this.cust_id) {
                reserved = true;
            } else reserved = false;
            res.json(reserved);
        })
})

module.exports = app;