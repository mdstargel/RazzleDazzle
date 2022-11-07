const express = require('express');
const app = express();
app.listen('16212');
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
const { nodemailer, transporter, emailAppt, textAppt } = require('../../Notifications');

var getPhoneNumbers = (appt_key) => {
    // Get all CID's
    var CID_1, CID_2, CID_3, CID_4;
    con.query("SELECT CID_1, CID_2, CID_3, CID_4 FROM Customer_Group INNER JOIN " +
        "Appointment ON GID = Appointment.Appt_GID WHERE Appointment.Appt_Key = " +
        appt_key + ";",
        function(err, result) {
            if (err) throw err;
            CID_1 = result[0].CID_1;
            CID_2 = result[0].CID_2;
            CID_3 = result[0].CID_3;
            CID_4 = result[0].CID_4;
        })

    // Get Phone Numbers
    var phone = [];
    con.query("SELECT Cust_Phone_Num, Phone_Notif FROM Customer INNER JOIN Customer_Group " +
        "ON CID = Customer_Group.CID_1 INNER JOIN Appointment ON Customer_Group.GID " +
        "= Appointment.Appt_GID WHERE Appointment.Appt_Key = " + appt_key + ";",
        function(err, result) {
            if (err) throw err;
            var pNumber = result[0].Cust_Phone_Num.match(/\d/g) + "";
            if (result[0].Phone_Notif) phone.push(pNumber);
        })

    if (CID_2 != null) {
        con.query("SELECT Cust_Phone_Num, Phone_Notif FROM Customer INNER JOIN Customer_Group " +
            "ON CID = Customer_Group.CID_2 INNER JOIN Appointment ON Customer_Group.GID " +
            "= Appointment.Appt_GID WHERE Appointment.Appt_Key = " + appt_key + ";",
            function(err, result) {
                if (err) throw err;
                var pNumber = result[0].Cust_Phone_Num.match(/\d/g) + "";
                if (result[0].Phone_Notif) phone.push(pNumber);
            })
    }

    if (CID_3 != null) {
        con.query("SELECT Cust_Phone_Num, Phone_Notif FROM Customer INNER JOIN Customer_Group " +
            "ON CID = Customer_Group.CID_3 INNER JOIN Appointment ON Customer_Group.GID " +
            "= Appointment.Appt_GID WHERE Appointment.Appt_Key = " + appt_key + ";",
            function(err, result) {
                if (err) throw err;
                var pNumber = result[0].Cust_Phone_Num.match(/\d/g) + "";
                if (result[0].Phone_Notif) phone.push(pNumber);
            })
    }

    if (CID_4 != null) {
        con.query("SELECT Cust_Phone_Num, Phone_Notif FROM Customer INNER JOIN Customer_Group " +
            "ON CID = Customer_Group.CID_4 INNER JOIN Appointment ON Customer_Group.GID " +
            "= Appointment.Appt_GID WHERE Appointment.Appt_Key = " + appt_key + ";",
            function(err, result) {
                if (err) throw err;
                var pNumber = result[0].Cust_Phone_Num.match(/\d/g) + "";
                if (result[0].Phone_Notif) phone.push(pNumber);
            })
    }

    return phone;
}

var getEmails = (appt_key) => {
    // Get all CID's
    var CID_1, CID_2, CID_3, CID_4;
    con.query("SELECT CID_1, CID_2, CID_3, CID_4 FROM Customer_Group INNER JOIN " +
        "Appointment ON GID = Appointment.Appt_GID WHERE Appointment.Appt_Key = " +
        this.appt_key + ";",
        function(err, result) {
            if (err) throw err;
            CID_1 = result[0].CID_1;
            CID_2 = result[0].CID_2;
            CID_3 = result[0].CID_3;
            CID_4 = result[0].CID_4;
        })

    // Get email addresses
    var emails = [];
    con.query("SELECT Cust_Email_Addr FROM Customer INNER JOIN Customer_Group " +
        "ON CID = Customer_Group.CID_1 INNER JOIN Appointment ON Customer_Group.GID " +
        "= Appointment.Appt_GID WHERE Appointment.Appt_Key = " + appt_key + ";",
        function(err, result) {
            if (err) throw err;
            emails.push(result[0].Cust_Email_Addr);
        })

    if (CID_2 != null) {
        con.query("SELECT Cust_Email_Addr FROM Customer INNER JOIN Customer_Group " +
            "ON CID = Customer_Group.CID_2 INNER JOIN Appointment ON Customer_Group.GID " +
            "= Appointment.Appt_GID WHERE Appointment.Appt_Key = " + appt_key + ";",
            function(err, result) {
                if (err) throw err;
                emails.push(result[0].Cust_Email_Addr);
            })
    }

    if (CID_3 != null) {
        con.query("SELECT Cust_Email_Addr FROM Customer INNER JOIN Customer_Group " +
            "ON CID = Customer_Group.CID_3 INNER JOIN Appointment ON Customer_Group.GID " +
            "= Appointment.Appt_GID WHERE Appointment.Appt_Key = " + appt_key + ";",
            function(err, result) {
                if (err) throw err;
                emails.push(result[0].Cust_Email_Addr);
            })
    }

    if (CID_4 != null) {
        con.query("SELECT Cust_Email_Addr FROM Customer INNER JOIN Customer_Group " +
            "ON CID = Customer_Group.CID_4 INNER JOIN Appointment ON Customer_Group.GID " +
            "= Appointment.Appt_GID WHERE Appointment.Appt_Key = " + appt_key + ";",
            function(err, result) {
                if (err) throw err;
                emails.push(result[0].Cust_Email_Addr);
            })
    }

    return emails;
}


app.put('/sendNotifications', (req, res) => {
    var appt_key = req.body.appt_key;
    var title = req.body.title;
    var notification = req.body.notification;

    var emails = getEmails(appt_key);
    for (var i = 0; i < emails.length; i++) {
        emailAppt(emails[i], title, notification);
    }

    // Send texts
    var phone = getPhoneNumbers(appt_key);
    for (var i = 0; i < phone.length; i++) {
        textAppt(phone[i], notification);
    }
})

module.exports = app;