const express = require('express');
const app = express();
app.use(express.json());

const con = require('../../mysql.js');

/**
 * Imports
 */
let { micro_trainer } = require("./Micro_Trainer/Class_Micro_Trainer");

app.get('/Admin/Calendar/Update_Name', (req, res) => {
    var name;
    var appt_key = req.body.appt_key;
    con.query("SELECT Appt_Name FROM Appointment WHERE Appt_Key = " +
        appt_key + ";",
        function(err, result) {
            if (err) throw err;
            name = result[0].Appt_Name;
            res.send(name);
        })
})

app.get('/Admin/Calendar/Update_Date', (req, res) => {
    var date;
    var appt_key = req.body.appt_key;
    con.query("SELECT Appt_Date FROM Appointment WHERE Appt_Key = " +
        appt_key + ";",
        function(err, result) {
            if (err) throw err;
            date = result[0].Appt_Date + "";
            res.send(date);
        })
})

app.get('/Admin/Calendar/Update_Start_Time', (req, res) => {
    var time;
    var appt_key = req.body.appt_key;
    con.query("SELECT Appt_Time FROM Appointment WHERE Appt_Key = " +
        appt_key + ";",
        function(err, result) {
            if (err) throw err;
            time = result[0].Appt_Time + "";
            res.send(time);
        })
})

app.get('/Admin/Calendar/Update_End_Time', (req, res) => {
    var time;
    var appt_key = req.body.appt_key;
    con.query("SELECT Appt_End_Time FROM Appointment WHERE Appt_Key = " +
        appt_key + ";",
        function(err, result) {
            if (err) throw err;
            time = result[0].Appt_Time + "";
            res.send(time);
        })
})

app.get('/Admin/Calendar/Update_Type', (req, res) => {
    var type;
    var appt_key = req.body.appt_key;
    con.query("SELECT Appt_Type FROM Appointment WHERE Appt_Key = " +
        appt_key + ";",
        function(err, result) {
            if (err) throw err;
            type = result[0].Appt_Type;
            res.send(type);
        })
})

app.get('/Admin/Calendar/Update_Difficulty', (req, res) => {
    var diff;
    var appt_key = req.body.appt_key;
    con.query("SELECT Appt_Difficulty FROM Appointment WHERE Appt_Key = " +
        appt_key + ";",
        function(err, result) {
            if (err) throw err;
            diff = result[0].Appt_Difficulty;
            res.send(diff);
        })
    return diff;
})

app.get('/Admin/Calendar/Update_Description', (req, res) => {
    var desc;
    var appt_key = req.body.appt_key;
    con.query("SELECT Appt_Description FROM Appointment WHERE Appt_Key = " +
        appt_key + ";",
        function(err, result) {
            if (err) throw err;
            desc = result[0].Appt_Description;
            res.send(desc);
        })
})

app.get('/Admin/Calendar/Update_Public_Notes', (req, res) => {
    var pub_notes;
    var appt_key = req.body.appt_key;
    con.query("SELECT Appt_Public_Notes FROM Appointment WHERE Appt_Key = " +
        appt_key + ";",
        function(err, result) {
            if (err) throw err;
            pub_notes = result[0].Appt_Public_Notes;
            res.send(pub_notes);
        })
})

app.get('/Admin/Calendar/Update_Private_Notes', (req, res) => {
    var priv_notes;
    var appt_key = req.body.appt_key;
    con.query("SELECT Appt_Private_Notes FROM Appointment WHERE Appt_Key = " +
        appt_key + ";",
        function(err, result) {
            if (err) throw err;
            priv_notes = result[0].Appt_Private_Notes;
            res.send(priv_notes);
        })
})

app.get('/Admin/Calendar/Update_Size', (req, res) => {
    var size;
    var appt_key = req.body.appt_key;
    con.query("SELECT Appt_Size FROM Appointment WHERE Appt_Key = " +
        appt_key + ";",
        function(err, result) {
            if (err) throw err;
            size = result[0].Appt_Size;
            res.send(size);
        })
})

app.get('//Admin/Calendar/Update_Trainer1', (req, res) => {
    var tid_1;
    var appt_key = req.body.appt_key;
    con.query("SELECT Appt_TID_1 FROM Appointment WHERE Appt_Key = " +
        appt_key + ";",
        function(err, result) {
            if (err) throw err;
            tid_1 = result[0].Appt_TID_1;
            res.send(tid_1);
        })
})

app.get('/Admin/Calendar/Update_Trainer2', (req, res) => {
    var tid_2;
    var appt_key = req.body.appt_key;
    con.query("SELECT Appt_TID_2 FROM Appointment WHERE Appt_Key = " +
        appt_key + ";",
        function(err, result) {
            if (err) throw err;
            tid_2 = result[0].Appt_TID_2;
            res.send(tid_2);
        })
})

app.get('/Admin/Calendar/Update_Group', (req, res) => {
    var gid;
    var appt_key = req.body.appt_key;
    con.query("SELECT Appt_GID FROM Appointment WHERE Appt_Key = '" +
        appt_key + "';",
        function(err, result) {
            if (err) throw err;
            gid = result[0].Appt_GID;
            res.send(gid);
        })
})

app.get('/Admin/Calendar/Update_Trainers', (req, res) => {
    var micro_trainers = [];
    con.query("SELECT TID, Train_Name FROM Trainer;",
        function(err, result) {
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                micro_trainers.push(new micro_trainer(result[i].TID, result[i].Train_Name));
            }
            res.send(micro_trainers);
        })
})

module.exports = app;