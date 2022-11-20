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
 * @param {*} GID 
 */
async function Sort_Customer_Group(GID) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    // Get old CID's
    var query_values = await CON.promise().query(
        "SELECT CID_1, " +
        "CID_2, " +
        "CID_3, " +
        "CID_4 " +
        "FROM Customer_Group " +
        "WHERE GID = " + GID + ";");

    // pull values
    query_values = query_values[0];
    var used_CID = [];
    used_CID.push(query_values[0].CID_1);
    used_CID.push(query_values[0].CID_2);
    used_CID.push(query_values[0].CID_3);
    used_CID.push(query_values[0].CID_4);

    // clear the row
    await CON.promise().query(
        "UPDATE Customer_Group " +
        "SET CID_1 = null, " +
        "CID_2 = null, " +
        "CID_3 = null, " +
        "CID_4 = null " +
        "WHERE GID = " + GID + ";");

    // If a value is non-empty, put it back, in order
    var CID_1_empty = true;
    var CID_2_empty = true;
    var CID_3_empty = true;
    var CID_4_empty = true;
    for (var i = 0; i < used_CID.length; i++) {
        if (used_CID[i] != null &&
            CID_1_empty) {
            await CON.promise().query(
                "UPDATE Customer_Group " +
                "SET CID_1 = " + used_CID[i] + " " +
                "WHERE GID = " + GID + ";");
            CID_1_empty = false;
        } else if (used_CID[i] != null &&
            CID_2_empty) {
            await CON.promise().query(
                "UPDATE Customer_Group " +
                "SET CID_2 = " + used_CID[i] + " " +
                "WHERE GID = " + GID + ";");
            CID_2_empty = false;
        } else if (used_CID[i] != null &&
            CID_3_empty) {
            await CON.promise().query(
                "UPDATE Customer_Group " +
                "SET CID_3 = " + used_CID[i] + " " +
                "WHERE GID = " + GID + ";");
            CID_3_empty = false;
        } else if (used_CID[i] != null &&
            CID_4_empty) {
            await CON.promise().query(
                "UPDATE Customer_Group " +
                "SET CID_4 = " + used_CID[i] + " " +
                "WHERE GID = " + GID + ";");
            CID_4_empty = false;
        }
    }

    // Close connection
    CON.end();
}

/**
 * 
 * @param {*} GID 
 */
async function Check_Customer_Group_Empty(AID, GID) {
    // Open connection
    const CON = MYSQL.createConnection(MYSQL_CONFIG);

    // Get CID's
    const QUERY_VALUES = await CON.promise().query(
        "SELECT CID_1, " +
        "CID_2, " +
        "CID_3, " +
        "CID_4 " +
        "FROM Customer_Group " +
        "WHERE GID = " + GID + ";");

    var CID_1 = QUERY_VALUES[0][0].CID_1;
    var CID_2 = QUERY_VALUES[0][0].CID_2;
    var CID_3 = QUERY_VALUES[0][0].CID_3;
    var CID_4 = QUERY_VALUES[0][0].CID_4;

    // If all values are empty, delete the row
    if (CID_1 == null &&
        CID_2 == null &&
        CID_3 == null &&
        CID_4 == null) {
        await CON.promise().query(
            "UPDATE Appointment " +
            "SET Appointment_GID = null " +
            "WHERE AID = " + AID + ";");
        await CON.promise().query(
            "DELETE FROM Customer_Group " +
            "WHERE GID = " + GID + ";");
    }

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
        // Log reservation on appointment table
        CON.query(
            "UPDATE Appointment " +
            "SET Appointment_Group_Size = Appointment_Group_Size - 1 " +
            "WHERE AID = " + AID + ";");

        // Log reservation in group
        var query_results = await CON.promise().query(
            "SELECT Appointment_GID " +
            "FROM Appointment " +
            "WHERE AID = " + AID + ";");
        query_results = query_results[0];
        appointment_GID = query_results[0].Appointment_GID;

        // If no group create group
        if (appointment_GID == null) {
            await CON.promise().query(
                "INSERT INTO Customer_Group (CID_1) " +
                "VALUES (" + CID + ");");

            // Get that GID
            var query_results = await CON.promise().query(
                "SELECT GID " +
                "FROM Customer_Group " +
                "WHERE CID_1 = " + CID + ";");

            query_results = query_results[0];
            var appointment_GID = query_results[query_results.length - 1].GID;

            // Set that GID to this appointment
            CON.query(
                "UPDATE Appointment " +
                "SET Appointment_GID = " + appointment_GID + " " +
                "WHERE AID = " + AID + ";")
        } else {
            // Find empty value and insert
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
        // log dereservation in appointment
        CON.query(
            "UPDATE Appointment " +
            "SET Appointment_Group_Size = Appointment_Group_Size + 1 " +
            "WHERE AID = " + AID + ";");

        // update group table
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

        if (CID_1 == CID) {
            CON.query(
                "UPDATE Customer_Group " +
                "SET CID_1 = null " +
                "WHERE GID = " + GID + ";");
        } else if (CID_2 == CID) {
            CON.query(
                "UPDATE Customer_Group " +
                "SET CID_1 = null " +
                "WHERE GID = " + GID + ";");
        } else if (CID_3 == CID) {
            CON.query(
                "UPDATE Customer_Group " +
                "SET CID_1 = null " +
                "WHERE GID = " + GID + ";");
        } else if (CID_4 == CID) {
            CON.query(
                "UPDATE Customer_Group " +
                "SET CID_1 = null " +
                "WHERE GID = " + GID + ";");
        }

        await Sort_Customer_Group(GID);
        Check_Customer_Group_Empty(AID, GID);
    }

    // Close connection
    CON.end();
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

    // Close connection
    CON.end();
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