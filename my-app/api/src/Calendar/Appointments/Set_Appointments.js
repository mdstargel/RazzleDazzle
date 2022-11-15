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

/**
 * 
 * @param {*} AID 
 * @param {*} appointment_name 
 */
function Set_Appointment_Name(AID, appointment_name) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    CON.query(
        "UPDATE Appointment " +
        "SET Appointment_Name = '" + appointment_name + "' " +
        "WHERE AID = " + AID + ";"
    )

    // Close connection
    CON.end();
}

/**
 * 
 * @param {*} AID 
 * @param {*} appointment_date 
 */
function Set_Appointment_Date(AID, appointment_date) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    CON.query(
        "UPDATE Appointment " +
        "SET Appointment_Date = '" + appointment_date + "' " +
        "WHERE AID = " + AID + ";"
    )

    // Close connection
    CON.end();
}

/**
 * 
 * @param {*} AID 
 * @param {*} appointment_start_time 
 */
function Set_Appointment_Start_Time(AID, appointment_start_time) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    CON.query(
        "UPDATE Appointment " +
        "SET Appointment_Start_Time = '" + appointment_start_time + "' " +
        "WHERE AID = " + AID + ";"
    )

    // Close connection
    CON.end();
}

/**
 * 
 * @param {*} AID 
 * @param {*} appointment_end_time 
 */
function Set_Appointment_End_Time(AID, appointment_end_time) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    CON.query(
        "UPDATE Appointment " +
        "SET Appointment_End_Time = '" + appointment_end_time + "' " +
        "WHERE AID = " + AID + ";"
    )

    // Close connection
    CON.end();
}

/**
 * 
 * @param {*} AID 
 * @param {*} appointment_riding_style 
 */
function Set_Appointment_Riding_Style(AID, appointment_riding_style) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    CON.query(
        "UPDATE Appointment " +
        "SET Appointment_Riding_Style = '" + appointment_riding_style + "' " +
        "WHERE AID = " + AID + ";"
    )

    // Close connection
    CON.end();
}

/**
 * 
 * @param {*} AID 
 * @param {*} appointment_difficulty 
 */
function Set_Appointment_Difficulty(AID, appointment_difficulty) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    CON.query(
        "UPDATE Appointment " +
        "SET Appointment_Difficulty = '" + appointment_difficulty + "' " +
        "WHERE AID = " + AID + ";"
    )

    // Close connection
    CON.end();
}

/**
 * 
 * @param {*} AID 
 * @param {*} appointment_description 
 */
function Set_Appointment_Description(AID, appointment_description) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    CON.query(
        "UPDATE Appointment " +
        "SET Appointment_Description = '" + appointment_description + "' " +
        "WHERE AID = " + AID + ";"
    )

    // Close connection
    CON.end();
}

/**
 * 
 * @param {*} AID 
 * @param {*} appointment_public_notes 
 */
function Set_Appointment_Public_Notes(AID, appointment_public_notes) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    CON.query(
        "UPDATE Appointment " +
        "SET Appointment_Public_Notes = '" + appointment_public_notes + "' " +
        "WHERE AID = " + AID + ";"
    )

    // Close connection
    CON.end();
}

/**
 * 
 * @param {*} AID 
 * @param {*} appointment_private_notes 
 */
function Set_Appointment_Private_Notes(AID, appointment_private_notes) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    CON.query(
        "UPDATE Appointment " +
        "SET Appointment_Private_Notes = '" + appointment_private_notes + "' " +
        "WHERE AID = " + AID + ";"
    )

    // Close connection
    CON.end();
}

/**
 * 
 * @param {*} AID 
 * @param {*} appointment_group 
 */
function Set_Appointment_Group(AID, appointment_group) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    CON.query(
        "UPDATE Appointment " +
        "SET Appointment_Group = '" + appointment_group + "' " +
        "WHERE AID = " + AID + ";"
    )

    // Close connection
    CON.end();
}

/**
 * 
 * @param {*} AID 
 * @param {*} appointment_group_size 
 */
function Set_Appointment_Group_Size(AID, appointment_group_size) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    CON.query(
        "UPDATE Appointment " +
        "SET Appointment_Group_Size = '" + appointment_group_size + "' " +
        "WHERE AID = " + AID + ";"
    )

    // Close connection
    CON.end();
}

/**
 * 
 * @param {*} AID 
 * @param {*} appointment_TID_1 
 */
function Set_Appointment_TID_1(AID, appointment_TID_1) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    CON.query(
        "UPDATE Appointment " +
        "SET Appointment_TID_1 = '" + appointment_TID_1 + "' " +
        "WHERE AID = " + AID + ";"
    )

    // Close connection
    CON.end();
}

/**
 * 
 * @param {*} AID 
 * @param {*} appointment_TID_2 
 */
function Set_Appointment_TID_2(AID, appointment_TID_2) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    CON.query(
        "UPDATE Appointment " +
        "SET Appointment_TID_2 = '" + appointment_TID_2 + "' " +
        "WHERE AID = " + AID + ";"
    )

    // Close connection
    CON.end();
}

/**
 * 
 * @param {*} AID 
 * @param {*} CID 
 * @param {*} reserve 
 */
async function Set_Appointment_Reservation(AID, CID, reserve) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    if (reserve) {
        CON.query(
            "UPDATE Appointment " +
            "SET Appointment_Group_Size = Appointment_Group_Size - 1 " +
            "WHERE AID = " + AID + ";");

        var appointment_GID = await CON.promise().query(
            "SELECT Appointment_GID " +
            "FROM Appointment " +
            "WHERE AID = " + AID + ";")[0][0];

        if (appointment_GID == null) {
            CON.query(
                "INSERT INTO Customer_Group (CID_1) " +
                "VALUES (" + CID + ");")
        } else {
            var query_values = await CON.promise().query(
                "SELECT CID_2, CID_3, CID_4 " +
                "FROM Customer_Group " +
                "WHERE GID = " + appointment_GID + ";")

            var CID_2 = query_values[0][0].CID_2;
            var CID_3 = query_values[0][0].CID_3;
            var CID_4 = query_values[0][0].CID_4;

            if (CID_2 == null) {
                CON.query(
                    "UPDATE Customer_Group " +
                    "SET CID_2 = " + CID + " " +
                    "WHERE GID = " + appointment_GID + ";")
            } else if (CID_3 == null) {
                CON.query(
                    "UPDATE Customer_Group " +
                    "SET CID_3 = " + CID + " " +
                    "WHERE GID = " + appointment_GID + ";")
            } else if (CID_4 == null) {
                CON.query(
                    "UPDATE Customer_Group " +
                    "SET CID_4 = " + CID + " " +
                    "WHERE GID = " + appointment_GID + ";")
            }
        }
    } else {
        CON.query(
            "UPDATE Appointment " +
            "SET Appointment_Group_Size = Appointment_Group_Size + 1 " +
            "WHERE AID = " + AID + ";");

        var query_values = await CON.promise().query(
            "SELECT * " +
            "FROM Customer_Group " +
            "INNER JOIN Appointment " +
            "ON Customer_Group.GID = Appointment.Appointment_GID " +
            "WHERE Appointment.AID = " + AID + ";");

        var GID = query_values[0][0].GID;
        var CID_1 = query_values[0][0].CID_1;
        var CID_2 = query_values[0][0].CID_2;
        var CID_3 = query_values[0][0].CID_3;
        var CID_4 = query_values[0][0].CID_4;

        if (CID_2 == CID) {
            CON.query(
                "UPDATE Customer_Group SET CID"
            );

            // TODO: Create helper function that sorts Customer_Group
        }
    }

}

/**
 * 
 * @param {*} AID 
 * deletes appointment with AID x
 */
async function Delete_Appointment(AID) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    const GID = await CON.promise().query(
        "SELECT Appointment_GID " +
        "FROM Appointment " +
        "WHERE AID = " + AID + ";");

    const APPOINTMENT_GID = GID[0].Appointment_GID;

    if (APPOINTMENT_GID != null) {
        CON.query(
            "DELETE FROM Customer_Group " +
            "WHERE GID = " + APPOINTMENT_GID + ";");
    }

    CON.query(
        "DELETE FROM Appointment " +
        "WHERE AID = " + AID + ";");
}

module.exports = {
    Set_Appointment_Name,
    Set_Appointment_Date,
    Set_Appointment_Start_Time,
    Set_Appointment_End_Time,
    Set_Appointment_Riding_Style,
    Set_Appointment_Difficulty,
    Set_Appointment_Description,
    Set_Appointment_Public_Notes,
    Set_Appointment_Private_Notes,
    Set_Appointment_Group,
    Set_Appointment_Group_Size,
    Set_Appointment_TID_1,
    Set_Appointment_TID_2,
    Set_Appointment_Reservation,
    Delete_Appointment
};