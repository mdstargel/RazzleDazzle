const express = require('express');
const app = express();
app.listen('16211');

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

app.put('/setPublicNotes', (req , res) => {
    con.query("UPDATE Appointment SET Appt_Public_Notes = '" + req.body.notes +
        "' WHERE Appt_Key = " + req.body.appt_key + ";",
        function(err) {
            if (err) throw err;
        });
})

app.put('/setPrivateNotes', (req , res) => {
    con.query("UPDATE Appointment SET Appt_Public_Notes = '" + req.body.notes +
        "' WHERE Appt_Key = " + req.body.appt_key + ";",
        function(err) {
            if (err) throw err;
        });
})

module.exports = set_Trainer_Appointment;