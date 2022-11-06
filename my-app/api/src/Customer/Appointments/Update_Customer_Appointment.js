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
 * Updaters for customer appointment
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
    con.query("SELECT Appt_Date FROM Appointment WHERE Appt_Key = " +
        appt_key + ";",
        function(err, result) {
            if (err) throw err;
            date = result[0].Appt_Date;
        })
    return date;
}

var updateTime = (appt_key) => {
    var time;
    con.query("SELECT Appt_Time FROM Appointment WHERE Appt_Key = " +
        this.appt_key + ";",
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
    var pub_notes;
    con.query("SELECT Appt_Public_Notes FROM Appointment WHERE Appt_Key = '" +
        appt_key + "';",
        function(err, result) {
            if (err) throw err;
            pub_notes = result[0].Appt_Public_Notes;
        })
    return pub_notes;
}

var updateGroupSize = (appt_key) => {
    var group;
    con.query("SELECT Appt_Size FROM Appointment WHERE Appt_Key = '" +
        appt_key + "';",
        function(err, result) {
            if (err) throw err;
            group = result[0].Appt_Size;
        })
    return group;
}

var updateReserved = (appt_key) => {
    var reserved;
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
        })
    return reserved;
}

con.end();