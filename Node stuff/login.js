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

con.connect(function(err) {
    if (err) throw err;
})

let admin_user = require('./Admin');
let admin = admin_user.admin;

let trainer_user = require('./Trainer');
let trainer = trainer_user.trainer;

let cust_user = require('./Customer');
let customer = cust_user.customer;

// TODO: Change login? We need a way to return that the user is cust, trainer, or admin
// Add getType to classes? Call user.getType() after generation to get type then load?

login = (email, passwrd) => {
    var CID = null;
    var TID = null;
    var administrator;
    var user;
    con.query("SELECT * FROM Login WHERE Email = '" + email + "' " +
        "AND Log_Password = '" + passwrd + "';",
        function(err, result) {
            if (err) throw err;

            // If login values match
            if (result != NULL) {
                // If Customer
                if (result[0].CID = !NULL) {
                    CID = result[0].CID;
                }

                // If Trainer
                else if (result[0].TID != NULL) {
                    TID = result[0].TID;
                };
            };
        });
    if (CID != null) {
        user = new customer(CID);
    } else {
        con.query("SELECT Admin FROM Trainer WHERE TID = " + TID + ";",
            function(err, result) {
                if (err) throw err;
                administrator = result[0].Admin;
            });
        if (administrator) user = new admin(TID);
        else user = new trainer(TID);
    }

    return user;
}
con.end();

module.exports = {
    login: login
}