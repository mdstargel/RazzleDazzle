var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const { Validate_User } = require('../src/Login');
const { Get_All_News } = require('../src/News/Get_News');
const { Create_Customer } = require('../src/Users/Create_Users');

app.post('/Login', async function(req, res) {
    var login_email = req.body.login_email;
    var login_password = req.body.login_password;
    var user = await Validate_User(login_email, login_password);
    res.send(user);
})

app.get('/Public_News', async function(req, res) {
    var public_news = await Get_All_News();
    res.send(public_news);
})

app.post('/Create_Account', async function(req, res) {
    var customer_name = req.body.customer_name;
    var customer_address = req.body.customer_address;
    var customer_phone_number = req.body.customer_phone_number;
    var customer_email_address = req.body.customer_email_address;
    var customer_password = req.body.customer_password;

    var CID = await Create_Customer(
        customer_name,
        customer_address,
        customer_phone_number,
        customer_email_address,
        customer_password);

    res.json(CID);
})

app.post('/Testpost', function(req, res) {
    res.send(req.body);
})

app.put('/Testput', function(req, res) {
    res.send(req.body);
})

app.get('/Testget', function(req, res) {
    res.send(req.body);
})

module.exports = app;