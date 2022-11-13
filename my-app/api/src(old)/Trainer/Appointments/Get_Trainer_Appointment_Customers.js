const express = require('express');
const app = express();
app.listen('16213');
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

app.get('/getCustomers', (req, res) => {
    var appt_cust_names = [];
    con.query("SELECT Name FROM Customer " +
        "INNER JOIN Customer_Group ON Customer.CID = Customer_Group.CID_1 " +
        "INNER JOIN Appointment ON Customer_Group.GID = Appointment.Appt_GID " +
        "WHERE Appointment.Appt_Key = " + req.body.appt_key + ";",
        function(err, result) {
            if (err) throw err;
            appt_cust_names.push(result[0].Name);
        });

    con.query("SELECT Name FROM Customer " +
        "INNER JOIN Customer_Group ON Customer.CID = Customer_Group.CID_2 " +
        "INNER JOIN Appointment ON Customer_Group.GID = Appointment.Appt_GID " +
        "WHERE Appointment.Appt_Key = " + req.body.appt_key + ";",
        function(err, result) {
            if (err) throw err;
            appt_cust_names.push(result[0].Name);
        });

    con.query("SELECT Name FROM Customer " +
        "INNER JOIN Customer_Group ON Customer.CID = Customer_Group.CID_3 " +
        "INNER JOIN Appointment ON Customer_Group.GID = Appointment.Appt_GID " +
        "WHERE Appointment.Appt_Key = " + req.body.appt_key + ";",
        function(err, result) {
            if (err) throw err;
            appt_cust_names.push(result[0].Name);
        });

    con.query("SELECT Name FROM Customer " +
        "INNER JOIN Customer_Group ON Customer.CID = Customer_Group.CID_4 " +
        "INNER JOIN Appointment ON Customer_Group.GID = Appointment.GID " +
        "WHERE Appointment.key = " + req.body.appt_key + ";",
        function(err, result) {
            if (err) throw err;
            appt_cust_names.push(result[0].Name);
            res.json(appt_cust_names);
        });

})

module.exports = app;