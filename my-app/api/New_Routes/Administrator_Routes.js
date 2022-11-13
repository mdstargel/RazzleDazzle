const express = require('express');
const app = express();
app.use(express.json());

const async = require('async');
const Get_Users = require('../src/Users/Get_Users');
const Set_Users = require('../src/Users/Set_Users');
const { Get_Administrator_Calendar } = require('../src/Calendar/Get_Calendar');

app.post('/Admin', async function(req, res) {
    var TID = req.body.user_id;
    var user = Get_Users.Get_Trainer(TID);
    res.send(user);
})

app.put('/Admin/Set_Name', function(req, res) {
    var TID = req.body.user_id;
    var trainer_name = req.body.user_name;
    Set_Users.Set_Trainer_Name(TID, trainer_name);
})

app.put('/Admin/Set_Address', function(req, res) {
    var TID = req.body.user_id;
    var trainer_address = req.body.user_address;
    Set_Users.Set_Trainer_Address(TID, trainer_address);
})

app.put('/Admin/Set_Phone_Number', function(req, res) {
    var TID = req.body.user_id;
    var trainer_phone_number = req.body.user_phone_number;
    Set_Users.Set_Trainer_Phone_Number(TID, trainer_phone_number);
})

app.put('/Admin/Set_Email_Address', function(req, res) {
    var TID = req.body.user_id;
    var trainer_email_address = req.body.user_email_address;
    Set_Users.Set_Trainer_Email_Address(TID, trainer_email_address);
})

app.put('/Admin/Set_Emergency_Name', function(req, res) {
    var TID = req.body.user_id;
    var trainer_emergency_name = req.body.user_emergency_name;
    Set_Users.Set_Trainer_Emergency_Name(TID, trainer_emergency_name);
})

app.put('/Admin/Set_Emergency_Phone_Number', function(req, res) {
    var TID = req.body.user_id;
    var trainer_emergency_phone_number = req.body.user_emergency_phone_number;
    Set_Users.Set_Trainer_Emergency_Phone_Number(TID, trainer_emergency_phone_number);
})

app.put('/Admin/Set_Riding_Style', function(req, res) {
    var TID = req.body.user_id;
    var trainer_riding_style = req.body.user_riding_style;
    Set_Users.Set_Trainer_Riding_Style(TID, trainer_riding_style);
})

app.post('/Admin/Calendar', async function(req, res) {
    var TID = req.body.user_id;
    var calendar = await Get_Administrator_Calendar(TID);
    res.send(calendar);
})

app.get('/Admin/Customer', async function(req, res) {
    var customers = await Get_Users.Get_All_Customers();
    res.send(customers);
})

app.put('/Admin/Customer/Set_Difficulty', function(req, res) {
    var CID = req.body.user_id;
    var customer_difficulty = req.body.user_difficulty;
    Set_Users.Set_Customer_Difficulty(CID, customer_difficulty);
})

app.get('/Admin/Trainer', async function(req, res) {
    var trainers = await Get_Users.Get_All_Trainers();
    res.send(trainers);
})

app.put('/Admin/Trainer/Set_Riding_Style', function(req, res) {
    var TID = req.body.user_id;
    var trainer_riding_style = req.body.user_riding_style;
    Set_Users.Set_Trainer_Riding_Style(TID, trainer_riding_style);
})

app.put('/Admin/Trainer/Set_Trainer_Administrator', function(req, res) {
    var TID = req.body.user_id;
    var administrator = req.body.user_administrator;
    Set_Users.Set_Trainer_Administrator(TID, administrator);
})

module.exports = app;