/**
 * Imports
 */
const async = require('async');
const news = require("./Classes/Class_News");

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
 * @returns JSON of all news items
 */
async function Get_All_News() {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    // Query
    var result = await CON.promise().query(
        "SELECT * " +
        "FROM News;");

    // Close connection
    CON.close();

    // Pull values
    result = result[0];

    // Create empty array
    var public_news = [];

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

    return public_news;
}

/**
 * 
 * @param {*} NID 
 * @returns news image url
 */
async function Get_News_Image_URL(NID) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    // Query
    const RESULT = await CON.promise().query(
        "SELECT News_Image_URL " +
        "FROM News " +
        "WHERE NID = " + NID + ";");

    // Close connection
    CON.close();

    // Pull values
    var news_image_url = RESULT[0];

    return news_image_url;
}

/**
 * 
 * @param {*} NID 
 * @returns news title
 */
async function Get_News_Title(NID) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    // Query
    const RESULT = await CON.promise().query(
        "SELECT News_Title " +
        "FROM News " +
        "WHERE NID = " + NID + ";");

    // Close connection
    CON.close();

    // Pull values
    var news_title = RESULT[0];

    return news_title;
}

/**
 * 
 * @param {*} NID 
 * @returns news link
 */
async function Get_News_Link(NID) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    // Query
    const RESULT = await CON.promise().query(
        "SELECT News_Link " +
        "FROM News " +
        "WHERE NID = " + NID + ";");

    // Close connection
    CON.close();

    // Pull values
    var news_link = RESULT[0];

    return news_link;
}

/**
 * 
 * @param {*} NID 
 * @returns news description
 */
async function Get_News_Description(NID) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    // Query
    const RESULT = await CON.promise().query(
        "SELECT News_Description " +
        "FROM News " +
        "WHERE NID = " + NID + ";");

    // Close connection
    CON.close();

    // Pull values
    var news_description = RESULT[0];

    return news_description;
}

module.exports = {
    Get_All_News,
    Get_News_Image_URL,
    Get_News_Title,
    Get_News_Link,
    Get_News_Description
};