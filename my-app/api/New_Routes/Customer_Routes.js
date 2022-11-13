const express = require('express');
const app = express();
app.use(express.json());

const async = require('async');
const Get_Users = require('../src/Users/Get_Users');
const Set_Users = require('../src/Users/Set_Users');
const { Get_Customer_Calendar } = require('../src/Calendar/Get_Calendar');

app.post('/Customer', async function(req, res) {
    var CID = req.body.user_id;
    var user = Get_Users.Get_Customer(CID);
    res.send(user);
})

app.put('/Customer/Set_Name', function(req, res) {
    var CID = req.body.user_id;
    var customer_name = req.body.user_name;
    Set_Users.Set_Customer_Name(CID, customer_name);
})

app.put('/Customer/Set_Address', function(req, res) {
    var CID = req.body.user_id;
    var customer_address = req.body.user_address;
    Set_Users.Set_Customer_Address(CID, customer_address);
})

app.put('/Customer/Set_Phone_Number', function(req, res) {
    var CID = req.body.user_id;
    var customer_phone_number = req.body.user_phone_number;
    Set_Users.Set_Customer_Phone_Number(CID, customer_phone_number);
})

app.put('/Customer/Set_Email_Address', function(req, res) {
    var CID = req.body.user_id;
    var customer_email_address = req.body.user_email_address;
    Set_Users.Set_Customer_Email_Address(CID, customer_email_address);
})

app.put('/Customer/Set_Emergency_Name', function(req, res) {
    var CID = req.body.user_id;
    var customer_emergency_name = req.body.user_emergency_name;
    Set_Users.Set_Customer_Emergency_Name(CID, customer_emergency_name);
})

app.put('/Customer/Set_Emergency_Phone_Number', function(req, res) {
    var CID = req.body.user_id;
    var customer_emergency_phone_number = req.body.user_emergency_phone_number;
    Set_Users.Set_Customer_Emergency_Phone_Number(CID, customer_emergency_phone_number);
})

app.put('/Customer/Set_Phone_Notifications', function(req, res) {
    var CID = req.body.user_id;
    var customer_phone_notifications = req.body.user_phone_notifications;
    Set_Users.Set_Customer_Phone_Notifications(CID, customer_phone_notifications);
})

app.post('/Customer/Calendar', async function(req, res) {
    var CID = req.body.user_id;
    var calendar = await Get_Customer_Calendar(CID);
    res.send(calendar);
})

module.exports = app;