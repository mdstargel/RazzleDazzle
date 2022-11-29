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
    password: "password",
    database: "Horse_Site",
    insecureAuth: true,
    connectTimeout: 30000
};

async function Create_Customer(
    customer_name,
    customer_address,
    customer_phone_number,
    customer_email_address,
    customer_password) {
    //Default value
    var CID = 0;

    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        // Instert trainer
        await CON.promise().query(
            "INSERT INTO Customer (" +
            "Customer_Name, " +
            "Customer_Address, " +
            "Customer_Phone_Number, " +
            "Customer_Email_Address) " +
            "VALUES ('" +
            customer_name + "', '" +
            customer_address + "', '" +
            customer_phone_number + "', '" +
            customer_email_address + "');");

        const QUERY_VALUES = await CON.promise().query(
            "SELECT CID " +
            "FROM Customer " +
            "WHERE " +
            "Customer_Name = '" + customer_name + "' AND " +
            "Customer_Address = '" + customer_address + "' AND " +
            "Customer_Phone_Number = '" + customer_phone_number + "' AND " +
            "Customer_Email_address = '" + customer_email_address + "';");

        CID = QUERY_VALUES[0][0].CID;

        await CON.promise().query(
            "INSERT INTO Login (" +
            "Login_Email, " +
            "Login_Password, " +
            "CID, " +
            "Decomissioned) " +
            "VALUES ('" +
            customer_email_address + "', '" +
            customer_password + "', " +
            CID + ", " +
            "0); ");

        // Close connection
        CON.end();
    } catch (err) {
        console.error(err);
    }

    return CID;
}

async function Create_Trainer(
    trainer_name,
    trainer_address,
    trainer_phone_number,
    trainer_email_address,
    trainer_emergency_name,
    trainer_emergency_phone_number,
    trainer_riding_style) {
    // Default value
    var TID = 0;

    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        // Instert trainer
        await CON.promise().query(
            "INSERT INTO Trainer (" +
            "Trainer_Name, " +
            "Trainer_Address, " +
            "Trainer_Phone_number, " +
            "Trainer_Email_Address, " +
            "Trainer_Emergency_Name, " +
            "Trainer_Emergency_Phone_Number, " +
            "Trainer_Riding_Style) " +
            "VALUES ('" +
            trainer_name + "', '" +
            trainer_address + "', '" +
            trainer_phone_number + "', '" +
            trainer_email_address + "', '" +
            trainer_emergency_name + "', '" +
            trainer_emergency_phone_number + "', '" +
            trainer_riding_style + "');");

        // Get TID
        const QUERY_VALUES = await CON.promise().query(
            "SELECT TID " +
            "FROM Trainer " +
            "WHERE Trainer_Name = '" + trainer_name + "' AND " +
            "Trainer_Address = '" + trainer_address + "' AND " +
            "Trainer_Phone_Number = '" + trainer_phone_number + "' AND " +
            "Trainer_Email_Address = '" + trainer_email_address + "' AND " +
            "Trainer_Emergency_Name = '" + trainer_emergency_name + "' AND " +
            "Trainer_Emergency_Phone_Number = '" + trainer_emergency_phone_number + "' AND " +
            "Trainer_Riding_Style = '" + trainer_riding_style + "';");

        TID = QUERY_VALUES[0][0].TID;

        CON.query(
            "INSERT INTO Login (" +
            "Login_Email, " +
            "Login_Password, " +
            "TID, " +
            "Decomissioned) " +
            "VALUES ('" +
            trainer_email_address + "', " +
            "'P@ssw0rd', " +
            TID + ", " +
            "0);");

        // Close connection
        CON.end();
    } catch (err) {
        console.error(err);
    }

    return TID;
}

module.exports = {
    Create_Customer,
    Create_Trainer
}