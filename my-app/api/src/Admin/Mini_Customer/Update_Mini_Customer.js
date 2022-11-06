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

var updateName = (customer_id) => {
    var name;
    con.query("SELECT Cust_Name FROM Customer WHERE CID = '" +
        customer_id + "';",
        function(err, result) {
            if (err) throw err;
            name = result[0].Cust_Name;
        });
    return name;
}

var updateAddress = (customer_id) => {
    var addr;
    con.query("SELECT Cust_Address FROM Customer WHERE CID = '" +
        customer_id + "';",
        function(err, result) {
            if (err) throw err;
            addr = result[0].Cust_Address;
        })
    return addr;
}

var updatePhone = (customer_id) => {
    var phone_num;
    con.query("SELECT Cust_Phone_Num FROM Customer WHERE CID = '" +
        customer_id + "';",
        function(err, result) {
            if (err) throw err;
            phone_num = result[0].Cust_Phone_Num;
        })
    return phone_num;
}

var updateEmail = (customer_id) => {
    var email_addr;
    con.query("SELECT Cust_Email_Addr FROM Customer WHERE CID = '" +
        customer_id + "';",
        function(err, result) {
            if (err) throw err;
            email_addr = result[0].Cust_Email_Addr;
        })
    return email_addr;
}

var updateEmerName = (customer_id) => {
    var name;
    con.query("SELECT Cust_Emer_Name FROM Customer WHERE CID = '" +
        customer_id + "';",
        function(err, result) {
            if (err) throw err;
            name = result[0].Cust_Emer_Name;
        })
    return name;
}

var updateEmerPhone = (customer_id) => {
    var phone_num;
    con.query("SELECT Cust_Emer_Num FROM Customer WHERE CID = '" +
        customer_id + "';",
        function(err, result) {
            if (err) throw err;
            phone_num = result[0].Cust_Emer_Num;
        })
    return phone_num;
}

var updateDifficulty = (customer_id) => {
    var difficulty;
    con.query("SELECT Difficulty FROM Customer WHERE CID = '" +
        customer_id + "';",
        function(err, result) {
            if (err) throw err;
            difficulty = result[0].Difficulty;
        })
    return difficulty;
}

var updateNotifications = (customer_id) => {
    var notif;
    con.query("SELECT Phone_Notif FROM Customer WHERE CID = '" +
        customer_id + "';",
        function(err, result) {
            if (err) throw err;
            notif = result[0].Phone_Notif;
        })
    return notif;
}

con.end()