const express = require('express');
const app = express();
app.use(express.json());

const con = require('../../mysql.js');

delete_mini_trainer = (email, trainer_id) => {
    con.query("UPDATE Login SET Decomissioned = 1 WHERE Email = " +
        email + ";",
        function(err) {
            if (err) throw err;
        })
    con.query("UPDATE Appointment SET Appt_TID_1 = NULL WHERE Appt_TID_1 = " +
        trainer_id + ";",
        function(err) {
            if (err) throw err;
        })
    con.query("UPDATE Appointment SET Appt_TID_2 = NULL WHERE Appt_TID_2 = " +
        trainer_id + ";",
        function(err) {
            if (err) throw err;
        })
}

app.put('/Admin/Trainer/Delete_User', (req, res) => {
    var email;
    var trainer_id = req.body.user_id;
    con.query("SELECT Train_Email_Addr FROM Trainer WHERE TID = " + trainer_id +
        ";",
        function(err, result) {
            if (err) throw err;
            email = result[0].Train_Email_Addr;
            delete_mini_trainer(email, trainer_id);
        })
})

module.exports = app;