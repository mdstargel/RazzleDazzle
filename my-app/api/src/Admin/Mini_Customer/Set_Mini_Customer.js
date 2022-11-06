/**
 * Mysql connection
 */
var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "108.213.201.29",
    user: "root",
    password: "RazzleDazzle1!",
    database: "Horse_Site",
    insecureAuth: true,
    connectTimeout: 30000
});

setDifficulty = (diff, customer_id) => {
    con.query("UPDATE Customer SET Difficulty = " + diff +
        " WHERE CID = " + customer_id);
}

con.end();