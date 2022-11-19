const express = require('express');
const app = express();
app.use(express.json());

app.use('/', require('./Public_Routes'));
app.use('/', require('./Customer_Routes'));
app.use('/', require('./Trainer_Routes'));
app.use('/', require('./Administrator_Routes'));

app.listen(9001);

module.exports = app;