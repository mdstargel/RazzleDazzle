/**
 * Imports
 */
const async = require('async');
const customer_appointment = require('./Appointments/Classes/Class_Customer_Appointment');
const trainer_appointment = require('./Appointments/Classes/Class_Trainer_Appointment');
const administrator_appointment = require('./Appointments/Classes/Class_Administrator_Appointment');

/**
 * Mysql connection
 */
const MYSQL = require('mysql2');
const MYSQL_CONFIG = {
    host: "localhost",
    user: "root",
    password: "B311ao2l2",
    database: "Horse_Site",
    insecureAuth: true,
    connectTimeout: 30000
};

/**
 * 
 * @param {*} CID 
 * @returns customer calendar
 */
async function Get_Customer_Calendar(CID) {
    // Create calendar
    var calendar = [];

    // Get Current Date
    const TODAY = new Date();
    const DD = String(TODAY.getDate()).padStart(2, '0');
    const MM = String(TODAY.getMonth() + 1).padStart(2, '0');
    const YYYY = TODAY.getFullYear();
    const CURRENT_DATE = YYYY + '-' + MM + '-' + DD;

    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    // Get registered appointments
    var registered_appointments = await CON.promise().query(
        "SELECT Appointment.AID, " +
        "Appointment.Appointment_Name, " +
        "Appointment.Appointment_Date, " +
        "Appointment.Appointment_Start_Time, " +
        "Appointment.Appointment_End_Time, " +
        "Appointment.Appointment_Riding_Style, " +
        "Appointment.Appointment_Description, " +
        "Appointment.Appointment_Public_Notes, " +
        "Appointment.Appointment_Group, " +
        "Appointment.Appointment_Group_Size, " +
        "Appointment.Appointment_TID_1, " +
        "Appointment.Appointment_TID_2 " +
        "FROM Appointment " +
        "INNER JOIN Customer_Group " +
        "ON Appointment.Appointment_GID = Customer_Group.GID " +
        "WHERE Customer_Group.CID_1 = " + CID + " " +
        "OR Customer_Group.CID_2 = " + CID + " " +
        "OR Customer_Group.CID_3 = " + CID + " " +
        "OR Customer_Group.CID_4 = " + CID + ";");

    // Get customer difficulty
    const DIFFICULTY = await CON.promise().query(
        "SELECT Customer_Difficulty " +
        "FROM Customer " +
        "WHERE CID = " + CID + ";");
    var customer_difficulty = DIFFICULTY[0].Customer_Difficulty;

    // Get open appointments
    var open_appointments = await CON.promise().query(
        "SELECT Appointment.AID, " +
        "Appointment.Appointment_Name, " +
        "Appointment.Appointment_Date, " +
        "Appointment.Appointment_Start_Time, " +
        "Appointment.Appointment_End_Time, " +
        "Appointment.Appointment_Riding_Style, " +
        "Appointment.Appointment_Description, " +
        "Appointment.Appointment_Public_Notes, " +
        "Appointment.Appointment_Group, " +
        "Appointment.Appointment_Group_Size, " +
        "Appointment.Appointment_TID_1, " +
        "Appointment.Appointment_TID_2, " +
        "Appointment.Appointment_Reserved " +
        "FROM Appointment " +
        "INNER JOIN Customer_Group " +
        "ON Appointment.Appointment_GID = Customer_Group.GID " +
        "WHERE Appointment.Appointment_Difficulty = '" + customer_difficulty + "' " +
        "AND Customer_Group.CID_1 != " + CID + " " +
        "AND Customer_Group.CID_2 != " + CID + " " +
        "AND Customer_Group.CID_3 != " + CID + " " +
        "AND Customer_Group.CID_4 != " + CID + " " +
        "AND Appointment.Appointment_Group_Size > 0 " +
        "AND Appointment.Appointment_Date > '" + CURRENT_DATE + "';");

    // Close connection
    CON.close();

    // Pull values
    registered_appointments = registered_appointments[0];
    open_appointments = open_appointments[0];

    // Add registered appointments to calendar
    for (var i = 0; i < registered_appointments.length; i++) {
        calendar.push(
            new customer_appointment(
                registered_appointments[i].AID,
                registered_appointments[i].Appointment_Name,
                registered_appointments[i].Appointment_Date,
                registered_appointments[i].Appointment_Start_Time,
                registered_appointments[i].Appointment_End_Time,
                registered_appointments[i].Appointment_Riding_Style,
                registered_appointments[i].Appointment_Description,
                registered_appointments[i].Appointment_Public_Notes,
                registered_appointments[i].Appointment_Group,
                registered_appointments[i].Appointment_Group_Size,
                registered_appointments[i].Appointment_TID_1,
                registered_appointments[i].Appointment_TID_2,
                true)
        );
    };

    // Add open appointments to calendar
    for (var i = 0; i < open_appointments.length; i++) {
        calendar.push(
            new customer_appointment(
                open_appointments[i].AID,
                open_appointments[i].Appointment_Name,
                open_appointments[i].Appointment_Date,
                open_appointments[i].Appointment_Start_Time,
                open_appointments[i].Appointment_End_Time,
                open_appointments[i].Appointment_Riding_Style,
                open_appointments[i].Appointment_Description,
                open_appointments[i].Appointment_Public_Notes,
                open_appointments[i].Appointment_Group,
                open_appointments[i].Appointment_Group_Size,
                open_appointments[i].Appointment_TID_1,
                open_appointments[i].Appointment_TID_2,
                false)
        );
    };

    return calendar;
}

/**
 * 
 * @param {*} TID 
 * @returns trainer calendar
 */
async function Get_Trainer_Calendar(TID) {
    // Create calendar
    var calendar = [];

    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    // Get assigned appointments
    var assigned_appointments = await CON.promise().query(
        "SELECT AID, " +
        "Appointment_Name, " +
        "Appointment_Date, " +
        "Appointment_Start_Time, " +
        "Appointment_End_Time, " +
        "Appointment_Riding_Style, " +
        "Appointment_Description, " +
        "Appointment_Public_Notes, " +
        "Appointment_Private_Notes, " +
        "Appointment_Group, " +
        "Appointment_Group_Size " +
        "Appointment_GID " +
        "FROM Appointment " +
        "WHERE Appointment_TID_1 = " + TID + " " +
        "OR Appointment_TID_2 = " + TID + ";");

    // Close connection
    CON.close();

    // Pull values
    assigned_appointments = assigned_appointments[0];

    // Add assigned appointments to calendar
    for (var i = 0; i < assigned_appointments.length; i++) {
        calendar.push(
            new trainer_appointment(
                assigned_appointments[i].AID,
                assigned_appointments[i].Appointment_Name,
                assigned_appointments[i].Appointment_Date,
                assigned_appointments[i].Appointment_Start_Time,
                assigned_appointments[i].Appointment_End_Time,
                assigned_appointments[i].Appointment_Riding_Style,
                assigned_appointments[i].Appointment_Description,
                assigned_appointments[i].Appointment_Public_Notes,
                assigned_appointments[i].Appointment_Private_Notes,
                assigned_appointments[i].Appointment_Group,
                assigned_appointments[i].Appointment_Group_Size,
                assigned_appointments[i].Appointment_GID)
        );
    };

    return calendar;
}

/**
 * 
 * @returns administrator calendar
 */
async function Get_Administrator_Calendar() {
    // Create calendar
    var calendar = [];

    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    // Get all appointments
    var appointments = await CON.promise().query(
        "SELECT * " +
        "FROM Appointment;");

    // Close connection
    CON.close();

    // Pull values
    appointments = appointments[0];

    // Add all appointments to calendar
    for (var i = 0; i < appointments.length; i++) {
        calendar.push(
            new administrator_appointment(
                appointments[i].AID,
                appointments[i].Appointment_Name,
                appointments[i].Appointment_Date,
                appointments[i].Appointment_Start_Time,
                appointments[i].Appointment_End_Time,
                appointments[i].Appointment_Riding_Style,
                appointments[i].Appointment_Difficulty,
                appointments[i].Appointment_Description,
                appointments[i].Appointment_Public_Notes,
                appointments[i].Appointment_Private_Notes,
                appointments[i].Appointment_Group,
                appointments[i].Appointment_Group_Size,
                appointments[i].Appointment_TID_1,
                appointments[i].Appointment_TID_2,
                appointments[i].Appointment_GID,
                hash_trainers)
        );
    };

    return calendar;
}

module.exports = {
    Get_Customer_Calendar,
    Get_Trainer_Calendar,
    Get_Administrator_Calendar
}