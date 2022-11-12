const express = require('express');
const app = express();
app.use(express.json());

const con = require('../../mysql.js');

app.put('/Admin/Trainer/Set_Admin', (req, res) => {
    var admin = req.body.admin;
    var trainer_id = req.body.user_id;
    con.query("UPDATE Login SET Admin = " + admin + " " +
        "WHERE TID = " + trainer_id + ";",
        function(err) {
            if (err) throw err;
        });
})

module.exports = app;