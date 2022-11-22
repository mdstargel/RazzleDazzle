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
    try { // Open connection
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
        CON.end();

        // Pull values
        customer_values = customer_values[0];

        // Create user
        var user = new customer(
            CID,
            customer_values[0].Customer_Name,
            customer_values[0].Customer_Address,
            customer_values[0].Customer_Phone_Number,
            customer_values[0].Customer_Email_Address,
            customer_values[0].Customer_Emergency_Name,
            customer_values[0].Customer_Emergency_Phone_Number,
            customer_values[0].Customer_Difficulty,
            customer_values[0].Customer_Phone_Notifications);

    } catch (err) {
        console.log(err);
        var user = new customer(
            0,
            "EMPTY",
            "EMPTY",
            "EMPTY",
            "EMPTY",
            "EMPTY",
            "EMPTY",
            "EMPTY",
            0);
    }

    return user;
}

/**
 * 
 * @param {*} TID 
 * @returns single trainer user
 */
async function Get_Trainer(TID) {
    try {
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
        CON.end();

        // Pull values
        trainer_values = trainer_values[0];

        // Create user
        var user = new trainer(
            TID,
            trainer_values[0].Trainer_Name,
            trainer_values[0].Trainer_Address,
            trainer_values[0].Trainer_Phone_Number,
            trainer_values[0].Trainer_Email_Address,
            trainer_values[0].Trainer_Emergency_Name,
            trainer_values[0].Trainer_Emergency_Phone_Number,
            trainer_values[0].Trainer_Riding_Style);

        return user;
    } catch (err) {
        console.log(err);
        var user = new trainer(
            0,
            "EMPTY",
            "EMPTY",
            "EMPTY",
            "EMPTY",
            "EMPTY",
            "EMPTY",
            "EMPTY"
        )
    }
}

/**
 * 
 * @returns array of customers
 */
async function Get_All_Customers() {
    // Create user array
    var customers = [];

    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        // Get values
        var customer_values = await CON.promise().query(
            "SELECT * " +
            "FROM Customer;");

        // Close connection
        CON.end();

        // Pull values
        customer_values = customer_values[0];



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
    } catch (err) {
        console.log(err);
    }
    return customers;
}

/**
 * 
 * @returns array of trainers
 */
async function Get_All_Trainers() {
    var trainers = [];

    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        // Get values
        var trainer_values = await CON.promise().query(
            "SELECT * " +
            "FROM Trainer " +
            "INNER JOIN Login " +
            "ON Trainer.Trainer_Email_Address = Login.Login_Email " +
            "WHERE Login.Administrator = 0;");

        // Pull data
        trainer_values = trainer_values[0];

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
                    trainer_values[i].Trainer_Riding_Style,
                    false));
        }

        trainer_values = await CON.promise().query(
            "SELECT * " +
            "FROM Trainer " +
            "INNER JOIN Login " +
            "ON Trainer.Trainer_Email_Address = Login.Login_Email " +
            "WHERE Login.Administrator = 1;");


        // Close connection
        CON.end();

        // Pull values
        trainer_values = trainer_values[0];

        // Create trainers
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
                    trainer_values[i].Trainer_Riding_Style,
                    true));
        }
    } catch (err) {
        console.log(err);
    }
    return trainers;
}

/**
 * 
 * @returns array of mini_customers
 */
async function Get_Mini_Customers() {
    // create customers
    var customers = [];

    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        // Get values
        var customer_values = await CON.promise().query(
            "SELECT CID, " +
            "Customer_Name " +
            "FROM Customer;");

        // Close connection
        CON.end();

        // Pull values
        customer_values = customer_values[0];

        for (var i = 0; i < customer_values.length; i++) {
            customers.push(
                new mini_customer(
                    customer_values[i].CID,
                    customer_values[i].Customer_Name));
        }
    } catch (err) {
        console.log(err);
    }

    return customers;
}

/**
 * 
 * @returns array of mini_trainers
 */
async function Get_Mini_Trainers() {
    // create trainers
    var trainers = [];

    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        // Get values
        var trainer_values = await CON.promise().query(
            "SELECT TID, " +
            "Trainer_Name " +
            "FROM Trainer;");

        // Close connection
        CON.end();

        // Pull values
        trainer_values = trainer_values[0];

        for (var i = 0; i < trainer_values.length; i++) {
            trainers.push(
                new mini_trainer(
                    trainer_values[0].TID,
                    trainer_values[0].Trainer_Name));
        }
    } catch (err) {
        console.log(err);
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