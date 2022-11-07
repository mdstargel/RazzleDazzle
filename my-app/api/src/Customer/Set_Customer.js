const express = require('express');
const app = express();
app.listen('16101');
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

app.put('/setName', (req, res) => {
    con.query("UPDATE Customer SET Cust_Name = '" + req.body.name +
        "' WHERE CID = " + req.body.customer_id + ";",
        function(err) {
            if (err) throw err;
        });
})

app.put('/setAddress', (req, res) => {
    con.query("UPDATE Customer SET Cust_Address = '" + req.body.addr +
        "' WHERE CID = " + req.body.customer_id + ";",
        function(err) {
            if (err) throw err;
        });
})

app.put('/setPhone', (req, res) => {
    con.query("UPDATE Customer SET Cust_Phone_Number = '" + req.body.phone_num +
        "' WHERE CID = " + req.body.customer_id + ";",
        function(err) {
            if (err) throw err;
        });
})

app.put('/setEmail', (req, res) => {
    con.query("UPDATE Customer SET Cust_Email_Addr = '" + req.body.email_addr +
        "' WHERE CID = " + req.body.customer_id + ";",
        function(err) {
            if (err) throw err;
        });

    con.query("UPDATE Login SET Email = '" + req.body.email_addr + "' WHERE Email = '" +
        email + "';",
        function(err) {
            if (err) throw err;
        })
})

app.put('/setEmerName', (req, res) => {
    con.query("UPDATE Customer SET Cust_Emer_Name = '" + req.body.name +
        "' WHERE CID = " + req.body.customer_id + ";",
        function(err) {
            if (err) throw err;
        });
})

app.put('/setEmerName', (req, res) => {
    con.query("UPDATE Customer SET Cust_Emer_Num = '" + req.body.phone_num +
        "' WHERE CID = " + req.body.customer_id + ";",
        function(err) {
            if (err) throw err;
        });
})

app.put('/setNotifications', (req, res) => {
    con.query("UPDATE Customer SET Phone_Notif = '" + req.body.notif +
        "' WHERE CID = " + req.body.customer_id + ";",
        function(err) {
            if (err) throw err;
        });
})

app.put('/setPassword', (req, res) => {
    var db_old_pw;
    con.query("SELECT Log_Password FROM Login WHERE Email = '" + req.body.email +
        "';",
        function(err, result) {
            if (err) throw err;
            db_old_pw = result[0].Log_Password;
        })

    if (db_old_pw == req.body.old_pw) {
        con.query("UPDATE Login SET Log_Password = '" + req.body.new_pw + "' WHERE Email = '" +
            req.body.email + "';",
            function(err) {
                if (err) throw err;
            })
    }
})

module.exports = app;