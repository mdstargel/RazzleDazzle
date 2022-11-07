const express = require('express');
const app = express();
app.listen('16500');

// Variables for connection
var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "108.213.201.29",
    user: "root",
    password: "RazzleDazzle1!",
    database: "Horse_Site",
    insecureAuth: true,
    connectTimeout: 30000
});

app.put('/createAccount', (req, res) => {
    var cust_name = req.body.cust_name;
    var cust_address = req.body.cust_address;
    var cust_phone_num = req.body.cust_phone_num;
    var cust_email_addr = req.body.cust_email_addr;
    var cust_password = req.body.cust_password;
    if (cust_address == "") cust_address = null;
    if (cust_phone_num == "") cust_phone_num = null;
    con.query("INSERT INTO Customer (Cust_Name, Cust_Address, Cust_Phone_Num, " +
        "Cust_Email_Addr) VALUES ('" + cust_name + "', '" + cust_address + "', '" +
        cust_phone_num + "', '" + cust_email_addr + "');",
        function(err) {
            if (err) throw err;
        });

    // Get CID
    var cid;
    con.query("SELECT CID FROM Customer WHERE Cust_Email_Addr = '" + cust_email_addr +
        "';",
        function(err, result) {
            if (err) throw err;
            cid = result[0].CID;
        })

    con.query("INSERT INTO Login (Email, Log_Password, CID) VALUES ('" +
        cust_email_addr + "', '" + cust_password + "', '" + cid + "');",
        function(err) {
            if (err) throw err;
        })
})

module.exports = create_Customer;