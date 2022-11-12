const express = require('express');
const app = express();
app.use(express.json());

const con = require('../../mysql.js');

app.put('/Admin/Customer/Set_Difficulty', (req, res) => {
    var difficulty = req.body.difficulty;
    var customer_id = req.body.user_id;
    con.query("UPDATE Customer SET Difficulty = " + difficulty +
        " WHERE CID = " + customer_id);
})

module.exports = app;