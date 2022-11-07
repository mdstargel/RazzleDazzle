const express = require('express');
const app = express();
app.listen('16600');
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
let { customer_appt } = require("./Customer/Appointments/Class_Customer_Appointment");
let { trainer_appt } = require("./Trainer/Appointments/Class_Trainer_Appointment");
let { mini_customer } = require("./Admin/Mini_Customer/Class_Mini_Customer");
let { mini_trainer } = require("./Admin/Mini_Trainer/Class_Mini_Trainer");
let { admin_appt } = require("./Admin/Appointment/Class_Admin_Appointment");
let { admin_news } = require("./Admin/News/Class_Admin_News");

app.get('/login', (req, res) => {
    var ID;
    var type;

    con.query("SELECT * FROM Login WHERE Email = '" + req.body.email + "' " +
        "AND Log_Password = '" + req.body.passwrd + "';",
        function(err, result) {
            if (err) throw err;
            if (result[0].CID != null) {
                ID = result[0].CID;
                type = 0;
            } else {
                ID = result[0].TID;
                if (result[0].Admin == 0) type = 1;
                else type = 2;
            }

            user = [{ ID, type }];
            res.json(user);
        })
})

app.get('/login/Customer', (req, res) => {
    var customer_id = req.body.customer_id;
    con.query("SELECT Cust_Name, Cust_Address, Cust_Phone_Num, Cust_Email_Addr, Cust_Emer_Name, " +
        "Cust_Emer_Num, Difficulty, Phone_Notif FROM Customer WHERE CID = " +
        customer_id + ";",
        function(err, result) {
            if (err) throw err;
            var cust_name = result[0].Cust_Name;
            var address = result[0].Cust_Address;
            var phone = result[0].Cust_Phone_Num;
            var email = result[0].Cust_Email_Addr;
            var emer_name = result[0].Cust_Emer_Name;
            var emer_num = result[0].Cust_Emer_Num;
            var difficulty = result[0].Difficulty;
            var phone_notif = result[0].Phone_Notif;
            user = [{
                customer_id,
                cust_name,
                address,
                phone,
                email,
                emer_name,
                emer_num,
                difficulty,
                phone_notif
            }];
            res.json(user);
        })
})

app.get('/login/Customer/Calendar', (req, res) => {
    var calendar = [];
    var customer_id = req.body.customer_id;
    con.query("SELECT Appt_Key, Appt_Name, Appt_Date, Appt_Time, Appt_Description, Appt_Public_Notes, " +
        "Appt_Size FROM Appointment " +
        "INNER JOIN Customer_Group ON Appointment.Appt_GID = Customer_Group.GID " +
        "WHERE Customer_Group.CID_1 = " + customer_id + " " +
        "OR Customer_Group.CID_2 = " + customer_id + " " +
        "OR Customer_Group.CID_3 = " + customer_id + " " +
        "OR Customer_Group.CID_4 = " + customer_id + ";",
        function(err, result) {
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                calendar.push(new customer_appt(result[i].Appt_Key, result[i].Appt_Name,
                    result[i].Appt_Date, result[i].Appt_Time, result[i].Appt_Description,
                    result[i].Appt_Public_Notes, result[i].Appt_Size, true));
            };
        });

    // Current Date String
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var curr_date = yyyy + '-' + mm + '-' + dd;

    // Add on appointments available for reservation
    con.query("SELECT Appt_Key, Appt_Name, Appt_Date, Appt_Time, Appt_Description, Appt_Public_Notes, " +
        "Appt_Size FROM Appointment " +
        "INNER JOIN Customer_Group ON Appointment.Appt_GID = Customer_Group.GID " +
        "WHERE Customer_Group.CID_1 != " + customer_id + " " +
        "AND Customer_Group.CID_2 != " + customer_id + " " +
        "AND Customer_Group.CID_3 != " + customer_id + " " +
        "AND Customer_Group.CID_4 != " + customer_id + " " +
        "AND Appt_Size > 0 " +
        "AND Appt_Date > '" + curr_date + "';",
        function(err, result) {
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                calendar.push(new customer_appt(result[i].Appt_Key, result[i].Appt_Name,
                    result[i].Appt_Date, result[i].Appt_Time, result[i].Appt_Description,
                    result[i].Appt_Public_Notes, result[i].Appt_Size, false));
            };
            res.json(calendar);
        });
})

app.get('/login/Trainer', (req, res) => {
    var trainer_id = req.body.trainer_id;
    con.query("SELECT Train_Name, Train_Address, Train_Phone_Num, Train_Email_Addr, Train_Emer_Name, " +
        "Train_Emer_Num FROM Trainer WHERE TID = " + trainer_id,
        function(err, result) {
            if (err) throw err;
            var trainer_name = result[0].Train_Name;
            var address = result[0].Train_Address;
            var phone = result[0].Train_Phone_Num;
            var email = result[0].Train_Email_Addr;
            var emer_name = result[0].Train_Emer_Name;
            var emer_num = result[0].Train_Emer_Num;
            user = [{
                trainer_id,
                trainer_name,
                address,
                phone,
                email,
                emer_name,
                emer_num
            }];
            res.json(user);
        });
})

app.get('/login/Trainer/Calendar', (req, res) => {
    var assigned_calendar = [];
    var trainer_id = req.body.trainer_id;
    con.query("SELECT Appt_Key, Appt_Name, Appt_Date, Appt_Time, Appt_Difficulty, Appt_Description, " +
        "Appt_Public_Notes, Appt_Private_Notes, Appt_Size FROM Appointment " +
        "WHERE Appt_TID_1 = " + trainer_id + " " +
        "OR Appt_TID_2 = " + trainer_id + ";",
        function(err, result) {
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                assigned_calendar.push(new trainer_appt(result[i].Appt_Key,
                    result[i].Appt_Name, result[i].Appt_Date, result[i].Appt_Time,
                    result[i].Appt_Description, result[i].Appt_Public_Notes,
                    result[i].Appt_Private_Notes));
            };
            res.json(assigned_calendar);
        });
})

app.get('/login/Admin', (req, res) => {
    var admin_id = req.body.admin_id;
    con.query("SELECT Train_Name, Train_Address, Train_Phone_Num, Train_Email_Addr, Train_Emer_Name, " +
        "Train_Emer_Num FROM Trainer WHERE TID = " + admin_id + ";",
        function(err, result) {
            if (err) throw err;
            var admin_name = result[0].Train_Name;
            var address = result[0].Train_Address;
            var phone = result[0].Train_Phone_Num;
            var email = result[0].Train_Email_Addr;
            var emer_name = result[0].Train_Emer_Name;
            var emer_num = result[0].Train_Emer_Num;
            user = [{
                admin_id,
                admin_name,
                address,
                phone,
                email,
                emer_name,
                emer_num
            }];
            res.json(user);
        });
})

app.get('/login/Admin/Customers', (req, res) => {
    var customers = [];
    con.query("SELECT * FROM Customer;",
        function(err, result) {
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                customers.push(new mini_customer(result[i].CID, result[i].Cust_Name,
                    result[i].Cust_Address, result[i].Cust_Phone_Num,
                    result[i].Cust_Email_Addr, result[i].Cust_Emer_Name,
                    result[i].Cust_Emer_Num, result[i].Difficulty,
                    result[i].Phone_Notif));
            };
            res.json(customers);
        });
})

app.get('/login/Admin/Trainers', (req, res) => {
    var trainers = [];
    con.query("SELECT TID, Train_Name, Train_Address, Train_Phone_Num, Train_Email_Addr, " +
        "Train_Emer_Name, Train_Emer_Num FROM Trainer;",
        function(err, result) {
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                trainers.push(new mini_trainer(result[i].TID, result[i].Train_Name,
                    result[i].Train_Address, result[i].Train_Phone_Num,
                    result[i].Train_Email_Addr, result[i].Train_Emer_Name,
                    result[i].Train_Emer_Num));
            };
            res.json(trainers);
        });
})

app.get('/login/Admin/Calendar', (req, res) => {
    // Get Micro-Trainer List
    var micro_trainers = [];
    con.query("SELECT TID, Train_Name FROM Trainer;",
        function(err, result) {
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                micro_trainers.push(new micro_trainer(result[i].TID, result[i].Train_Name));
            }
        })

    // Get All Appointments
    var calendar = [];
    con.query("SELECT * FROM Appointment;", function(err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            calendar.push(new admin_appt(result[i].Appt_Key, result[i].Appt_Name,
                result[i].Appt_Date, result[i].Appt_Time, result[i].Appt_Difficulty,
                result[i].Appt_Description, result[i].Appt_Public_Notes,
                result[i].Appt_Private_Notes, result[i].Appt_Size, result[i].Appt_TID_1,
                result[i].Appt_TID_2, result[i].Appt_GID, micro_trainers));
        };
        res.json(calendar);
    });
})

app.get('/login/Admin/News', (req, res) => {
    var admin_news_array = [];
    con.query("SELECT * FROM News;", function(err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            admin_news_array.push(new admin_news(result[i].Key, result[i].IMG_Name,
                result[i].Title, result[i].Link, result[i].News_Description));
        }
        res.json(admin_news_array);
    })
})

module.exports = app;