const express = require('express');
const app = express();
app.listen('16322');
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
let { mini_customer } = require("./Class_Mini_Customer")

app.put('/sendNotifications', (req, res) => {
    var mini_customers = req.body.mini_customers;
    var title = req.body.title;
    var notification = req.body.notification;

    for (var i = 0; i < mini_customers.length; i++) {
        emailAppt(mini_customers[i].getEmail(), title, notification);
    }

    // Send texts
    for (var i = 0; i < mini_customers.length; i++) {
        if (mini_customers[i].getNotifications()) {
            textAppt(mini_customers[i].getPhone(), notification);
        }
    }
})

module.exports = app;