const express = require('express');
const app = express();
app.use(express.json());

let con = require('../../mysql.js');

app.put('/Admin/News/Delete_News', (req, res) => {
    var news_key = req.body.news_key;
    con.query("DELETE FROM News WHERE Key = " + news_key + ";",
        function(err) {
            if (err) throw err;
        })
})

module.exports = app;