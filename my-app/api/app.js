var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Horse Site Routers
var loginRouter = require('./src/Login');
// var PubNewsRouter = require('./src/Public_News');
var CreateCustRouter = require('./src/Create_Customer');

// var UpdatePubNewsRouter = require('./src/News/Update_News');

// var UpdateCustRouter = require('./src/Customer/Update_Customer');
// var SetCustRouter = require('./src/Customer/Set_Customer');
// var DeleteCustRouter = require('./src/Customer/Delete_Customer');
// var UpdateCustApptRouter = require('./src/Customer/Appointments/Update_Customer_Appointment');
// var SetCustApptRouter = require('./src/Customer/Appointments/Set_Customer_Appointment');

// var UpdateTrRouter = require('./src/Trainer/Update_Trainer');
// var SetTrRouter = require('./src/Trainer/Set_Trainer');
// var UpdateTrApptRouter = require('./src/Trainer/Appointments/Update_Trainer_Appointment');
// var SetTrApptRouter = require('./src/Trainer/Appointments/Set_Trainer_Appointment');
// var NotifTrApptRouter = require('./src/Trainer/Appointments/Notify_Trainer_Appointment');
// var GetTrApptCustRouter = require('./src/Trainer/Appointments/Get_Trainer_Appointment_Customers');

var UpdateAdminRouter = require('./src/Admin/Update_Admin');
var SetAdminRouter = require('./src/Admin/Set_Admin');
var CreateTrainerRouter = require('./src/Admin/Create_Trainer');
// var CreateNewsRouter = require('./src/Admin/Create_News');
var CreateApptRouter = require('./src/Admin/Create_Appointment');

var UpdateAdminApptRouter = require('./src/Admin/Appointment/Update_Admin_Appointment');
var SetAdminApptRouter = require('./src/Admin/Appointment/Set_Admin_Appointment');
// var NotifyAdminApptRouter = require('./src/Admin/Appointment/Notify_Admin_Appointment');
// var DeleteAdminApptRouter = require('./src/Admin/Appointment/Delete_Admin_Appointment');

var UpdateMiniCustRouter = require('./src/Admin/Mini_Customer/Update_Mini_Customer');
var SetMiniCustRouter = require('./src/Admin/Mini_Customer/Set_Mini_Customer');
var NotifyMiniCustRouter = require('./src/Admin/Mini_Customer/Notify_Mini_Customer');
// var DeleteMiniCustRouter = require('./src/Admin/Mini_Customer/Delete_Mini_Customer');

var UpdateMiniTrRouter = require('./src/Admin/Mini_Trainer/Update_Mini_Trainer');
var SetMiniTrRouter = require('./src/Admin/Mini_Trainer/Set_Mini_Trainer');
// var NotifyMiniTrRouter = require('./src/Admin/Mini_Trainer/Notify_Mini_Trainer');
// var DeleteMiniTrRouter = require('./src/Admin/Mini_Trainer/Delete_Mini_Trainer');

// var UpdateAdminNews = require('./src/Admin/News/Update_Admin_News');
// var SetAdminNews = require('./src/Admin/News/Set_Admin_News');
// var DeleteAdminNews = require('./src/Admin/News/Delete_Admin_News');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Horse Site Routers
app.use('/Login', loginRouter);
// app.use('/Public_News', PubNewsRouter);
app.use('/Create_Customer', CreateCustRouter);

// app.use('/UpdateNews', UpdatePubNewsRouter);

// app.use('/Update_Customer', UpdateCustRouter);
// app.use('/Set_Customer', SetCustRouter);
// app.use('/Delete_Customer', DeleteCustRouter);
// app.use('/Update_Customer_Appointment', UpdateCustApptRouter);
// app.use('/Set_Customer_Appointment', SetCustApptRouter);

// app.use('/Update_Trainer', UpdateTrRouter);
// app.use('/Set_Trainer', SetTrRouter);
// app.use('/Update_Trainer_Appointment', UpdateTrApptRouter);
// app.use('/Set_Trainer_Appointment', SetTrApptRouter);
// app.use('/Notify_Trainer_Appointment', NotifTrApptRouter);
// app.use('/Get_Trainer_Appointment_Customers', GetTrApptCustRouter);

app.use('/Update_Admin', UpdateAdminRouter);
app.use('/Set_Admin', SetAdminRouter);
app.use('/Create_Trainer', CreateTrainerRouter);
// app.use('/Create_News', CreateNewsRouter);
app.use('/Create_Appointment', CreateApptRouter);

app.use('/Update_Admin_Appointment', UpdateAdminApptRouter);
app.use('/Set_Admin_Appointment', SetAdminApptRouter);
// app.use('/Notify_Admin_Appointment', NotifyAdminApptRouter);
// app.use('/Delete_Admin_Appointment', DeleteAdminApptRouter);

app.use('/Update_Mini_Customer', UpdateMiniCustRouter);
app.use('/Set_Mini_Customer', SetMiniCustRouter);
app.use('/Notify_Mini_Customer', NotifyMiniCustRouter);
// app.use('/Delete_Mini_Customer', DeleteMiniCustRouter);

app.use('/Update_Mini_Trainer', UpdateMiniTrRouter);
app.use('/Set_Mini_Trainer', SetMiniTrRouter);
// app.use('/Notify_Mini_Trainer', NotifyMiniTrRouter);
// app.use('/Delete_Mini_Trainer', DeleteMiniTrRouter);

// app.use('/Update_Admin_News', UpdateAdminNews);
// app.use('/Set_Admin_News', SetAdminNews);
// app.use('/Delete_Admin_News', DeleteAdminNews);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;