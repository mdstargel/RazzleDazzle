/**
 * Imports
 */
const async = require('async');
const administrator_appointment = require('./Classes/Class_Administrator_Appointment');

/**
 * Mysql connection
 */
const MYSQL = require('mysql2');
const MYSQL_CONFIG = {
    host: "localhost",
    user: "root",
    password: "Password1!",
    database: "Horse_Site",
    insecureAuth: true,
    connectTimeout: 30000
};

/**
 * 
 * @param {*} appointment_name 
 * @param {*} appointment_date 
 * @param {*} appointment_start_time 
 * @param {*} appointment_end_time 
 * @param {*} appointment_riding_style 
 * @param {*} appointment_difficulty 
 * @param {*} appointment_description 
 * @param {*} appointment_public_notes 
 * @param {*} appointment_private_notes 
 * @param {*} appointment_group 
 * @param {*} appointment_group_size 
 * @param {*} appointment_TID_1 
 * @param {*} appointment_TID_2 
 * @returns administrator appointment
 */
async function Create_Appointment(
    appointment_name,
    appointment_date,
    appointment_start_time,
    appointment_end_time,
    appointment_riding_style,
    appointment_difficulty,
    appointment_description,
    appointment_public_notes,
    appointment_private_notes,
    appointment_group,
    appointment_group_size,
    appointment_TID_1,
    appointment_TID_2) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    const DATE = new Date(appointment_date);
    const DD = String(DATE.getDate()).padStart(2, '0');
    const MM = String(DATE.getMonth() + 1).padStart(2, '0');
    const YYYY = DATE.getFullYear();
    const APPOINTMENT_DATE = YYYY + '-' + MM + '-' + DD;

    await CON.promise().query(
        "INSERT INTO Appointment (" +
        "Appointment_Name, " +
        "Appointment_Date, " +
        "Appointment_Start_Time, " +
        "Appointment_End_Time, " +
        "Appointment_Riding_Style, " +
        "Appointment_Difficulty, " +
        "Appointment_Description, " +
        "Appointment_Public_Notes, " +
        "Appointment_Private_Notes, " +
        "Appointment_Group, " +
        "Appointment_Group_Size, " +
        "Appointment_TID_1, " +
        "Appointment_TID_2) " +
        "VALUES ('" +
        appointment_name + "', '" +
        APPOINTMENT_DATE + "', '" +
        appointment_start_time + "', '" +
        appointment_end_time + "', '" +
        appointment_riding_style + "', '" +
        appointment_difficulty + "', '" +
        appointment_description + "', '" +
        appointment_public_notes + "', '" +
        appointment_private_notes + "', '" +
        appointment_group + "', '" +
        appointment_group_size + "', '" +
        appointment_TID_1 + "', '" +
        appointment_TID_2 + "');"
    );

    // Close connection
    CON.end();
}

module.exports = {
    Create_Appointment
}