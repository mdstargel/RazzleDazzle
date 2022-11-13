const express = require('express');
const app = express();
app.use(express.json());

/**
 * Imports
 */
const { nodemailer, transporter, emailAppt, textAppt } = require('../../Notifications');
let { mini_trainer } = require("./Class_Mini_Trainer")

app.put('/Admin/Trainer/Send_Notifications', (req, res) => {
    var mini_trainers = req.body.mini_trainers;
    var title = req.body.title;
    var notification = req.body.notification;

    for (var i = 0; i < mini_trainers.length; i++) {
        emailAppt(mini_trainers[i].getEmail(), title, notification);
        textAppt(mini_trainers[i].getPhone(), notification);
    }
})

module.exports = app;