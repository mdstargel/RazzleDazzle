const express = require('express');
const app = express();
app.use(express.json());

let con = require('../mysql.js');

create_trainer = (trainer_name, email) => {
    // Get TID
    var TID;
    con.query("SELECT TID FROM Trainer WHERE Train_Name = " +
        trainer_name + ";",
        function(err, result) {
            if (err) throw err;
            TID = result[0].TID;
        })

    // Update Login
    con.query("INSERT INTO Login (Email, Log_Password, TID) VALUES ('" +
        email + "', 'P@ssw0rd', " + TID + ");",
        function(err) {
            if (err) throw err;
        })
}

app.put('/Admin/Create_Trainer', (req, res) => {
    var address = req.body.address;
    var emerName = req.body.emerName;
    var emerPhone = req.body.emerPhone;
    var trainer_name = req.body.user_name;
    var phone = req.body.phone;
    var email = req.body.email;

    // If any values are empty set null;
    if (address == "") address = null;
    if (emerName == "") emerName = null;
    if (emerPhone == "") emerPhone = null;

    // Insert into Trainer table
    con.query("INSERT INTO Trainer (Train_Name, Train_Address, " +
        "Train_Phone_Num, Train_Email_Addr, Train_Emer_Name, Train_Emer_Num) " +
        "VALUES ('" + trainer_name + "', '" + address + "', '" + phone + "', " +
        email + "', '" + emerName + "', '" + emerPhone + "');",
        function(err) {
            if (err) throw err;
            create_trainer(trainer_name, email);
        })
})

module.exports = app;