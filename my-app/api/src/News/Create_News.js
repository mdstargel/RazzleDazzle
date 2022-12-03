/**
 * Imports
 */
const async = require('async');
const news = require('./Classes/Class_News');



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

async function Trim_News() {
    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        do {
            var NIDs = await CON.promise().query(
                "SELECT NID " +
                "FROM News;");

            // Pull values
            NIDs = NIDs[0];
            var len = NIDs.length;

            if (len > 5) {
                await CON.promise().query(
                    "DELETE FROM News " +
                    "WHERE NID = " + NIDs[0].NID + ";");
                len--;
            }

        } while (len > 5);
    } catch (err) {
        console.error(err);
    }
}

async function Create_News(
    News_Image_URL,
    News_Title,
    News_Link,
    News_Description) {
    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        // Create news item in db
        await CON.promise().query(
            "INSERT INTO News (" +
            "News_Image_URL, " +
            "News_Title, " +
            "News_Link, " +
            "News_Description) " +
            "VALUES ('" +
            News_Image_URL + "', '" +
            News_Title + "', '" +
            News_Link + "', '" +
            News_Description + "');");

        // Find new NID
        var new_NID = await CON.promise().query(
            "SELECT NID " +
            "FROM News " +
            "WHERE " +
            "News_Image_URL = '" + News_Image_URL + "' AND " +
            "News_Title = '" + News_Title + "' AND " +
            "News_Link = '" + News_Link + "' AND " +
            "News_Description = '" + News_Description + "';"
        );

        // Close connection
        CON.end();
    } catch (err) {
        console.error(err);
    }
}

// Trim news down to 5
Trim_News();

module.exports = { Create_News };