const express = require('express');
const app = express();
app.use(express.json());

app.use('/', require('../src/Customer/Appointments/Set_Customer_Appointment'))
app.use('/', require('../src/Customer/Appointments/Update_Customer_Appointment'))
app.use('/', require('../src/Customer/Delete_Customer'))
app.use('/', require('../src/Customer/Set_Customer'))
app.use('/', require('../src/Customer/Update_Customer'))
app.listen(9002);

module.exports = app;