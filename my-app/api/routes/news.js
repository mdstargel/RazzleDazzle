const express = require('express');
const app = express();
app.use(express.json());

app.use('/', require('../src/News/Update_News'))
app.use('/', require('../src/Public_News'))
app.listen(9001);

module.exports = app;