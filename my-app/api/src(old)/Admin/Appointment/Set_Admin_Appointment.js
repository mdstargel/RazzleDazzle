const express = require('express');
const app = express();
app.use(express.json());

const con = require('../../mysql.js');

app.put('/Admin/Calendar/Set_Name', (req, res) => {
    var name = req.body.name.replaceAll('"', '');
    var appt_key = req.body.appt_key;
    con.query("UPDATE Appointment SET Appt_Name = '" + name +
        "' WHERE Appt_Key = " + appt_key + ";",
        function(err) {
            if (err) throw err;
        });
})

app.put('/Admin/Calendar/Set_Date', (req, res) => {
    var date = req.body.date.replaceAll('"', '');
    var appt_key = req.body.appt_key;
    con.query("UPDATE Appointment SET Appt_Date = '" + date +
        "' WHERE Appt_Key = " + appt_key + ";",
        function(err) {
            if (err) throw err;
        })
})

app.put('/Admin/Calendar/Set_Start_Time', (req, res) => {
    var time = req.body.time.replaceAll('"', '');
    var appt_key = req.body.appt_key;
    con.query("UPDATE Appointment SET Appt_Time = '" + time +
        "' WHERE Appt_Key = " + appt_key + ";",
        function(err) {
            if (err) throw err;
        })
})

app.put('/Admin/Calendar/Set_End_Time', (req, res) => {
    var time = req.body.time.replaceAll('"', '');
    var appt_key = req.body.appt_key;
    con.query("UPDATE Appointment SET Appt_End_Time = '" + time +
        "' WHERE Appt_Key = '" + appt_key + ";",
        function(err) {
            if (err) throw err;
        })
})

app.put('/Admin/Calendar/Set_Type', (req, res) => {
    var type = req.body.time.replaceAll('"', '');
    var appt_key = req.body.appt_key;
    con.query("UPDATE Appointment SET Appt_Type = '" + type +
        "' WHERE Appt_Key = '" + appt_key + ";",
        function(err) {
            if (err) throw err;
        })
})

app.put('/Admin/Calendar/Set_Difficulty', (req, res) => {
    var difficulty = req.body.difficulty;
    var appt_key = req.body.appt_key;
    con.query("UPDATE Appointment SET Appt_Difficulty = '" + difficulty +
        "' WHERE Appt_Key = " + appt_key + ";",
        function(err) {
            if (err) throw err;
        })
})

app.put('/Admin/Calendar/Set_Description', (req, res) => {
    var description = req.body.description.replaceAll('"', '');
    var appt_key = req.body.appt_key;
    con.query("UPDATE Appointment SET Appt_Description = '" + description +
        "' WHERE Appt_Key = " + appt_key + ";",
        function(err) {
            if (err) throw err;
        })
})

app.put('/Admin/Calendar/Set_Public_Notes', (req, res) => {
    var public_notes = req.body.public_notes.replaceAll('"', '');
    var appt_key = req.body.appt_key;
    con.query("UPDATE Appointment SET Appt_Public_Notes = '" + public_notes +
        "' WHERE Appt_Key = " + appt_key + ";",
        function(err) {
            if (err) throw err;
        })
})

app.put('/Admin/Calendar/Set_Private_Notes', (req, res) => {
    var private_notes = req.body.private_notes.replaceAll('"', '');
    var appt_key = req.body.appt_key;
    con.query("UPDATE Appointment SET Appt_Private_Notes = '" + private_notes +
        "' WHERE Appt_Key = " + appt_key + ";",
        function(err) {
            if (err) throw err;
        })
})

app.put('/Admin/Calendar/Set_Size', (req, res) => {
    var appt_key = req.body.appt_key;
    var size = req.body.size;
    con.query("UPDATE Appointment SET Appt_Size = '" + size +
        "' WHERE Appt_Key = " + appt_key + ";",
        function(err) {
            if (err) throw err;
        })
})

app.put('/Admin/Calendar/Set_Trainer1', (req, res) => {
    var appt_key = req.body.appt_key;
    var tid_1 = req.body.trainer1;
    con.query("UPDATE Appointment SET Appt_TID_1 = '" + tid_1 +
        "' WHERE Appt_Key = " + appt_key + ";",
        function(err) {
            if (err) throw err;
        })
})

app.put('/Admin/Calendar/Set_Trainer2', (req, res) => {
    var appt_key = req.body.appt_key;
    var tid_2 = req.body.trainer2;
    con.query("UPDATE Appointment SET Appt_TID_2 = '" + tid_2 +
        "' WHERE Appt_Key = " + appt_key + ";",
        function(err) {
            if (err) throw err;
        })
})

app.put('/Admin/Calendar/Set_Group', (req, res) => {
    var appt_key = req.body.appt_key;
    var gid = req.body.group;
    con.query("UPDATE Appointment SET Appt_GID = '" + gid +
        "' WHERE Appt_Key = " + appt_key + ";",
        function(err) {
            if (err) throw err;
        })
})

module.exports = app;