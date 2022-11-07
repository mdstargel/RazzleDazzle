const express = require('express');
const app = express();
app.listen('16313');
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

app.put('/deleteAppointment', (req, res) => {
    var appt_key = req.body.appt_key;
    var gid;
    con.query("SELECT Appt_GID FROM Appointment WHERE Appt_Key = " + appt_key +
        ";",
        function(err, result) {
            if (err) throw err;
            gid = result[0].Appt_GID;
        })
    if (this.appt_GID != null) {
        con.query("DELETE FROM Customer_Group WHERE GID = '" + this.appt_GID + "';",
            function(err) {
                if (err) throw err;
            })
    }
    con.query("DELETE FROM Appointment WHERE Appt_Key = " + this.appt_key + ";",
        function(err) {
            if (err) throw err;
        })
})

module.exports = app;