const express = require('express');
const app = express();
app.use(express.json());

const con = require('../../mysql.js');

app.get('/Admin/Customer/Update_Name', (req, res) => {
    var name;
    var customer_id = req.body.user_id;
    con.query("SELECT Cust_Name FROM Customer WHERE CID = '" +
        customer_id + "';",
        function(err, result) {
            if (err) throw err;
            name = result[0].Cust_Name;
            res.send(name);
        });
})

app.get('/Admin/Customer/Update_Address', (req, res) => {
    var addr;
    var customer_id = req.body.user_id;
    con.query("SELECT Cust_Address FROM Customer WHERE CID = '" +
        customer_id + "';",
        function(err, result) {
            if (err) throw err;
            addr = result[0].Cust_Address;
            res.send(addr);
        })
})

app.get('/Admin/Customer/Update_Phone', (req, res) => {
    var phone_num;
    var customer_id = req.body.user_id;
    con.query("SELECT Cust_Phone_Num FROM Customer WHERE CID = '" +
        customer_id + "';",
        function(err, result) {
            if (err) throw err;
            phone_num = result[0].Cust_Phone_Num;
            res.send(phone_num);
        })
})

app.get('/Admin/Customer/Update_Email', (req, res) => {
    var email_addr;
    var customer_id = req.body.user_id;
    con.query("SELECT Cust_Email_Addr FROM Customer WHERE CID = '" +
        customer_id + "';",
        function(err, result) {
            if (err) throw err;
            email_addr = result[0].Cust_Email_Addr;
            res.send(email_addr);
        })
})

app.get('/Admin/Customer/Update_EmerName', (req, res) => {
    var name;
    var customer_id = req.body.user_id;
    con.query("SELECT Cust_Emer_Name FROM Customer WHERE CID = '" +
        customer_id + "';",
        function(err, result) {
            if (err) throw err;
            name = result[0].Cust_Emer_Name;
            res.send(name);
        })
})

app.get('/Admin/Customer/Update_EmerPhone', (req, res) => {
    var phone_num;
    var customer_id = req.body.user_id;
    con.query("SELECT Cust_Emer_Num FROM Customer WHERE CID = '" +
        customer_id + "';",
        function(err, result) {
            if (err) throw err;
            phone_num = result[0].Cust_Emer_Num;
            res.send(phone_num);
        })
})

app.get('/Admin/Customer/Update_Difficulty', (req, res) => {
    var difficulty;
    var customer_id = req.body.user_id;
    con.query("SELECT Difficulty FROM Customer WHERE CID = '" +
        customer_id + "';",
        function(err, result) {
            if (err) throw err;
            difficulty = result[0].Difficulty;
            res.send(difficulty);
        })
})

app.get('/Admin/Customer/Update_Notifications', (req, res) => {
    var notif;
    var customer_id = req.body.user_id;
    con.query("SELECT Phone_Notif FROM Customer WHERE CID = '" +
        customer_id + "';",
        function(err, result) {
            if (err) throw err;
            notif = result[0].Phone_Notif;
            res.send(notif);
        })
})

module.exports = app;