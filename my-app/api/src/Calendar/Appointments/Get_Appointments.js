/**
 * Imports
 */
const async = require('async');
const dereferenced_customer_appointment = require('./Classes/Class_Dereferenced_Customer_Appointment');
const dereferenced_trainer_appointment = require('./Classes/Class_Dereferenced_Trainer_Appointment');
const dereferenced_administrator_appointment = require('./Classes/Class_Dereferenced_Administrator_Appointment');

/**
 * Mysql connection
 */
const MYSQL = require('mysql2');
const MYSQL_CONFIG = {
    host: "localhost",
    user: "root",
    password: "password",
    database: "Horse_Site",
    insecureAuth: true,
    connectTimeout: 30000
};

/**
 * 
 * @param {*} GID 
 * @param {*} CID 
 * @returns if appointment is reserved by customer
 */
async function Get_Reservation(GID, CID) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    var customers = await CON.promise().query(
        "SELECT CID_1, " +
        "CID_2, " +
        "CID_3, " +
        "CID_4 " +
        "FROM Customer_Group " +
        "WHERE GID = " + GID + ";"
    );

    // Close connection
    CON.end();

    // Pull values
    customers = customers[0];

    // Check reservation
    var reservation;

    if (customers[0].CID_1 == CID ||
        customers[0].CID_2 == CID ||
        customers[0].CID_3 == CID ||
        customers[0].CID_4 == CID) {
        reservation = true;
    } else {
        reservation = false;
    }

    return reservation;
}

/**
 * 
 * @param {*} AID 
 * @returns customer appointment
 */
async function Get_Customer_Appointment(AID, CID) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    // Get appointment
    var appointment_values = await CON.promise().query(
        "SELECT Appointment_Name, " +
        "Appointment_Date, " +
        "Appointment_Start_Time, " +
        "Appointment_End_Time, " +
        "Appointment_Riding_Style, " +
        "Appointment_Description, " +
        "Appointment_Public_Notes, " +
        "Appointment_Group, " +
        "Appointment_Group_Size " +
        "Appointment_TID_1 " +
        "Appointment_TID_2 " +
        "Appointment_GID " +
        "FROM Appointment " +
        "WHERE AID = " + AID + ";");

    // Close connection
    CON.end();

    // Pull values
    appointment_values = appointment_values[0];

    // Check if appointment is reserved
    var reserved;
    var GID = appointment_values[0].Appointment_GID;

    if (GID != null) {
        reserved = await Get_Reservation(GID, CID);
    } else {
        reserved = false;
    }

    // Create appointment
    var appointment = new dereferenced_customer_appointment(
        appointment_values[0].Appointment_Name,
        appointment_values[0].Appointment_Date,
        appointment_values[0].Appointment_Start_Time,
        appointment_values[0].Appointment_End_Time,
        appointment_values[0].Appointment_Riding_Style,
        appointment_values[0].Appointment_Description,
        appointment_values[0].Appointment_Public_Notes,
        appointment_values[0].Appointment_Group,
        appointment_values[0].Appointment_Group_Size,
        appointment_values[0].Appointment_TID_1,
        appointment_values[0].Appointment_TID_2,
        reserved);

    return appointment;
}

/**
 * 
 * @param {*} AID 
 * @returns trainer appointment
 */
async function Get_Trainer_Appointment(AID) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    // Get appointment
    var appointment_values = await CON.promise().query(
        "SELECT Appointment_Name, " +
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
        "WHERE AID = " + AID + ";");

    // Close connection
    CON.end();

    // Pull values
    appointment_values = appointment_values[0];

    // Create appointment
    var appointment = new dereferenced_trainer_appointment(
        appointment_values[0].Appointment_Name,
        appointment_values[0].Appointment_Date,
        appointment_values[0].Appointment_Start_Time,
        appointment_values[0].Appointment_End_Time,
        appointment_values[0].Appointment_Riding_Style,
        appointment_values[0].Appointment_Description,
        appointment_values[0].Appointment_Public_Notes,
        appointment_values[0].Appointment_Private_Notes,
        appointment_values[0].Appointment_Group,
        appointment_values[0].Appointment_Group_Size,
        appointment_values[0].Appointment_GID);

    return appointment;
}

/**
 * 
 * @param {*} AID 
 * @returns administrator appointment
 */
async function Get_Administrator_Appointment(AID) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    // Get appointment
    var appointment_values = await CON.promise().query(
        "SELECT Appointment_Name, " +
        "Appointment_Date, " +
        "Appointment_Start_Time, " +
        "Appointment_End_Time, " +
        "Appointment_Riding_Style, " +
        "Appointment_Difficulty, " +
        "Appointment_Description, " +
        "Appointment_Public_Notes, " +
        "Appointment_Private_Notes, " +
        "Appointment_Group, " +
        "Appointment_Group_Size " +
        "Appointment_TID_1, " +
        "Appointment_TID_2, " +
        "Appointment_GID, " +
        "FROM Appointment " +
        "WHERE AID = " + AID + ";");

    // Close connection
    CON.end();

    // Pull values
    appointment_values = appointment_values[0];

    // Create appointment
    var appointment = new dereferenced_administrator_appointment(
        appointment_values[0].Appointment_Name,
        appointment_values[0].Appointment_Date,
        appointment_values[0].Appointment_Start_Time,
        appointment_values[0].Appointment_End_Time,
        appointment_values[0].Appointment_Riding_Style,
        appointment_values[0].Appointment_Difficulty,
        appointment_values[0].Appointment_Description,
        appointment_values[0].Appointment_Public_Notes,
        appointment_values[0].Appointment_Private_Notes,
        appointment_values[0].Appointment_Group,
        appointment_values[0].Appointment_Group_Size,
        appointment_values[0].Appointment_TID_1,
        appointment_values[0].Appointment_TID_2,
        appointment_values[0].Appointment_GID);

    return appointment;
}

module.exports = {
    Get_Customer_Appointment,
    Get_Trainer_Appointment,
    Get_Administrator_Appointment
}