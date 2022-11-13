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


async function Validate_User(login_email, login_password) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    var check = await CON.promise().query(
        "SELECT * " +
        "FROM Login " +
        "WHERE Login_Email = '" + login_email + "' " +
        "AND Login_Password = '" + login_password + "' " +
        "AND Decommissioned = 0;");

    // Close connection
    CON.close();

    // Pull data
    check = check[0];
    var CID = check.CID;
    var TID = check.TID;
    var administrator = check.Administrator;

    // Create return json
    var ID;
    var type;

    if (CID != null) {
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
        type = 0;
    }

    user = [{ ID, type }];

    return user;
}

module.exports = { Validate_User }