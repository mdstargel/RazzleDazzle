const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

const async = require('async');
const Get_Users = require('../src/Users/Get_Users');
const Set_Users = require('../src/Users/Set_Users');
const { Get_Trainer_Calendar } = require('../src/Calendar/Get_Calendar');
const {
    Notify_Appointment,
    Notify_Customers
} = require('../src/Notifications/Send_Notifications');


/**************************************************************************/
// Trainer
/**************************************************************************/


app.post('/Trainer', async function(req, res) {
    var TID = req.body.user_id;
    var user = Get_Users.Get_Trainer(TID);
    res.send(user);
})

app.put('/Trainer/Set_Name', function(req, res) {
    var TID = req.body.user_id;
    var trainer_name = req.body.user_name;
    Set_Users.Set_Trainer_Name(TID, trainer_name);
})

app.put('/Trainer/Set_Address', function(req, res) {
    var TID = req.body.user_id;
    var trainer_address = req.body.user_address;
    Set_Users.Set_Trainer_Address(TID, trainer_address);
})

app.put('/Trainer/Set_Phone_Number', function(req, res) {
    var TID = req.body.user_id;
    var trainer_phone_number = req.body.user_phone_number;
    Set_Users.Set_Trainer_Phone_Number(TID, trainer_phone_number);
})

app.put('/Trainer/Set_Email_Address', function(req, res) {
    var TID = req.body.user_id;
    var trainer_email_address = req.body.user_email_address;
    Set_Users.Set_Trainer_Email_Address(TID, trainer_email_address);
})

app.put('/Trainer/Set_Emergency_Name', function(req, res) {
    var TID = req.body.user_id;
    var trainer_emergency_name = req.body.user_emergency_name;
    Set_Users.Set_Trainer_Emergency_Name(TID, trainer_emergency_name);
})

app.put('/Trainer/Set_Emergency_Phone_Number', function(req, res) {
    var TID = req.body.user_id;
    var trainer_emergency_phone_number = req.body.user_emergency_phone_number;
    Set_Users.Set_Trainer_Emergency_Phone_Number(TID, trainer_emergency_phone_number);
})

app.put('/Trainer/Change_Password', function(req, res) {
    var TID = req.body.user_id;
    var old_password = req.body.old_password;
    var new_password = req.body.new_password;
    Set_Users.Set_Trainer_Password(TID, old_password, new_password);
})

app.post('/Trainer/Calendar', async function(req, res) {
    var TID = req.body.user_id;
    var calendar = await Get_Trainer_Calendar(TID);
    res.send(calendar);
})

app.put('/Trainer/Calendar/Notify_Customers', function(req, res) {
    var AID = req.body.appointment_id;
    var title = req.body.title;
    var notification = req.body.notification;
    Notify_Appointment(AID, title, notification);
})

app.put('/Trainer/Notify_Customer', function(req, res) {
    var CIDs = req.body.CIDs;
    var title = req.body.title;
    var notification = req.body.notification;
    Notify_Customers(CIDs, title, notification);
})

module.exports = app;