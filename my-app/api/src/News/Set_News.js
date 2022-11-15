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
 * @param {*} news_image_url 
 * @param {*} NID 
 */
function Set_News_Image_URL(news_image_url, NID) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    // Query
    CON.query(
        "UPDATE News " +
        "SET News_Image_URL = '" + news_image_url + "' " +
        "WHERE NID = " + NID + ";");

    // Close connection
    CON.end();
}

/**
 * 
 * @param {*} news_title 
 * @param {*} NID 
 */
function Set_News_Title(news_title, NID) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    // Query
    CON.query(
        "UPDATE News " +
        "SET News_Title = '" + news_title + "' " +
        "WHERE NID = " + NID + ";");

    // Close connection
    CON.end();
}

/**
 * 
 * @param {*} news_link 
 * @param {*} NID 
 */
function Set_News_Link(news_link, NID) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    // Query
    CON.query(
        "UPDATE News " +
        "SET News_Link = '" + news_link + "' " +
        "WHERE NID = " + NID + ";");

    // Close connection
    CON.end();
}

/**
 * 
 * @param {*} news_description 
 * @param {*} NID 
 */
function Set_News_Description(news_description, NID) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    // Query
    CON.query(
        "UPDATE News " +
        "SET News_Description = '" + news_description + "' " +
        "WHERE NID = " + NID + ";");

    // Close connection
    CON.end();
}

module.exports = Set_News;