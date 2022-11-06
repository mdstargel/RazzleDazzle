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

con.connect(function(err) {
    if (err) throw err;
})

var getCustomers = (appt_key) => {
    var appt_cust_names = [];
    con.query("SELECT Name FROM Customer " +
        "INNER JOIN Customer_Group ON Customer.CID = Customer_Group.CID_1 " +
        "INNER JOIN Appointment ON Customer_Group.GID = Appointment.Appt_GID " +
        "WHERE Appointment.Appt_Key = " + appt_key + ";",
        function(err, result) {
            if (err) throw err;
            appt_cust_names.push(result[0].Name);
        });

    con.query("SELECT Name FROM Customer " +
        "INNER JOIN Customer_Group ON Customer.CID = Customer_Group.CID_2 " +
        "INNER JOIN Appointment ON Customer_Group.GID = Appointment.Appt_GID " +
        "WHERE Appointment.Appt_Key = " + appt_key + ";",
        function(err, result) {
            if (err) throw err;
            appt_cust_names.push(result[0].Name);
        });

    con.query("SELECT Name FROM Customer " +
        "INNER JOIN Customer_Group ON Customer.CID = Customer_Group.CID_3 " +
        "INNER JOIN Appointment ON Customer_Group.GID = Appointment.Appt_GID " +
        "WHERE Appointment.Appt_Key = " + appt_key + ";",
        function(err, result) {
            if (err) throw err;
            appt_cust_names.push(result[0].Name);
        });

    con.query("SELECT Name FROM Customer " +
        "INNER JOIN Customer_Group ON Customer.CID = Customer_Group.CID_4 " +
        "INNER JOIN Appointment ON Customer_Group.GID = Appointment.GID " +
        "WHERE Appointment.key = " + appt_key + ";",
        function(err, result) {
            if (err) throw err;
            appt_cust_names.push(result[0].Name);
        });
    return appt_cust_names;
}

con.end();