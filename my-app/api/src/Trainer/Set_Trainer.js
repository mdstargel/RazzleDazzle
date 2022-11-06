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

/**
 * Setters for Trainer class
 */
setName = (name, trainer_id) => {
    con.query("UPDATE Trainer SET Train_Name = '" + name +
        "' WHERE TID = " + trainer_id + ";",
        function(err) {
            if (err) throw err;
        });
}

setAddress = (address, trainer_id) => {
    con.query("UPDATE Trainer SET Train_Address = '" + address +
        "' WHERE TID = " + trainer_id + ";",
        function(err) {
            if (err) throw err;
        });
}

setPhone = (phone, trainer_id) => {
    con.query("UPDATE Trainer SET Train_Phone_Number = '" + phone +
        "' WHERE TID = " + trainer_id + ";",
        function(err) {
            if (err) throw err;
        });
}

setEmail = (email, trainer_id) => {
    con.query("UPDATE Trainer SET Train_Email_Addr = '" + email +
        "' WHERE TID = " + trainer_id + ";",
        function(err) {
            if (err) throw err;
        });
}

setEmerName = (name, trainer_id) => {
    con.query("UPDATE Trainer SET Train_Emer_Name = '" + name +
        "' WHERE TID = " + trainer_id + ";",
        function(err) {
            if (err) throw err;
        });
}

setEmerPhone = (phone, trainer_id) => {
    con.query("UPDATE Trainer SET Train_Emer_Num = '" + phone +
        "' WHERE TID = " + trainer_id + ";",
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