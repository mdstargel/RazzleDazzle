const express = require('express');
const app = express();
app.listen('16333');
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

app.put('/deleteUser', (req, res) => {
    var email;
    con.query("SELECT Train_Email_Addr FROM Trainer WHERE TID = " + req.body.trainer_id +
        ";",
        function(err, result) {
            if (err) throw err;
            email = result[0].Train_Email_Addr;
            res.json(email);
        })
    con.query("UPDATE Login SET Decomissioned = 1 WHERE Email = " +
        req.body.email + ";",
        function(err) {
            if (err) throw err;
        })
    con.query("UPDATE Appointment SET Appt_TID_1 = NULL WHERE Appt_TID_1 = " +
        req.body.trainer_id + ";",
        function(err) {
            if (err) throw err;
        })
    con.query("UPDATE Appointment SET Appt_TID_2 = NULL WHERE Appt_TID_2 = " +
        req.body.trainer_id + ";",
        function(err) {
            if (err) throw err;
        })
})

module.exports = app;