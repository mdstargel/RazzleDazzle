const express = require('express');
const app = express();
app.use(express.json());

let con = require('../mysql.js');

/**
 * Imports
 */
let { admin_appt } = require("./Appointment/Class_Admin_Appointment");
let { mini_customer } = require("./Mini_Customer/Class_Mini_Customer");
let { mini_trainer } = require("./Mini_Trainer/Class_Mini_Trainer");
let { micro_trainer } = require(
    "./Appointment/Micro_Trainer/Class_Micro_Trainer");
let { admin_news } = require("./News/Class_Admin_News");

app.get('/Admin/Update_Name', (req, res) => {
    var user_name;
    var admin_id = req.body.user_id;
    con.query("SELECT Train_Name FROM Trainer WHERE TID = '" +
        admin_id + "';",
        function(err, result) {
            if (err) throw err;
            user_name = result[0].Train_Name;
            res.send(user_name);
        })
})

app.get('/Admin/Update_Address', (req, res) => {
    var address;
    var admin_id = req.body.user_id;
    con.query("SELECT Train_Address FROM Trainer WHERE TID = '" +
        admin_id + "';",
        function(err, result) {
            if (err) throw err;
            address = result[0].Train_Address;
            res.send(address);
        })
})

app.get('/Admin/Update_Phone', (req, res) => {
    var phone;
    var admin_id = req.body.user_id;
    con.query("SELECT Train_Phone_Num FROM Trainer WHERE TID = '" +
        admin_id + "';",
        function(err, result) {
            if (err) throw err;
            phone = result[0].Train_Phone_Num;
            res.send(phone);
        })
})

app.get('/Admin/Update_Email', (req, res) => {
    var email;
    var admin_id = req.body.user_id;
    con.query("SELECT Train_Email_Addr FROM Trainer WHERE TID = '" +
        admin_id + "';",
        function(err, result) {
            if (err) throw err;
            email = result[0].Train_Email_Addr;
            res.send(email);
        })
})

app.get('/Admin/Update_EmerName', (req, res) => {
    var emerName;
    var admin_id = req.body.user_id;
    con.query("SELECT Train_Emer_Name FROM Trainer WHERE TID = '" +
        admin_id + "';",
        function(err, result) {
            if (err) throw err;
            emerName = result[0].Train_Emer_Name;
            res.send(emerName);
        })
    return emerName;
})

app.get('/Admin/Update_EmerPhone', (req, res) => {
    var emerPhone;
    var admin_id = req.body.user_id;
    con.query("SELECT Train_Emer_Num FROM Trainer WHERE TID = '" +
        admin_id + "';",
        function(err, result) {
            if (err) throw err;
            emerPhone = result[0].Train_Emer_Num;
            res.send(emerPhone);
        })
})

app.get('/Admin/Update_Customers', (req, res) => {
    var customers = [];
    con.query("SELECT * FROM Customer;",
        function(err, result) {
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                customers.push(new mini_customer(result[i].CID,
                    result[i].Cust_Name, result[i].Cust_Address,
                    result[i].Cust_Phone_Num, result[i].Cust_Email_Addr,
                    result[i].Cust_Emer_Name, result[i].Cust_Emer_Num,
                    result[i].Difficulty, result[i].Phone_Notif));
            };
            res.json(customers);
        });
})

app.get('/Admin/Update_Trainers', (req, res) => {
    var trainers = [];
    con.query("SELECT TID, Train_Name, Train_Address, Train_Phone_Num, " +
        "Train_Email_Addr, Train_Emer_Name, Train_Emer_Num, Admin " +
        "FROM Trainer;",
        function(err, result) {
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                trainers.push(new mini_trainer(result[i].TID,
                    result[i].Train_Name, result[i].Train_Address,
                    result[i].Train_Phone_Num, result[i].Train_Email_Addr,
                    result[i].Train_Emer_Name, result[i].Train_Emer_Num,
                    result[i].Admin));
            }
            res.json(trainers);
        })
})

app.get('/Admin/Update_Calendar', (req, res) => {
    var calendar = [];
    var micro_trainers = [];
    con.query("SELECT TID, Train_Name FROM Trainer;",
        function(err, result) {
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                micro_trainers.push(new micro_trainer(result[i].TID,
                    result[i].Train_Name));
            }
        })
    con.query("SELECT * FROM Appointment;", function(err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            calendar.push(new admin_appt(result[i].Appt_Key,
                result[i].Appt_Name, result[i].Appt_Date, result[i].Appt_Time,
                result[i].Appt_Difficulty, result[i].Appt_Description,
                result[i].Appt_Public_Notes, result[i].Appt_Private_Notes,
                result[i].Appt_Size, result[i].Appt_TID_1, result[i].Appt_TID_2,
                result[i].Appt_GID, micro_trainers));
        }
        res.json(calendar);
    });
})

var NewsTrimmer = (admin_news_array) => {
    while (admin_news_array.length > 5) {
        // Get lowest key
        var news_key;
        con.query("SELECT Key FROM News;", function(err, result) {
            if (err) throw err;
            news_key = result[0].Key;
        })

        // Delete lowest
        con.query("DELETE FROM News WHERE Key = " + news_key + ";",
            function(err) {
                if (err) throw err;
            })

        // Remake news array
        admin_news_array = [];
        con.query("SELECT * FROM News;", function(err, result) {
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                admin_news_array.push(new admin_news(result[i].Key,
                    result[i].IMG_Name, result[i].Title, result[i].Link,
                    result[i].News_Description));
            }
            return admin_news_array;
        })
    }
}

app.get('/Admin/Update_News', (req, res) => {
    var admin_news_array = [];
    con.query("SELECT * FROM News;", function(err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            admin_news_array.push(new admin_news(result[i].Key,
                result[i].IMG_Name, result[i].Title, result[i].Link,
                result[i].News_Description));
        }
        admin_news_array = NewsTrimmer(admin_news_array);
        res.json(admin_news_array);
    })
})

module.exports = app;