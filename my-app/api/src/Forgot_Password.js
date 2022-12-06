/**
 * Imports
 */
const async = require('async');
const { Notify_User_Forgot_Password } = require('./Notifications/Send_Notifications');

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


function Make_Code() {
    var code = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    var characters_length = characters.length;
    for (var i = 0; i < 16; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters_length));
    }

    return code;
}

async function Forgot_Password(user_email) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    var query_results = await CON.promise().query(
        "SELECT Login_Email " +
        "FROM Login " +
        "WHERE Login_Email = '" + user_email + "';");

    query_results = query_results[0];
    var exists = query_results[0].Login_Email;

    if (exists != undefined) {
        var code = Make_Code();

        CON.query(
            "INSERT INTO forgot_password" +
            "(Forgot_Email, Forgot_Key) " +
            "VALUES ('" +
            user_email + "', '" +
            code + "');");

        Notify_User_Forgot_Password(user_email, code);
    }

    // Close connection
    CON.end();
}

module.exports = {
    Forgot_Password
}