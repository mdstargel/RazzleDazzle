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

setPublicNotes = (notes, appt_key) => {
    con.query("UPDATE Appointment SET Appt_Public_Notes = '" + notes +
        "' WHERE Appt_Key = " + appt_key + ";",
        function(err) {
            if (err) throw err;
        });
}

setPrivateNotes = (notes, appt_key) => {
    con.query("UPDATE Appointment SET Appt_Private_Notes = '" + notes +
        "' WHERE Appt_Key = " + appt_key + ";",
        function(err) {
            if (err) throw err;
        });
}

con.end();