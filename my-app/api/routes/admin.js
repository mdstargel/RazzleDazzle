const express = require('express');
const app = express();
app.use(express.json());

app.use('/', require('../src/Admin/Appointment/Delete_Admin_Appointment'))
app.use('/', require('../src/Admin/Appointment/Notify_Admin_Appointment'))
app.use('/', require('../src/Admin/Appointment/Set_Admin_Appointment'))
app.use('/', require('../src/Admin/Appointment/Update_Admin_Appointment'))
app.use('/', require('../src/Admin/Mini_Customer/Delete_Mini_Customer'))
app.use('/', require('../src/Admin/Mini_Customer/Notify_Mini_Customer'))
app.use('/', require('../src/Admin/Mini_Customer/Set_Mini_Customer'))
app.use('/', require('../src/Admin/Mini_Customer/Update_Mini_Customer'))
app.use('/', require('../src/Admin/Mini_Trainer/Delete_Mini_Trainer'))
app.use('/', require('../src/Admin/Mini_Trainer/Notify_Mini_Trainer'))
app.use('/', require('../src/Admin/Mini_Trainer/Set_Mini_Trainer'))
app.use('/', require('../src/Admin/Mini_Trainer/Update_Mini_Trainer'))
app.use('/', require('../src/Admin/News/Delete_Admin_News'))
app.use('/', require('../src/Admin/News/Set_Admin_News'))
app.use('/', require('../src/Admin/News/Update_Admin_News'))
app.use('/', require('../src/Admin/Create_Appointment'))
app.use('/', require('../src/Admin/Create_Trainer'))
app.use('/', require('../src/Admin/Create_News'))
app.listen(9001);

module.exports = app;