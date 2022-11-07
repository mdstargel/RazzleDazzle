const express = require('express');
const app = express();
app.listen('16311');

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
    con.query("UPDATE Appointment SET Appt_Name = '" + req.body.name +
        "' WHERE Appt_Key = " + req.body.appt_key + ";",
        function(err) {
            if (err) throw err;
        });
})

app.put('/setDate', (req, res) => {
    con.query("UPDATE Appointment SET Appt_Date = '" + req.body.date +
        "' WHERE Appt_Key = " + req.body.appt_key + ";",
        function(err) {
            if (err) throw err;
        })
})

app.put('/setTime', (req, res) => {
    con.query("UPDATE Appointment SET Appt_Time = '" + req.body.time +
        "' WHERE Appt_Key = " + req.body.appt_key + ";",
        function(err) {
            if (err) throw err;
        })
})

app.put('/setDifficulty', (req, res) => {
    con.query("UPDATE Appointment SET Appt_Difficulty = '" + req.body.diff +
        "' WHERE Appt_Key = " + req.body.appt_key + ";",
        function(err) {
            if (err) throw err;
        })
})

app.put('/setDescription', (req, res) => {
    con.query("UPDATE Appointment SET Appt_Description = '" + req.body.desc +
        "' WHERE Appt_Key = " + req.body.ppt_key + ";",
        function(err) {
            if (err) throw err;
        })
})

app.put('/setPublicNotes', (req, res) => {
    con.query("UPDATE Appointment SET Appt_Public_Notes = '" + req.body.pub_notes +
        "' WHERE Appt_Key = " + req.body.appt_key + ";",
        function(err) {
            if (err) throw err;
        })
})

app.put('/setPrivateNotes', (req, res) => {
    con.query("UPDATE Appointment SET Appt_Private_Notes = '" + req.body.priv_notes +
        "' WHERE Appt_Key = " + req.body.appt_key + ";",
        function(err) {
            if (err) throw err;
        })
})

app.put('/setSize', (req, res) => {
    con.query("UPDATE Appointment SET Appt_Size = '" + req.body.size +
        "' WHERE Appt_Key = " + req.body.appt_key + ";",
        function(err) {
            if (err) throw err;
        })
})

app.put('/setTID1', (req, res) => {
    con.query("UPDATE Appointment SET Appt_TID_1 = '" + req.body.tid_1 +
        "' WHERE Appt_Key = " + req.body.appt_key + ";",
        function(err) {
            if (err) throw err;
        })
})

app.put('/setTID2', (req, res) => {
    con.query("UPDATE Appointment SET Appt_TID_2 = '" + req.body.tid_2 +
        "' WHERE Appt_Key = " + req.body.appt_key + ";",
        function(err) {
            if (err) throw err;
        })
})

app.put('/setGID', (req, res) => {
    con.query("UPDATE Appointment SET Appt_GID = '" + req.body.gid +
        "' WHERE Appt_Key = " + req.body.appt_key + ";",
        function(err) {
            if (err) throw err;
        })
})

module.exports = set_Admin_Appointment;