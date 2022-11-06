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
});

var updateName = (trainer_id) => {
    var name;
    con.query("SELECT Train_Name FROM Trainer WHERE TID = '" +
        trainer_id + "';",
        function(err, result) {
            if (err) throw err;
            name = result[0].Train_Name;
        })
    return name;
}

var updateAddress = (trainer_id) => {
    var address;
    con.query("SELECT Train_Address FROM Trainer WHERE TID = '" +
        trainer_id + "';",
        function(err, result) {
            if (err) throw err;
            address = result[0].Train_Address;
        })
    return address;
}

var updatePhone = (trainer_id) => {
    var phone;
    con.query("SELECT Train_Phone_Num FROM Trainer WHERE TID = '" +
        trainer_id + "';",
        function(err, result) {
            if (err) throw err;
            phone = result[0].Train_Phone_Num;
        })
    return phone;
}

var updateEmail = (trainer_id) => {
    var email;
    con.query("SELECT Train_Email_Addr FROM Trainer WHERE TID = '" +
        trainer_id + "';",
        function(err, result) {
            if (err) throw err;
            email = result[0].Train_Email_Addr;
        })
    return email;
}

var updateEmerName = (trainer_id) => {
    var emerName;
    con.query("SELECT Train_Emer_Name FROM Trainer WHERE TID = '" +
        trainer_id + "';",
        function(err, result) {
            if (err) throw err;
            emerName = result[0].Train_Emer_Name;
        })
    return emerName;
}

var updateEmerPhone = (trainer_id) => {
    var emerPhone;
    con.query("SELECT Train_Emer_Num FROM Trainer WHERE TID = '" +
        trainer_id + "';",
        function(err, result) {
            if (err) throw err;
            emerPhone = result[0].Train_Emer_Num;
        })
    return emerPhone;
}

var updateAdmin = (trainer_id) => {
    var admin;
    con.query("SELECT Admin FROM Trainer WHERE TID = '" +
        trainer_id + "';",
        function(err, result) {
            if (err) throw err;
            admin = result[0].Admin;
        })
    return admin;
}

con.end();