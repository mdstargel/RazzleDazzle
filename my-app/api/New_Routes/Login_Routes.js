const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
  }));

const Validate_User = require('../src/Login');

app.post('/Login', async function(req, res) {
    var login_email = req.body.login_email;
    var login_password = req.body.login_password;
    var user = await Validate_User(login_email, login_password);
    res.send(user);
})

module.exports = app;