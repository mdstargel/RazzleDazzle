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
 * Updaters for Trainer Appointment class
 */
var updateName = (appt_key) => {
    var name;
    con.query("SELECT Appt_Name FROM Appointment WHERE Appt_Key = '" +
        appt_key + "';",
        function(err, result) {
            if (err) throw err;
            name = result[0].Appt_Name;
        })
    return name;
}

var updateDate = (appt_key) => {
    var date;
    con.query("SELECT Appt_Date FROM Appointment WHERE Appt_Key = '" +
        appt_key + "';",
        function(err, result) {
            if (err) throw err;
            date = result[0].Appt_Date;
        })
    return date;
}

var updateTime = (appt_key) => {
    var time;
    con.query("SELECT Appt_Time FROM Appointment WHERE Appt_Key = '" +
        appt_key + "';",
        function(err, result) {
            if (err) throw err;
            time = result[0].Appt_Time;
        })
    return time;
}

var updateDescription = (appt_key) => {
    var description;
    con.query("SELECT Appt_Description FROM Appointment WHERE Appt_Key = '" +
        appt_key + "';",
        function(err, result) {
            if (err) throw err;
            description = result[0].Appt_Description;
        })
    return description;
}

var updatePublicNotes = (appt_key) => {
    var publicNotes;
    con.query("SELECT Appt_Public_Notes FROM Appointment WHERE Appt_Key = '" +
        appt_key + "';",
        function(err, result) {
            if (err) throw err;
            publicNotes = result[0].Appt_Public_Notes;
        })
    return publicNotes;
}

var updatePrivateNotes = (appt_key) => {
    var privateNotes;
    con.query("SELECT Appt_Private_Notes FROM Appointment WHERE Appt_Key = '" +
        appt_key + "';",
        function(err, result) {
            if (err) throw err;
            privateNotes = result[0].Appt_Private_Notes;
        })
    return privateNotes;
}

con.end();