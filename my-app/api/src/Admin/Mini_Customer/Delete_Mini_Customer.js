const express = require('express');
const app = express();
app.listen('16323');
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
const { setReserved } = require("../../Customer/Appointments/Set_Customer_Appointment");

app.put('/deleteUser', (req, res) => {
    con.query("UPDATE Login SET Decomission = 1 WHERE CID = " +
        req.body.customer_id + ";",
        function(err) {
            if (err) throw err;
        });

    // Get today's date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var curr_date = yyyy + '-' + mm + '-' + dd;

    // Populate calendar
    var calendar_appt_keys = [];
    con.query("SELECT Appt_Key FROM Appointment INNER JOIN Customer_Group ON " +
        "Appointment.Appt_GID = Customer_Group.GID " +
        "WHERE Appt_Date > '" + curr_date +
        "AND (Customer_Group.CID_1 = " + req.body.customer_id + " " +
        "OR Customer_Group.CID_2 = " + req.body.customer_id + " " +
        "OR Customer_Group.CID_3 = " + req.body.customer_id + " " +
        "OR Customer_Group.CID_4 = " + req.body.customer_id + ");",
        function(err, result) {
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                calendar_appt_keys.push(result[i].Appt_Key);
            };
        });

    // Unreserve from all appointments after today
    for (var i = 0; i < calendar.length; i++) {
        if (calendar[i].getDate() > curr_date) {
            setReserved(false, calendar_appt_keys[i], customer_id);
        }
    }
})

module.exports = app;