/**
 * Imports
 */
const async = require('async');

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


function Set_Customer_Name(CID, customer_name) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    CON.query(
        "UPDATE Customer " +
        "SET Customer_Name = '" + customer_name + "' " +
        "WHERE CID = " + CID + ";"
    )

    // Close connection
    CON.close();
}


function Set_Customer_Address(CID, customer_address) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    CON.query(
        "UPDATE Customer " +
        "SET Customer_Address = '" + customer_address + "' " +
        "WHERE CID = " + CID + ";"
    )

    // Close connection
    CON.close();
}


function Set_Customer_Phone_Number(CID, customer_phone_number) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    CON.query(
        "UPDATE Customer " +
        "SET Customer_Phone_Number = '" + customer_phone_number + "' " +
        "WHERE CID = " + CID + ";"
    )

    // Close connection
    CON.close();
}


function Set_Customer_Email_Address(CID, customer_email_address) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    CON.query(
        "UPDATE Customer " +
        "SET Customer_Email_Address = '" + customer_email_address + "' " +
        "WHERE CID = " + CID + ";"
    )

    // Close connection
    CON.close();
}


function Set_Customer_Emergency_Name(CID, customer_emergency_name) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    CON.query(
        "UPDATE Customer " +
        "SET Customer_Emergency_Name = '" + customer_emergency_name + "' " +
        "WHERE CID = " + CID + ";"
    )

    // Close connection
    CON.close();
}


function Set_Customer_Emergency_Phone_Number(CID, customer_emergency_phone_number) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    CON.query(
        "UPDATE Customer " +
        "SET Customer_Emergency_Phone_Number = '" + customer_emergency_phone_number + "' " +
        "WHERE CID = " + CID + ";"
    )

    // Close connection
    CON.close();
}


function Set_Customer_Difficulty(CID, customer_difficulty) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    CON.query(
        "UPDATE Customer " +
        "SET Customer_Difficulty = '" + customer_difficulty + "' " +
        "WHERE CID = " + CID + ";"
    )

    // Close connection
    CON.close();
}


function Set_Customer_Phone_Notifications(CID, customer_phone_notifications) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    CON.query(
        "UPDATE Customer " +
        "SET Customer_Phone_Notifications = '" + customer_phone_notifications + "' " +
        "WHERE CID = " + CID + ";"
    )

    // Close connection
    CON.close();
}


function Set_Trainer_Name(TID, trainer_name) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    CON.query(
        "UPDATE Trainer " +
        "SET Trainer_Name = '" + trainer_name + "' " +
        "WHERE TID = " + TID + ";"
    )

    // Close connection
    CON.close();
}


function Set_Trainer_Address(TID, trainer_address) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    CON.query(
        "UPDATE Trainer " +
        "SET Trainer_Address = '" + trainer_address + "' " +
        "WHERE TID = " + TID + ";"
    )

    // Close connection
    CON.close();
}


function Set_Trainer_Phone_Number(TID, trainer_phone_number) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    CON.query(
        "UPDATE Trainer " +
        "SET Trainer_Phone_Number = '" + trainer_phone_number + "' " +
        "WHERE TID = " + TID + ";"
    )

    // Close connection
    CON.close();
}


function Set_Trainer_Email_Address(TID, trainer_email_address) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    CON.query(
        "UPDATE Trainer " +
        "SET Trainer_Email_Address = '" + trainer_email_address + "' " +
        "WHERE TID = " + TID + ";"
    )

    // Close connection
    CON.close();
}


function Set_Trainer_Emergency_Name(TID, trainer_emergency_name) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    CON.query(
        "UPDATE Trainer " +
        "SET Trainer_Emergency_Name = '" + trainer_emergency_name + "' " +
        "WHERE TID = " + TID + ";"
    )

    // Close connection
    CON.close();
}


function Set_Trainer_Emergency_Phone_Number(TID, trainer_emergency_phone_number) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    CON.query(
        "UPDATE Trainer " +
        "SET Trainer_Emergency_Phone_Number = '" + trainer_emergency_phone_number + "' " +
        "WHERE TID = " + TID + ";"
    )

    // Close connection
    CON.close();
}


function Set_Trainer_Riding_Style(TID, trainer_riding_style) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    CON.query(
        "UPDATE Trainer " +
        "SET Trainer_Riding_Style = '" + trainer_riding_style + "' " +
        "WHERE TID = " + TID + ";"
    )

    // Close connection
    CON.close();
}

async function Set_Trainer_Administrator(TID, administrator) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    const TRAINER_VALUES = await CON.promise().query(
        "SELECT Trainer_Email_Address " +
        "FROM Trainer " +
        "WHERE TID = " + TID + ";");

    const TRAINER_EMAIL = TRAINER_VALUES[0].Trainer_Email_Address;

    CON.query(
        "UPDATE Login " +
        "SET Administrator = '" + administrator + " " +
        "WHERE Login_Email = '" + TRAINER_EMAIL + "';");

    // Close connection
    CON.close();
}

function Delete_Customer(CID) {

}

function Delete_Trainer(TID) {

}

module.exports = {
    Set_Customer_Name,
    Set_Customer_Address,
    Set_Customer_Phone_Number,
    Set_Customer_Email_Address,
    Set_Customer_Emergency_Name,
    Set_Customer_Emergency_Phone_Number,
    Set_Customer_Difficulty,
    Set_Customer_Phone_Notifications,
    Set_Trainer_Name,
    Set_Trainer_Address,
    Set_Trainer_Phone_Number,
    Set_Trainer_Email_Address,
    Set_Trainer_Emergency_Name,
    Set_Trainer_Emergency_Phone_Number,
    Set_Trainer_Riding_Style,
    Set_Trainer_Administrator
};