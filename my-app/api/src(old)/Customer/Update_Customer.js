const express = require('express');
const app = express();
app.use(express.json());

let con = require('../mysql.js');

/**
 * Imports
 */
let { customer_appt } = require("./Appointments/Class_Customer_Appointment");

/**
 * Updaters for Customer class
 */
app.get('/Customer/Update_Name', (req, res) => {
    var user_name;
    var customer_id = req.body.user_id;
    con.query("SELECT Cust_Name FROM Customer WHERE CID = '" +
        customer_id + "';",
        function(err, result) {
            if (err) throw err;
            user_name = result[0].Cust_Name;
            res.send(user_name);
        })
});

app.get('/Customer/Update_Address', (req, res) => {
    var address;
    var customer_id = req.body.user_id;
    con.query("SELECT Cust_Address FROM Customer WHERE CID = '" +
        customer_id + "';",
        function(err, result) {
            if (err) throw err;
            address = result[0].Cust_Address;
            res.send(address);
        })
})

app.get('/Customer/Update_Phone', (req, res) => {
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

app.get('/Customer/Update_Email', (req, res) => {
    var email;
    var customer_id = req.body.user_id;
    con.query("SELECT Cust_Email_Addr FROM Customer WHERE CID = '" +
        customer_id + "';",
        function(err, result) {
            if (err) throw err;
            email = result[0].Cust_Email_Addr;
            res.send(email);
        })
})

app.get('/Customer/Update_EmerName', (req, res) => {
    var emer_name;
    var customer_id = req.body.user_id;
    con.query("SELECT Cust_Emer_Name FROM Customer WHERE CID = '" +
        customer_id + "';",
        function(err, result) {
            if (err) throw err;
            emer_name = result[0].Cust_Emer_Name;
            res.send(emer_name);
        })
})

app.get('/Customer/Update_EmerPhone', (req, res) => {
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

app.get('/Customer/Update_Notifications', (req, res) => {
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

app.get('/Customer/Update_Calendar', (req, res) => {
    var calendar = [];
    var customer_id = req.body.user_id;
    con.query("SELECT Appt_Key, Appt_Name, Appt_Date, Appt_Time, Appt_End_Time, Appt_Type, Appt_Description, Appt_Public_Notes, " +
        "Appt_Size FROM Appointment " +
        "INNER JOIN Customer_Group ON Appointment.Appt_GID = Customer_Group.GID " +
        "WHERE Customer_Group.CID_1 = " + customer_id + " " +
        "OR Customer_Group.CID_2 = " + customer_id + " " +
        "OR Customer_Group.CID_3 = " + customer_id + " " +
        "OR Customer_Group.CID_4 = " + customer_id + ";",
        function(err, result) {
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                calendar.push(new customer_appt(req.body.customer_id, result[i].Appt_Key, result[i].Appt_Name,
                    result[i].Appt_Date, result[i].Appt_Time, result[i].Appt_End_Time, result[i].Appt_Type, result[i].Appt_Description,
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
    con.query("SELECT Appt_Key, Appt_Name, Appt_Date, Appt_Time, Appt_End_Time, Appt_Type, Appt_Description, Appt_Public_Notes, " +
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
                calendar.push(new customer_appt(body, result[i].Appt_Key, result[i].Appt_Name,
                    result[i].Appt_Date, result[i].Appt_Time, result[i].Appt_End_Time, result[i].Appt_Type, result[i].Appt_Description,
                    result[i].Appt_Public_Notes, result[i].Appt_Size, false));
            };
            res.json(calendar);
        })
})

module.exports = app;