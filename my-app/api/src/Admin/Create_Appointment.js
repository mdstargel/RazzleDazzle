const express = require('express');
const app = express();
app.listen('16303');

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

app.put('/createAppointment', (req, res) => {
    var appt_name = req.body.appt_name;
    var appt_date = req.body.appt_date;
    var appt_time = req.body.appt_time;
    var appt_difficulty = req.body.appt_difficulty;
    var appt_desc = req.body.appt_desc;
    var appt_pub_notes = req.body.appt_pub_notes;
    var appt_priv_notes = req.body.appt_priv_notes;
    var appt_size = req.body.appt_size;
    var appt_TID_1 = req.body.appt_TID_1;
    var appt_TID_2 = req.body.appt_TID_2;

    // Reconfigure default values
    if (appt_difficulty == '') appt_difficulty = 0;
    if (appt_desc == '') appt_desc = null;
    if (appt_pub_notes == '') appt_pub_notes = null;
    if (appt_priv_notes == '') appt_priv_notes = null;
    if (appt_size == '') appt_size = 1;
    if (appt_TID_1 == '') appt_TID_1 = null;
    if (appt_TID_2 == '') appt_TID_2 = null;

    // Insert appointment
    con.query("INSERT INTO Appointment (Appt_Name, Appt_Date, Appt_Time, Appt_Difficulty, " +
        "Appt_Description, Appt_Public_Notes, Appt_Private_Notes, Appt_Size, Appt_TID_1, Appt_TID_2, Appt_GID) " +
        "VALUES ('" + appt_name + "', '" + appt_date + "', '" + appt_time + "', '" +
        appt_difficulty + "', '" + appt_desc + "', '" + appt_pub_notes + "', '" +
        appt_priv_notes + "', '" + appt_size + "', '" + appt_TID_1 + "', '" +
        appt_TID_2 + "', null);",
        function(err) {
            if (err) throw err;
        })

    // Get appt key
    var appt_key;
    con.query("SELECT Appt_Key FROM Appointment ORDER BY Appt_Key DESC LIMIT 1;", function(err, result) {
        if (err) throw err;
        appt_key = result[0].Appt_Key;
    })
})

module.exports = create_Appointment;