const express = require('express');
const app = express();
app.use(express.json());

const con = require('../../mysql.js');

app.get('/Admin/Trainer/Update_Name', (req, res) => {
    var name;
    var trainer_id = req.body.user_id;
    con.query("SELECT Train_Name FROM Trainer WHERE TID = '" +
        trainer_id + "';",
        function(err, result) {
            if (err) throw err;
            name = result[0].Train_Name;
            res.send(name);
        })
})

app.get('/Admin/Trainer/Update_Address', (req, res) => {
    var address;
    var trainer_id = req.body.user_id;
    con.query("SELECT Train_Address FROM Trainer WHERE TID = '" +
        trainer_id + "';",
        function(err, result) {
            if (err) throw err;
            address = result[0].Train_Address;
            res.send(address);
        })
})

app.get('/Admin/Trainer/Update_Phone', (req, res) => {
    var phone;
    var trainer_id = req.body.user_id;
    con.query("SELECT Train_Phone_Num FROM Trainer WHERE TID = '" +
        trainer_id + "';",
        function(err, result) {
            if (err) throw err;
            phone = result[0].Train_Phone_Num;
            res.send(phone);
        })
})

app.get('/Admin/Trainer/Update_Email', (req, res) => {
    var email;
    var trainer_id = req.body.user_id;
    con.query("SELECT Train_Email_Addr FROM Trainer WHERE TID = '" +
        trainer_id + "';",
        function(err, result) {
            if (err) throw err;
            email = result[0].Train_Email_Addr;
            res.send(email);
        })
})

app.get('/Admin/Trainer/Update_EmerName', (req, res) => {
    var emerName;
    var trainer_id = req.body.user_id;
    con.query("SELECT Train_Emer_Name FROM Trainer WHERE TID = '" +
        trainer_id + "';",
        function(err, result) {
            if (err) throw err;
            emerName = result[0].Train_Emer_Name;
            res.send(emerName);
        })
})

app.get('/Admin/Trainer/Update_EmerPhone', (req, res) => {
    var emerPhone;
    var trainer_id = req.body.user_id;
    con.query("SELECT Train_Emer_Num FROM Trainer WHERE TID = '" +
        trainer_id + "';",
        function(err, result) {
            if (err) throw err;
            emerPhone = result[0].Train_Emer_Num;
            res.send(emerPhone);
        })
})

app.get('/Admin/Trainer/Update_Admin', (req, res) => {
    var admin;
    var trainer_id = req.body.user_id;
    con.query("SELECT Admin FROM Login WHERE TID = '" +
        trainer_id + "';",
        function(err, result) {
            if (err) throw err;
            admin = result[0].Admin;
            res.send(admin);
        })
})

module.exports = app;