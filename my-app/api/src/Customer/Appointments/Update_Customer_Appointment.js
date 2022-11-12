const express = require('express');
const app = express();
app.use(express.json());

let con = require('../../mysql.js');

var getApptName = (appt_key) => {
    var appt_name;
    con.query("SELECT Appt_Name FROM Appointment WHERE Appt_Key = '" +
        appt_key + "';",
        function(err, result) {
            if (err) throw err;
            appt_name = result[0].Appt_Name;
        })
    return appt_name;
}

app.get('/Customer/Calendar/Update_Name', (req, res) => {
    var name;
    var appt_key = req.body.appt_key;
    name = getApptName(appt_key);
    // con.query("SELECT Appt_Name FROM Appointment WHERE Appt_Key = '" +
    //     appt_key + "';",
    //     function(err, result) {
    //         if (err) throw err;
    //         name = result[0].Appt_Name;
    //         res.send(name);
    //     })
})

app.get('/Customer/Calendar/Update_Date', (req, res) => {
    var date;
    var appt_key = req.body.appt_key;
    con.query("SELECT Appt_Date FROM Appointment WHERE Appt_Key = " +
        appt_key + ";",
        function(err, result) {
            if (err) throw err;
            date = result[0].Appt_Date + "";
            res.send(date);
        })
})

app.get('/Customer/Calendar/Update_Start_Time', (req, res) => {
    var time;
    var appt_key = req.body.appt_key;
    con.query("SELECT Appt_Time FROM Appointment WHERE Appt_Key = " +
        appt_key + ";",
        function(err, result) {
            if (err) throw err;
            time = result[0].Appt_Time + "";
            res.send(time);
        })
})

app.get('/Customer/Calendar/Update_End_Time', (req, res) => {
    var time;
    var appt_key = req.body.appt_key;
    con.query("SELECT Appt_End_Time FROM Appointment WHERE Appt_Key = " +
        appt_key + ";",
        function(err, result) {
            if (err) throw err;
            time = result[0].Appt_End_Time + "";
            res.send(time);
        })
})

app.get('/Customer/Calendar/Update_Type', (req, res) => {
    var type;
    var appt_key = req.body.appt_key;
    con.query("SELECT Appt_Type FROM Appointment WHERE Appt_Key = " +
        appt_key + ";",
        function(err, result) {
            if (err) throw err;
            type = result[0].Appt_Type;
            res.send(type);
        })
})

app.get('/Customer/Calendar/Update_Description', (req, res) => {
    var description;
    var appt_key = req.body.appt_key;
    con.query("SELECT Appt_Description FROM Appointment WHERE Appt_Key = '" +
        appt_key + "';",
        function(err, result) {
            if (err) throw err;
            description = result[0].Appt_Description;
            res.send(description);
        })
})

app.get('/Customer/Calendar/Update_Public_Notes', (req, res) => {
    var pub_notes;
    var appt_key = req.body.appt_key;
    con.query("SELECT Appt_Public_Notes FROM Appointment WHERE Appt_Key = '" +
        appt_key + "';",
        function(err, result) {
            if (err) throw err;
            pub_notes = result[0].Appt_Public_Notes;
            res.send(pub_notes);
        })
})

app.get('/Customer/Calendar/Update_Group_Size', (req, res) => {
    var group;
    var appt_key = req.body.appt_key;
    con.query("SELECT Appt_Size FROM Appointment WHERE Appt_Key = '" +
        appt_key + "';",
        function(err, result) {
            if (err) throw err;
            group = result[0].Appt_Size;
            res.send(group);
        })
})

app.get('/Customer/Calendar/Update_Reserved', (req, res) => {
    var reserved;
    var appt_key = req.body.appt_key;
    con.query("SELECT CID_1, CID_2, CID_3, CID_4 FROM Customer_Group INNER " +
        "JOIN Appointment ON GID = Appointment.Appt_GID WHERE Appt_Key = '" +
        appt_key + "';",
        function(err, result) {
            if (err) throw err;
            if (result[0].CID_1 == this.cust_id ||
                result[0].CID_2 == this.cust_id ||
                result[0].CID_3 == this.cust_id ||
                result[0].CID_4 == this.cust_id) {
                reserved = true;
            } else reserved = false;
            res.send(reserved);
        })
})

module.exports = app;