const express = require('express');
const app = express();
app.use(express.json());

let con = require('../mysql.js');

app.put('/Admin/Set_Name', (req, res) => {
    var user_name = req.body.user_name;
    var admin_id = req.body.user_id;
    con.query("UPDATE Trainer SET Train_Name = '" + user_name +
        "' WHERE TID = " + admin_id + ";",
        function(err) {
            if (err) throw err;
        });
})

app.put('/Admin/Set_Address', (req, res) => {
    var address = req.body.address;
    var admin_id = req.body.user_id;
    con.query("UPDATE Trainer SET Train_Address = '" + address +
        "' WHERE TID = " + admin_id + ";",
        function(err) {
            if (err) throw err;
        });
})

app.put('/Admin/Set_Phone', (req, res) => {
    var phone = req.body.phone;
    var admin_id = req.body.user_id;
    con.query("UPDATE Trainer SET Train_Phone_Number = '" + phone +
        "' WHERE TID = " + admin_id + ";",
        function(err) {
            if (err) throw err;
        });
})

app.put('/Admin/Set_Email', (req, res) => {
    var email = req.body.email;
    var admin_id = req.body.user_id;
    con.query("UPDATE Trainer SET Train_Email_Addr = '" + email +
        "' WHERE TID = " + admin_id + ";",
        function(err) {
            if (err) throw err;
        });
})

app.put('/Admin/Set_EmerName', (req, res) => {
    var emer_name = req.body.emer_name;
    var admin_id = req.body.user_id;
    con.query("UPDATE Trainer SET Train_Emer_Name = '" + emer_name +
        "' WHERE TID = " + admin_id + ";",
        function(err) {
            if (err) throw err;
        });
})

app.put('/Admin/Set_EmerPhone', (req, res) => {
    var emer_phone = req.body.emer_phone;
    var admin_id = req.body.user_id;
    con.query("UPDATE Trainer SET Train_Emer_Num = '" + emer_phone +
        "' WHERE TID = " + admin_id + ";",
        function(err) {
            if (err) throw err;
        });
})

module.exports = app;