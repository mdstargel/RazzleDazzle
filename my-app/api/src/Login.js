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


async function Validate_User(login_email, login_password) {
    var user = [];

    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        var check = await CON.promise().query(
            "SELECT * " +
            "FROM Login " +
            "WHERE Login_Email = '" + login_email + "' " +
            "AND Login_Password = '" + login_password + "';");

        // Close connection
        CON.end();

        // Pull data
        check = check[0];

        var CID = check[0].CID;
        var TID = check[0].TID;
        var administrator = check[0].Administrator;
        var decomissioned = check[0].Decomissioned;

        // Create return json
        var ID;
        var type;

        if (decomissioned == 1) {
            ID = 0;
            type = 0;
        } else if (CID != null) {
            ID = CID;
            type = 1;
        } else if (TID != null) {
            ID = TID;
            if (administrator) {
                type = 3;
            } else {
                type = 2;
            }
        } else {
            ID = 0;
            type = 0;
        }

        user.push({ ID, type });
        return user;

    } catch (err) {
        console.error(err);
    }
}

module.exports = { Validate_User }