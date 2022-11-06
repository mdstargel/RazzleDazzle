var express = require("express");
var router = express.Router();
var { login } = require("../src/Login.js");

router.use(bodyParser.json());

router.get('/', function(req, res) {
    res.json(login(req.body.email, req.body.password));
});

module.exports = router;