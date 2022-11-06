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

con.connect(function(err) {
    if (err) throw err;
})

/**
 * Imports
 */
const { setReserved } = require("./Set_Customer_Appointment");

/** 
 * Setters for Customer class
 */
setName = (name, customer_id) => {
    con.query("UPDATE Customer SET Cust_Name = '" + name +
        "' WHERE CID = " + customer_id + ";",
        function(err) {
            if (err) throw err;
        });
}

setAddress = (addr, customer_id) => {
    con.query("UPDATE Customer SET Cust_Address = '" + addr +
        "' WHERE CID = " + customer_id + ";",
        function(err) {
            if (err) throw err;
        });
}

setPhone = (phone_num, customer_id) => {
    con.query("UPDATE Customer SET Cust_Phone_Number = '" + phone_num +
        "' WHERE CID = " + customer_id + ";",
        function(err) {
            if (err) throw err;
        });
}

setEmail = (email_addr, customer_id, email) => {
    con.query("UPDATE Customer SET Cust_Email_Addr = '" + email_addr +
        "' WHERE CID = " + customer_id + ";",
        function(err) {
            if (err) throw err;
        });

    con.query("UPDATE Login SET Email = '" + email_addr + "' WHERE Email = '" +
        email + "';",
        function(err) {
            if (err) throw err;
        })
}

setEmerName = (name, customer_id) => {
    con.query("UPDATE Customer SET Cust_Emer_Name = '" + name +
        "' WHERE CID = " + customer_id + ";",
        function(err) {
            if (err) throw err;
        });
}

setEmerNum = (phone_num, customer_id) => {
    con.query("UPDATE Customer SET Cust_Emer_Num = '" + phone_num +
        "' WHERE CID = " + customer_id + ";",
        function(err) {
            if (err) throw err;
        });
}

setNotifications = (notif, customer_id) => {
    con.query("UPDATE Customer SET Phone_Notif = '" + notif +
        "' WHERE CID = " + customer_id + ";",
        function(err) {
            if (err) throw err;
        });
}

setPassword = (old_pw, new_pw, email) => {
    var db_old_pw;
    con.query("SELECT Log_Password FROM Login WHERE Email = '" + email +
        "';",
        function(err, result) {
            if (err) throw err;
            db_old_pw = result[0].Log_Password;
        })

    if (db_old_pw == old_pw) {
        con.query("UPDATE Login SET Log_Password = '" + new_pw + "' WHERE Email = '" +
            email + "';",
            function(err) {
                if (err) throw err;
            })
    }
}

con.end();