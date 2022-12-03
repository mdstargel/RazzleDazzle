/**
 * Imports
 */
const async = require('async');
const {
    Email_Appointment,
    Text_Appointment
} = require('./Notifications');



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
 * @param {*} AID 
 * @returns phone_number_array
 */
async function Get_Phone_Numbers(AID) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    var query_values = await CON.promise().query(
        "SELECT Appointment_GID " +
        "FROM Appointment " +
        "WHERE AID = " + AID + ";");

    var GID = query_values[0][0].Appointment_GID;

    query_values = await CON.promise().query(
        "SELECT " +
        "CID_2, " +
        "CID_3, " +
        "CID_4 " +
        "FROM Customer_Group " +
        "WHERE GID = " + GID + ";");

    var CID_2 = query_values[0][0].CID_2;
    var CID_3 = query_values[0][0].CID_3;
    var CID_4 = query_values[0][0].CID_4;

    var phone_numbers_array = [];
    var phone_number;
    var phone_notification;

    query_values = await CON.promise().query(
        "SELECT " +
        "Customer_Phone_Number, " +
        "Customer_Phone_Notifications " +
        "FROM Customer " +
        "INNER JOIN " +
        "Customer_Group ON CID = Customer_Group.CID_1 " +
        "WHERE Customer_Group.GID = " + GID + ";");

    phone_number = query_values[0][0].Customer_Phone_Number.match(/\d/g) + "";
    phone_notification = query_values[0][0].Customer_Phone_Notifications;
    if (phone_notification) phone_numbers_array.push(phone_number);

    if (CID_2 != null) {
        query_values = await CON.promise().query(
            "SELECT " +
            "Customer_Phone_Number, " +
            "Customer_Phone_Notifications " +
            "FROM Customer " +
            "INNER JOIN " +
            "Customer_Group ON CID = Customer_Group.CID_2 " +
            "WHERE Customer_Group.GID = " + GID + ";");

        phone_number = query_values[0][0].Customer_Phone_Number.match(/\d/g) + "";
        phone_notification = query_values[0][0].Customer_Phone_Notifications;
        if (phone_notification) phone_numbers_array.push(phone_number);
    }

    if (CID_3 != null) {
        query_values = await CON.promise().query(
            "SELECT " +
            "Customer_Phone_Number, " +
            "Customer_Phone_Notifications " +
            "FROM Customer " +
            "INNER JOIN " +
            "Customer_Group ON CID = Customer_Group.CID_3 " +
            "WHERE Customer_Group.GID = " + GID + ";");

        phone_number = query_values[0][0].Customer_Phone_Number.match(/\d/g) + "";
        phone_notification = query_values[0][0].Customer_Phone_Notifications;
        if (phone_notification) phone_numbers_array.push(phone_number);
    }

    if (CID_4 != null) {
        query_values = await CON.promise().query(
            "SELECT " +
            "Customer_Phone_Number, " +
            "Customer_Phone_Notifications " +
            "FROM Customer " +
            "INNER JOIN " +
            "Customer_Group ON CID = Customer_Group.CID_4 " +
            "WHERE Customer_Group.GID = " + GID + ";");

        phone_number = query_values[0][0].Customer_Phone_Number.match(/\d/g) + "";
        phone_notification = query_values[0][0].Customer_Phone_Notifications;
        if (phone_notification) phone_numbers_array.push(phone_number);
    }

    // Close connection
    CON.end();

    return phone_numbers_array;
}

/**
 * 
 * @param {*} AID 
 * @returns email_address_array
 */
async function Get_Email_Addresses(AID) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    var query_values = await CON.promise().query(
        "SELECT Appointment_GID " +
        "FROM Appointment " +
        "WHERE AID = " + AID + ";");

    var GID = query_values[0][0].Appointment_GID;

    query_values = await CON.promise().query(
        "SELECT " +
        "CID_2, " +
        "CID_3, " +
        "CID_4 " +
        "FROM Customer_Group " +
        "WHERE GID = " + GID + ";");

    var CID_2 = query_values[0][0].CID_2;
    var CID_3 = query_values[0][0].CID_3;
    var CID_4 = query_values[0][0].CID_4;

    var email_address_array = [];
    var email_address;

    query_values = await CON.promise().query(
        "SELECT " +
        "Customer_Email_Address " +
        "FROM Customer " +
        "INNER JOIN " +
        "Customer_Group ON CID = Customer_Group.CID_1 " +
        "WHERE Customer_Group.GID = " + GID + ";");

    email_address = query_values[0][0].Customer_Email_Address;
    email_address_array.push(email_address);

    if (CID_2 != null) {
        query_values = await CON.promise().query(
            "SELECT " +
            "Customer_Email_Address " +
            "FROM Customer " +
            "INNER JOIN " +
            "Customer_Group ON CID = Customer_Group.CID_2 " +
            "WHERE Customer_Group.GID = " + GID + ";");

        email_address = query_values[0][0].Customer_Email_Address;
        email_address_array.push(email_address);
    }

    if (CID_3 != null) {
        query_values = await CON.promise().query(
            "SELECT " +
            "Customer_Email_Address " +
            "FROM Customer " +
            "INNER JOIN " +
            "Customer_Group ON CID = Customer_Group.CID_3 " +
            "WHERE Customer_Group.GID = " + GID + ";");

        email_address = query_values[0][0].Customer_Email_Address;
        email_address_array.push(email_address);
    }

    if (CID_4 != null) {
        query_values = await CON.promise().query(
            "SELECT " +
            "Customer_Email_Address " +
            "FROM Customer " +
            "INNER JOIN " +
            "Customer_Group ON CID = Customer_Group.CID_4 " +
            "WHERE Customer_Group.GID = " + GID + ";");

        email_address = query_values[0][0].Customer_Email_Address;
        email_address_array.push(email_address);
    }

    // Close connection
    CON.end();

    return email_address_array;
}

async function Notify_Appointment(AID, title, notification) {
    var email_address_array = await Get_Email_Addresses(AID);
    var phone_number_array = await Get_Phone_Numbers(AID);

    for (var i = 0; i < email_address_array.length; i++) {
        Email_Appointment(email_address_array[i], title, notification);
    }

    for (var i = 0; i < phone_number_array.length; i++) {
        Text_Appointment(phone_number_array[i], notification);
    }
}

async function Notify_Customers(CIDs, title, notification) {
    var email_address;
    var phone_number;
    var phone_notification;
    var query_values;

    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    for (var i = 0; i < CIDs.length; i++) {
        query_values = await CON.promise().query(
            "SELECT Customer_Email_Address " +
            "FROM Customer " +
            "WHERE CID = " + CIDs[i] + ";");

        email_address = query_values[0][0].Customer_Email_Address;

        Email_Appointment(email_address, title, notification);
    }

    for (var i = 0; i < CIDs.length; i++) {
        query_values = await CON.promise().query(
            "SELECT Customer_Phone_Number, " +
            "Customer_Phone_Notifications " +
            "FROM Customer " +
            "WHERE CID = " + CIDs[i] + ";");

        phone_number = query_values[0][0].Customer_Phone_Number;
        phone_notification = query_values[0][0].Customer_Phone_Notifications;

        if (phone_notification) {
            Text_Appointment(phone_number, notification);
        }
    }

    // Close connection
    CON.end();
}

async function Notify_Trainers(TIDs, title, notification) {
    var email_address;
    var phone_number;
    var query_values;

    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    for (var i = 0; i < CIDs.length; i++) {
        query_values = await CON.promise().query(
            "SELECT Trainer_Email_Address " +
            "FROM Trainer " +
            "WHERE TID = " + TIDs[i] + ";");

        email_address = query_values[0][0].Trainer_Email_Address;

        Email_Appointment(email_address, title, notification);
    }

    for (var i = 0; i < CIDs.length; i++) {
        query_values = await CON.promise().query(
            "SELECT Trainer_Phone_Number, " +
            "FROM Trainer " +
            "WHERE TID = " + TIDs[i] + ";");

        phone_number = query_values[0][0].Trainer_Phone_Number;

        Text_Appointment(phone_number, notification);
    }

    // Close connection
    CON.end();
}

async function Notify_User_Forgot_Password(email_address, code) {
    var title = "Change Password Code";
    var notification = "The code to change your password is : " + code;
    Email_Appointment(email_address, title, notification);
}

module.exports = {
    Notify_Appointment,
    Notify_Customers,
    Notify_Trainers,
    Notify_User_Forgot_Password
}