/**
 * Imports
 */
const async = require('async');
const customer = require('./Classes/Class_Customer');
const trainer = require('./Classes/Class_Trainer');
const mini_customer = require('./Classes/Class_Mini_Customer');
const mini_trainer = require('./Classes/Class_Mini_Trainer');

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
 * @returns single customer user
 */
async function Get_Customer(CID) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    // Get values
    var customer_values = await CON.promise().query(
        "SELECT Customer_Name, " +
        "Customer_Address, " +
        "Customer_Phone_Number, " +
        "Customer_Email_Address, " +
        "Customer_Emergency_Name, " +
        "Customer_Emergency_Phone_Number, " +
        "Customer_Difficulty, " +
        "Customer_Phone_Notifications " +
        "FROM Customer " +
        "WHERE CID = " + CID + ";");

    // Close connection
    CON.close();

    // Pull values
    customer_values = customer_values[0];

    // Create user
    var user = new customer(
        CID,
        customer_values.Customer_Name,
        customer_values.Customer_Address,
        customer_values.Customer_Phone_Number,
        customer_values.Customer_Email_Address,
        customer_values.Customer_Emergency_Name,
        customer_values.Customer_Emergency_Phone_Number,
        customer_values.Customer_Difficulty,
        customer_values.Customer_Phone_Notifications);

    return user;
}

/**
 * 
 * @param {*} TID 
 * @returns single trainer user
 */
async function Get_Trainer(TID) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    // Get values
    var trainer_values = await CON.promise().query(
        "SELECT Trainer_Name, " +
        "Trainer_Address, " +
        "Trainer_Phone_Number, " +
        "Trainer_Email_Address, " +
        "Trainer_Emergency_Name, " +
        "Trainer_Emergency_Phone_Number, " +
        "Trainer_Riding_Style " +
        "FROM Trainer " +
        "WHERE TID = " + TID + ";");

    // Close connection
    CON.close();

    // Pull values
    trainer_values = trainer_values[0];

    // Create user
    var user = new trainer(
        CID,
        trainer_values.Trainer_Name,
        trainer_values.Trainer_Address,
        trainer_values.Trainer_Phone_Number,
        trainer_values.Trainer_Email_Address,
        trainer_values.Trainer_Emergency_Name,
        trainer_values.Trainer_Emergency_Phone_Number,
        trainer_values.Trainer_Riding_Style);

    return user;
}

/**
 * 
 * @returns array of customers
 */
async function Get_All_Customers() {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    // Get values
    var customer_values = await CON.promise().query(
        "SELECT * " +
        "FROM Customer;");

    // Close connection
    CON.close();

    // Pull values
    customer_values = customer_values[0];

    // Create user
    var customers = [];

    for (var i = 0; i < customer_values.length; i++) {
        customers.push(
            new customer(
                customer_values[i].CID,
                customer_values[i].Customer_Name,
                customer_values[i].Customer_Address,
                customer_values[i].Customer_Phone_Number,
                customer_values[i].Customer_Email_Address,
                customer_values[i].Customer_Emergency_Name,
                customer_values[i].Customer_Emergency_Phone_Number,
                customer_values[i].Customer_Difficulty,
                customer_values[i].Customer_Phone_Notifications));

    }

    return customers;
}

/**
 * 
 * @returns array of trainers
 */
async function Get_All_Trainers() {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    // Get values
    var trainer_values = await CON.promise().query(
        "SELECT * " +
        "FROM Trainer;");

    // Close connection
    CON.close();

    // Pull values
    trainer_values = trainer_values[0];

    // Create trainers
    var trainers = [];
    for (var i = 0; i < trainer_values.length; i++) {
        trainers.push(
            new trainer(
                trainer_values[i].TID,
                trainer_values[i].Trainer_Name,
                trainer_values[i].Trainer_Address,
                trainer_values[i].Trainer_Phone_Number,
                trainer_values[i].Trainer_Email_Address,
                trainer_values[i].Trainer_Emergency_Name,
                trainer_values[i].Trainer_Emergency_Phone_Number,
                trainer_values[i].Trainer_Riding_Style));
        }

    return trainers;
}

/**
 * 
 * @returns array of mini_customers
 */
async function Get_Mini_Customers() {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    // Get values
    var customer_values = await CON.promise().query(
        "SELECT CID, " +
        "Customer_Name " +
        "FROM Customer;");

    // Close connection
    CON.close();

    // Pull values
    customer_values = customer_values[0];

    // create customers
    var customers = [];

    for (var i = 0; i < customer_values.length; i++) {
        customers.push(
            new mini_customer(
                customer_values[i].CID,
                customer_values[i].Customer_Name));
        }

    return customers;
}

/**
 * 
 * @returns array of mini_trainers
 */
async function Get_Mini_Trainers() {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    // Get values
    var trainer_values = await CON.promise().query(
        "SELECT TID, " +
        "Trainer_Name " +
        "FROM Trainer;");

    // Close connection
    CON.close();

    // Pull values
    trainer_values = trainer_values[0];

    // create trainers
    var trainers = [];

    for (var i = 0; i < trainer_values.length; i++) {
        trainers.push(
            new mini_trainer(
                trainer_values.TID,
                trainer_values.Trainer_Name));
        }

    return trainers;
}

module.exports = {
    Get_Customer,
    Get_All_Customers,
    Get_Mini_Customers,
    Get_Trainer,
    Get_All_Trainers,
    Get_Mini_Trainers
};