const express = require('express');
const app = express();
app.listen('16310');
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

/**
 * Imports
 */
let { micro_trainer } = require("./Micro_Trainer/Class_Micro_Trainer");

app.get('/updateName', (req, res) => {
    var name;
    con.query("SELECT Appt_Name FROM Appointment WHERE Appt_Key = " +
        req.body.appt_key + ";",
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
            time = result[0].Appt_Date;
            res.json(time);
        })
})

app.get('/updateDifficulty', (req, res) => {
    var diff;
    con.query("SELECT Appt_Difficulty FROM Appointment WHERE Appt_Key = " +
        req.body.appt_key + ";",
        function(err, result) {
            if (err) throw err;
            diff = result[0].Appt_Difficulty;
            res.json(diff);
        })
    return diff;
})

app.get('/updateDescription', (req, res) => {
    var desc;
    con.query("SELECT Appt_Description FROM Appointment WHERE Appt_Key = " +
        req.body.appt_key + ";",
        function(err, result) {
            if (err) throw err;
            desc = result[0].Appt_Description;
            res.json(desc);
        })
})

app.get('/updatePublicNotes', (req, res) => {
    var pub_notes;
    con.query("SELECT Appt_Public_Notes FROM Appointment WHERE Appt_Key = " +
        req.body.appt_key + ";",
        function(err, result) {
            if (err) throw err;
            pub_notes = result[0].Appt_Public_Notes;
            res.json(pub_notes);
        })
})

app.get('/updatePrivateNotes', (req, res) => {
    var priv_notes;
    con.query("SELECT Appt_Private_Notes FROM Appointment WHERE Appt_Key = " +
        req.body.appt_key + ";",
        function(err, result) {
            if (err) throw err;
            priv_notes = result[0].Appt_Private_Notes;
            res.json(priv_notes);
        })
})

app.get('/updateSize', (req, res) => {
    var size;
    con.query("SELECT Appt_Size FROM Appointment WHERE Appt_Key = " +
        req.body.appt_key + ";",
        function(err, result) {
            if (err) throw err;
            size = result[0].Appt_Size;
            res.json(size);
        })
})

app.get('/updateTID1', (req, res) => {
    var tid_1;
    con.query("SELECT Appt_TID_1 FROM Appointment WHERE Appt_Key = " +
        req.body.appt_key + ";",
        function(err, result) {
            if (err) throw err;
            tid_1 = result[0].Appt_TID_1;
            res.json(tid_1);
        })
})

app.get('/updateTID2', (req, res) => {
    var tid_2;
    con.query("SELECT Appt_TID_2 FROM Appointment WHERE Appt_Key = " +
        req.body.appt_key + ";",
        function(err, result) {
            if (err) throw err;
            tid_2 = result[0].Appt_TID_2;
            res.json(tid_2);
        })
})

app.get('/updateGID', (req, res) => {
    var gid;
    con.query("SELECT Appt_GID FROM Appointment WHERE Appt_Key = '" +
        req.body.appt_key + "';",
        function(err, result) {
            if (err) throw err;
            gid = result[0].Appt_GID;
            res.json(gid);
        })
})

app.get('/updateMicroTrainers', (req, res) => {
    var micro_trainers = [];
    con.query("SELECT TID, Train_Name FROM Trainer;",
        function(err, result) {
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                micro_trainers.push(new micro_trainer(result[i].TID, result[i].Train_Name));
            }
            res.json(micro_trainers);
        })
})

module.exports = app;