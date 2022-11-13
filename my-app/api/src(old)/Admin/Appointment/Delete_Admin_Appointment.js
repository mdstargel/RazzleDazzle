const express = require('express');
const app = express();
app.use(express.json());

const con = require('../../mysql.js');

delete_appointment = (gid, appt_key) => {
    if (gid != null) {
        con.query("DELETE FROM Customer_Group WHERE GID = '" + gid + "';",
            function(err) {
                if (err) throw err;
            })
    }
    con.query("DELETE FROM Appointment WHERE Appt_Key = " + appt_key + ";",
        function(err) {
            if (err) throw err;
        })
}

app.put('/Admin/Calendar/Delete_Appointment', (req, res) => {
    var appt_key = req.body.appt_key;
    var gid;
    con.query("SELECT Appt_GID FROM Appointment WHERE Appt_Key = " + appt_key +
        ";",
        function(err, result) {
            if (err) throw err;
            gid = result[0].Appt_GID;
            delete_appointment(gid, appt_key);
        })
})

module.exports = app;