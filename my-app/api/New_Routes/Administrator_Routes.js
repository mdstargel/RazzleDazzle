const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

const async = require('async');
const {
    Get_All_Customers,
    Get_Mini_Customers,
    Get_Trainer,
    Get_All_Trainers,
    Get_Mini_Trainers
} = require('../src/Users/Get_Users');
const {
    Set_Customer_Difficulty,
    Set_Trainer_Name,
    Set_Trainer_Address,
    Set_Trainer_Phone_Number,
    Set_Trainer_Email_Address,
    Set_Trainer_Emergency_Name,
    Set_Trainer_Emergency_Phone_Number,
    Set_Trainer_Riding_Style,
    Set_Trainer_Administrator,
    Set_Trainer_Password,
    Delete_Customer,
    Delete_Trainer
} = require('../src/Users/Set_Users');

const {
    Set_Appointment_Name,
    Set_Appointment_Date,
    Set_Appointment_Start_Time,
    Set_Appointment_End_Time,
    Set_Appointment_Riding_Style,
    Set_Appointment_Difficulty,
    Set_Appointment_Description,
    Set_Appointment_Public_Notes,
    Set_Appointment_Private_Notes,
    Set_Appointment_Group,
    Set_Appointment_Group_Size,
    Set_Appointment_TID_1,
    Set_Appointment_TID_2,
    Delete_Appointment
} = require('../src/Calendar/Appointments/Set_Appointments');
const { Create_News } = require('../src/News/Create_News');
const { Get_Administrator_Calendar } = require('../src/Calendar/Get_Calendar');
const {
    Set_News_Image_URL,
    Set_News_Title,
    Set_News_Link,
    Set_News_Description,
    Delete_News
} = require('../src/News/Set_News');
const { Get_All_News } = require('../src/News/Get_News');
const { Create_Appointment } = require('../src/Calendar/Appointments/Create_Appointment');
const { Create_Trainer } = require('../src/Users/Create_Users');
const {
    Notify_Appointment,
    Notify_Customers,
    Notify_Trainers
} = require('../src/Notifications/Send_Notifications');

/**************************************************************************/
// Admin
/**************************************************************************/


app.post('/Admin', async function(req, res) {
    var TID = req.body.user_id;
    var user = await Get_Trainer(TID);
    res.send(user);
})

app.post('/Admin/Set_Personal_Information', function(req, res) {
    var TID = req.body.user_id;
    var trainer_name = req.body.user_name;
    var trainer_address = req.body.user_address;
    var trainer_phone_number = req.body.user_phone_number;
    var trainer_email_address = req.body.user_email_address;
    Set_Trainer_Name(TID, trainer_name);
    Set_Trainer_Address(TID, trainer_address);
    Set_Trainer_Phone_Number(TID, trainer_phone_number);
    Set_Trainer_Email_Address(TID, trainer_email_address);
    res.send("");
})

app.post('/Admin/Set_Name', function(req, res) {
    var TID = req.body.user_id;
    var trainer_name = req.body.user_name;
    Set_Trainer_Name(TID, trainer_name);
    res.send("");
})

app.post('/Admin/Set_Address', function(req, res) {
    var TID = req.body.user_id;
    var trainer_address = req.body.user_address;
    Set_Trainer_Address(TID, trainer_address);
    res.send("");
})

app.post('/Admin/Set_Phone_Number', function(req, res) {
    var TID = req.body.user_id;
    var trainer_phone_number = req.body.user_phone_number;
    Set_Trainer_Phone_Number(TID, trainer_phone_number);
    res.send("");
})

app.post('/Admin/Set_Email_Address', function(req, res) {
    var TID = req.body.user_id;
    var trainer_email_address = req.body.user_email_address;
    Set_Trainer_Email_Address(TID, trainer_email_address);
    res.send("");
})

app.post('/Admin/Set_Emergency_Name', function(req, res) {
    var TID = req.body.user_id;
    var trainer_emergency_name = req.body.user_emergency_name;
    Set_Trainer_Emergency_Name(TID, trainer_emergency_name);
    res.send("");
})

app.post('/Admin/Set_Emergency_Phone_Number', function(req, res) {
    var TID = req.body.user_id;
    var trainer_emergency_phone_number = req.body.user_emergency_phone_number;
    Set_Trainer_Emergency_Phone_Number(TID, trainer_emergency_phone_number);
    res.send("");
})

app.post('/Admin/Set_Riding_Style', function(req, res) {
    var TID = req.body.user_id;
    var trainer_riding_style = req.body.user_riding_style;
    Set_Trainer_Riding_Style(TID, trainer_riding_style);
    res.send("");
})

app.post('/Admin/Change_Password', function(req, res) {
    var TID = req.body.user_id;
    var old_password = req.body.old_password;
    var new_password = req.body.new_password;
    Set_Trainer_Password(TID, old_password, new_password);
    res.send("");
})

/**************************************************************************/
// Calendar management
/**************************************************************************/

app.get('/Admin/Calendar', async function(req, res) {
    var calendar = await Get_Administrator_Calendar();
    res.send(calendar);
})

app.get('/Admin/Calendar/Get_Customers', async function(req, res) {
    var customers = await Get_Mini_Customers();
    res.send(customers);
})

app.get('/Admin/Calendar/Get_Trainers', async function(req, res) {
    var trainers = await Get_Mini_Trainers();
    res.send(trainers);
})

app.post('/Admin/Calendar/Create', function(req, res) {
    var appointment_name = req.body.appointment_name;
    var appointment_date = req.body.appointment_date;
    var appointment_start_time = req.body.appointment_start_time;
    var appointment_end_time = req.body.appointment_end_time;
    var appointment_riding_style = req.body.appointment_riding_style;
    var appointment_difficulty = req.body.appointment_difficulty;
    var appointment_description = req.body.appointment_description;
    var appointment_public_notes = req.body.appointment_public_notes;
    var appointment_private_notes = req.body.appointment_private_notes;
    var appointment_group = req.body.appointment_group;
    var appointment_group_size = req.body.appointment_group_size;
    var appointment_TID_1 = req.body.appointment_TID_1;
    var appointment_TID_2 = req.body.appointment_TID_2;

    if (appointment_difficulty === undefined) appointment_difficulty = 0;
    if (appointment_description === undefined) appointment_description = "";
    if (appointment_public_notes === undefined) appointment_public_notes = "";
    if (appointment_private_notes === undefined) appointment_private_notes = "";
    if (appointment_group === undefined) appointment_group = 0;
    if (appointment_group_size === undefined) appointment_group_size = 1;
    if (appointment_TID_1 === undefined) appointment_TID_1 = 5;
    if (appointment_TID_2 === undefined) appointment_TID_2 = 5;

    Create_Appointment(
        appointment_name,
        appointment_date,
        appointment_start_time,
        appointment_end_time,
        appointment_riding_style,
        appointment_difficulty,
        appointment_description,
        appointment_public_notes,
        appointment_private_notes,
        appointment_group,
        appointment_group_size,
        appointment_TID_1,
        appointment_TID_2
    );
    res.send("");
})

app.post('/Admin/Calendar/Set_Name', function(req, res) {
    var AID = req.body.appointment_id;
    var appointment_name = req.body.appointment_name;
    Set_Appointment_Name(AID, appointment_name);
    res.send("");
})

app.post('/Admin/Calendar/Set_Date', function(req, res) {
    var AID = req.body.appointment_id;
    var appointment_date = req.body.appointment_date;
    Set_Appointment_Date(AID, appointment_date);
    res.send("");
})

app.post('/Admin/Calendar/Set_Start_Time', function(req, res) {
    var AID = req.body.appointment_id;
    var appointment_start_time = req.body.appointment_start_time;
    Set_Appointment_Start_Time(AID, appointment_start_time);
    res.send("");
})

app.post('/Admin/Calendar/Set_End_Time', function(req, res) {
    var AID = req.body.appointment_id;
    var appointment_end_time = req.body.appointment_end_time;
    Set_Appointment_End_Time(AID, appointment_end_time);
    res.send("");
})

app.post('/Admin/Calendar/Set_Riding_Style', function(req, res) {
    var AID = req.body.appointment_id;
    var appointment_riding_style = req.body.appointment_riding_style;
    Set_Appointment_Riding_Style(AID, appointment_riding_style);
    res.send("");
})

app.post('/Admin/Calendar/Set_Difficulty', function(req, res) {
    var AID = req.body.appointment_id;
    var appointment_difficulty = req.body.appointment_difficulty;
    Set_Appointment_Difficulty(AID, appointment_difficulty);
    res.send("");
})

app.post('/Admin/Calendar/Set_Description', function(req, res) {
    var AID = req.body.appointment_id;
    var appointment_description = req.body.appointment_description;
    Set_Appointment_Description(AID, appointment_description);
    res.send("");
})

app.post('/Admin/Calendar/Set_Public_Notes', function(req, res) {
    var AID = req.body.appointment_id;
    var appointment_public_notes = req.body.appointment_public_notes;
    Set_Appointment_Public_Notes(AID, appointment_public_notes);
    res.send("");
})

app.post('/Admin/Calendar/Set_Private_Notes', function(req, res) {
    var AID = req.body.appointment_id;
    var appointment_private_notes = req.body.appointment_private_notes;
    Set_Appointment_Private_Notes(AID, appointment_private_notes);
    res.send("");
})

app.post('/Admin/Calendar/Set_Group', function(req, res) {
    var AID = req.body.appointment_id;
    var appointment_group = req.body.appointment_group;
    Set_Appointment_Group(AID, appointment_group);
    res.send("");
})

app.post('/Admin/Calendar/Set_Group_Size', function(req, res) {
    var AID = req.body.appointment_id;
    var appointment_group_size = req.body.appointment_name;
    Set_Appointment_Group_Size(AID, appointment_group_size);
    res.send("");
})

app.post('/Admin/Calendar/Set_TID_1', function(req, res) {
    var AID = req.body.appointment_id;
    var appointment_TID_1 = req.body.appointment_name;
    Set_Appointment_TID_1(AID, appointment_TID_1);
    res.send("");
})

app.post('/Admin/Calendar/Set_TID_2', function(req, res) {
    var AID = req.body.appointment_id;
    var appointment_TID_2 = req.body.appointment_TID_2;
    Set_Appointment_TID_2(AID, appointment_TID_2);
    res.send("");
})

app.post('/Admin/Calendar/Delete_Appointment', function(req, res) {
    var AID = req.body.appointment_id;
    Delete_Appointment(AID);
    res.send("");
})

app.post('/Admin/Calendar/Notify_Customers', function(req, res) {
    var AID = req.body.appointment_id;
    var title = req.body.title;
    var notification = req.body.notification;
    Notify_Appointment(AID, title, notification);
    res.send("");
})

/**************************************************************************/
// Customer management
/**************************************************************************/

app.get('/Admin/Customer', async function(req, res) {
    var customers = await Get_All_Customers();
    res.send(customers);
})

app.post('/Admin/Customer/Set_Difficulty', function(req, res) {
    var CID = req.body.user_id;
    var customer_difficulty = req.body.user_difficulty;
    Set_Customer_Difficulty(CID, customer_difficulty);
    res.send("");
})

app.post('/Admin/Customer/Delete', function(req, res) {
    var CID = req.body.user_id;
    Delete_Customer(CID);
    res.send("");
})

app.post('/Admin/Customer/Notify', function(req, res) {
    var CIDs = req.body.CIDs;
    var title = req.body.title;
    var notification = req.body.notification;
    Notify_Customers(CIDs, title, notification);
    res.send("");
})

/**************************************************************************/
// Trainer management
/**************************************************************************/

app.get('/Admin/Trainer', async function(req, res) {
    var trainers = await Get_All_Trainers();
    res.send(trainers);
})

app.post('/Admin/Trainer/Set_Values', function(req, res) {
    var TID = req.body.user_id;
    var trainer_name = req.body.user_name;
    var trainer_address = req.body.user_address;
    var trainer_riding_style = req.body.user_riding_style;
    var trainer_email_address = req.body.user_email_address;
    var trainer_administrator = req.body.user_admin;
    Set_Trainer_Name(TID, trainer_name);
    Set_Trainer_Address(TID, trainer_address);
    Set_Trainer_Riding_Style(TID, trainer_riding_style);
    Set_Trainer_Email_Address(TID, trainer_email_address);
    Set_Trainer_Administrator(TID, trainer_administrator);
    res.send("");
})

app.post('/Admin/Trainer/Set_Riding_Style', function(req, res) {
    var TID = req.body.user_id;
    var trainer_riding_style = req.body.user_riding_style;
    Set_Trainer_Riding_Style(TID, trainer_riding_style);
    res.send("");
})

app.post('/Admin/Trainer/Set_Trainer_Administrator', function(req, res) {
    var TID = req.body.user_id;
    var administrator = req.body.user_administrator;
    Set_Trainer_Administrator(TID, administrator);
    res.send("");
})

app.post('/Admin/Trainer/Create', async function(req, res) {
    var trainer_name = req.body.trainer_name;
    var trainer_address = req.body.trainer_address;
    var trainer_phone_number = req.body.trainer_phone_number;
    var trainer_email_address = req.body.trainer_email_address;
    var trainer_emergency_name = req.body.trainer_emergency_name;
    var trainer_emergency_phone_number = req.body.trainer_emergency_phone_number;
    var trainer_riding_style = req.body.trainer_riding_style;
    var trainer_administrator = req.body.trainer_administrator;

    if (trainer_phone_number == undefined) trainer_phone_number = "";
    if (trainer_address == undefined) trainer_address = "";
    if (trainer_phone_number == undefined) trainer_phone_number = "";
    if (trainer_emergency_name == undefined) trainer_emergency_name = "";
    if (trainer_emergency_phone_number == undefined) trainer_emergency_phone_number = "";

    var TID = await Create_Trainer(
        trainer_name,
        trainer_address,
        trainer_phone_number,
        trainer_email_address,
        trainer_emergency_name,
        trainer_emergency_phone_number,
        trainer_riding_style);

    if (TID != 0) {
        await Set_Trainer_Administrator(TID, trainer_adminisitrator);
    }

    res.send("");
})

app.post('/Admin/Trainer/Notify', function(req, res) {
    var TIDs = req.body.CIDs;
    var title = req.body.title;
    var notification = req.body.notification;
    Notify_Customers(TIDs, title, notification);
    res.send("");
})

app.post('/Admin/Trainer/Delete', function(req, res) {
    var TIDs_to_be_deleted = req.body.user_ids;

    for (var i = 0; i < TIDs_to_be_deleted.length; i++) {
        Delete_Trainer(TIDs_to_be_deleted[i]);
    }

    res.send("");
})

/**************************************************************************/
// News
/**************************************************************************/

app.get('/Admin/News', async function(req, res) {
    var admin_news = await Get_All_News();
    res.send(admin_news);
})

app.post('/Admin/News/Create', async function(req, res) {
    var news_image_url = req.body.news_image_url;
    var news_title = req.body.news_title;
    var news_link = req.body.news_link;
    var news_description = req.body.news_description;

    if (news_link == undefined) news_link = "";
    if (news_description == undefined) news_description = "";


    await Create_News(news_image_url, news_title, news_link, news_description);
    var admin_news = await Get_All_News();
    res.send(admin_news);
})

app.post('/Admin/News/Set_Image_URL', function(req, res) {
    var news_image_url = req.body.news_image_url;
    var NID = req.body.NID;
    Set_News_Image_URL(news_image_url, NID);
    res.send("");
})

app.post('/Admin/News/Set_News_Title', function(req, res) {
    var news_title = req.body.news_title;
    var NID = req.body.NID;
    Set_News_Title(news_title, NID);
    res.send("");
})

app.post('/Admin/News/Set_News_Link', function(req, res) {
    var news_link = req.body.news_link;
    var NID = req.body.NID;
    Set_News_Link(news_link, NID);
    res.send("");
})

app.post('/Admin/News/Set_News_Description', function(req, res) {
    var news_description = req.body.news_description;
    var NID = req.body.NID;
    Set_News_Description(news_description, NID);
    res.send("");
})

app.post('/Admin/News/Delete', function(req, res) {
    var NID = req.body.NID;
    Delete_News(NID);
    res.send("");
})

module.exports = app;