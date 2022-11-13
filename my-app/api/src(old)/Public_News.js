const express = require('express');
const app = express();
app.use(express.json());

/**
 * Imports
 */
const async = require('async');
let { news } = require("./News/Class_News");

/**
 * Mysql connection
 */
const mysql = require('mysql2');

const mysql_config = {
    host: "localhost",
    user: "root",
    password: "B311ao2l2",
    database: "Horse_Site",
    insecureAuth: true,
    connectTimeout: 30000
};

/**
 * 
 * @returns JSON of all news items
 */
async function GetAllNews() {
    // Open connection
    const con = mysql.createConnection(mysql_config);

    // Create empty array
    var public_news = [];

    // Query
    var result = await con.promise().query(
        "SELECT * " +
        " FROM News;");

    // Pull values
    result = result[0];

    // Add news objects
    for (var i = 0; i < result.length; i++) {
        public_news.push(
            new news(
                result[i].NID,
                result[i].News_Image_URL,
                result[i].News_Title,
                result[i].News_Link,
                result[i].News_Description));
    }

    con.end();

    return public_news;
}

app.get('/Public_News', async(req, res) => {
    var public_news = await GetAllNews();
    res.send(public_news);
})

module.exports = app;