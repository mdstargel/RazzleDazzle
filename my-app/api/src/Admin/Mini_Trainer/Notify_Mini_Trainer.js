const express = require('express');
const app = express();
app.listen('16332');

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
let { mini_trainer } = require("./Class_Mini_Trainer")

app.put('/sendNotifications', (req , res) => {
    var mini_trainers = req.body.mini_trainers;
    var title = req.body.title;
    var notification = req.body.notification;

    for (var i = 0; i < mini_trainers.length; i++) {
        emailAppt(mini_trainers[i].getEmail(), title, notification);
        textAppt(mini_trainers[i].getPhone(), notification);
    }
})


module.exports = notify_Mini_Trainer;