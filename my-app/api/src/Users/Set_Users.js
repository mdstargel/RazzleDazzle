/**
 * Imports
 */
const async = require('async');
const { Set_Appointment_Reservation } = require('../Calendar/Appointments/Set_Appointments')

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
 * @param {*} CID 
 * @param {*} customer_name 
 */
function Set_Customer_Name(CID, customer_name) {
    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        CON.query(
            "UPDATE Customer " +
            "SET Customer_Name = '" + customer_name + "' " +
            "WHERE CID = " + CID + ";"
        )

        // Close connection
        CON.end();
    } catch (err) {
        console.log(err);
    }
}

/**
 * 
 * @param {*} CID 
 * @param {*} customer_address 
 */
function Set_Customer_Address(CID, customer_address) {
    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        CON.query(
            "UPDATE Customer " +
            "SET Customer_Address = '" + customer_address + "' " +
            "WHERE CID = " + CID + ";"
        )

        // Close connection
        CON.end();
    } catch (err) {
        console.log(err);
    }
}

/**
 * 
 * @param {*} CID 
 * @param {*} customer_phone_number 
 */
function Set_Customer_Phone_Number(CID, customer_phone_number) {
    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        CON.query(
            "UPDATE Customer " +
            "SET Customer_Phone_Number = '" + customer_phone_number + "' " +
            "WHERE CID = " + CID + ";"
        )

        // Close connection
        CON.end();
    } catch (err) {
        console.log(err);
    }
}

/**
 * 
 * @param {*} CID 
 * @param {*} customer_email_address 
 */
function Set_Customer_Email_Address(CID, customer_email_address) {
    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        CON.query(
            "UPDATE Customer " +
            "SET Customer_Email_Address = '" + customer_email_address + "' " +
            "WHERE CID = " + CID + ";"
        )

        // Close connection
        CON.end();
    } catch (err) {
        console.log(err);
    }
}

/**
 * 
 * @param {*} CID 
 * @param {*} customer_emergency_name 
 */
function Set_Customer_Emergency_Name(CID, customer_emergency_name) {
    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        CON.query(
            "UPDATE Customer " +
            "SET Customer_Emergency_Name = '" + customer_emergency_name + "' " +
            "WHERE CID = " + CID + ";"
        )

        // Close connection
        CON.end();
    } catch (err) {
        console.log(err);
    }
}

/**
 * 
 * @param {*} CID 
 * @param {*} customer_emergency_phone_number 
 */
function Set_Customer_Emergency_Phone_Number(CID, customer_emergency_phone_number) {
    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        CON.query(
            "UPDATE Customer " +
            "SET Customer_Emergency_Phone_Number = '" + customer_emergency_phone_number + "' " +
            "WHERE CID = " + CID + ";"
        )

        // Close connection
        CON.end();
    } catch (err) {
        console.log(err);
    }
}

/**
 * 
 * @param {*} CID 
 * @param {*} customer_difficulty 
 */
function Set_Customer_Difficulty(CID, customer_difficulty) {
    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        CON.query(
            "UPDATE Customer " +
            "SET Customer_Difficulty = '" + customer_difficulty + "' " +
            "WHERE CID = " + CID + ";"
        )

        // Close connection
        CON.end();
    } catch (err) {
        console.log(err);
    }
}

/**
 * 
 * @param {*} CID 
 * @param {*} customer_phone_notifications 
 */
function Set_Customer_Phone_Notifications(CID, customer_phone_notifications) {
    try { // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        CON.query(
            "UPDATE Customer " +
            "SET Customer_Phone_Notifications = '" + customer_phone_notifications + "' " +
            "WHERE CID = " + CID + ";"
        )

        // Close connection
        CON.end();
    } catch (err) {
        console.log(err);
    }
}

/**
 * 
 * @param {*} CID 
 * @param {*} new_password 
 */
async function Set_Customer_Password(CID, old_password, new_password) {
    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        var query = await CON.promise().query(
            "SELECT Customer_Email_Address " +
            "FROM Customer " +
            "WHERE CID = " + CID + ";");

        var email = query[0][0].Customer_Email_Address;

        query = await CON.promise().query(
            "SELECT Login_Password " +
            "FROM Login " +
            "WHERE Login_Email = '" + email + "';");

        var old_login_password = query[0][0].Login_Password;

        if (old_login_password == old_password) {
            CON.query(
                "UPDATE Login " +
                "SET Login_Password = '" + new_password + "' " +
                "WHERE Login_Email = '" + email + "';");
        }

        // Close connection
        CON.end();
    } catch (err) {
        console.log(err);
    }
}

/**
 * 
 * @param {*} TID 
 * @param {*} trainer_name 
 */
function Set_Trainer_Name(TID, trainer_name) {
    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        CON.query(
            "UPDATE Trainer " +
            "SET Trainer_Name = '" + trainer_name + "' " +
            "WHERE TID = " + TID + ";"
        )

        // Close connection
        CON.end();
    } catch (err) {
        console.log(err);
    }
}

/**
 * 
 * @param {*} TID 
 * @param {*} trainer_address 
 */
function Set_Trainer_Address(TID, trainer_address) {
    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        CON.query(
            "UPDATE Trainer " +
            "SET Trainer_Address = '" + trainer_address + "' " +
            "WHERE TID = " + TID + ";"
        )

        // Close connection
        CON.end();
    } catch (err) {
        console.log(err);
    }
}

/**
 * 
 * @param {*} TID 
 * @param {*} trainer_phone_number 
 */
function Set_Trainer_Phone_Number(TID, trainer_phone_number) {
    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        CON.query(
            "UPDATE Trainer " +
            "SET Trainer_Phone_Number = '" + trainer_phone_number + "' " +
            "WHERE TID = " + TID + ";"
        )

        // Close connection
        CON.end();
    } catch (err) {
        console.log(err);
    }
}

/**
 * 
 * @param {*} TID 
 * @param {*} trainer_email_address 
 */
function Set_Trainer_Email_Address(TID, trainer_email_address) {
    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        CON.query(
            "UPDATE Trainer " +
            "SET Trainer_Email_Address = '" + trainer_email_address + "' " +
            "WHERE TID = " + TID + ";"
        )

        // Close connection
        CON.end();
    } catch (err) {
        console.log(err);
    }
}

/**
 * 
 * @param {*} TID 
 * @param {*} trainer_emergency_name 
 */
function Set_Trainer_Emergency_Name(TID, trainer_emergency_name) {
    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        CON.query(
            "UPDATE Trainer " +
            "SET Trainer_Emergency_Name = '" + trainer_emergency_name + "' " +
            "WHERE TID = " + TID + ";"
        )

        // Close connection
        CON.end();
    } catch (err) {
        console.log(err);
    }
}

/**
 * 
 * @param {*} TID 
 * @param {*} trainer_emergency_phone_number 
 */
function Set_Trainer_Emergency_Phone_Number(TID, trainer_emergency_phone_number) {
    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        CON.query(
            "UPDATE Trainer " +
            "SET Trainer_Emergency_Phone_Number = '" + trainer_emergency_phone_number + "' " +
            "WHERE TID = " + TID + ";"
        )

        // Close connection
        CON.end();
    } catch (err) {
        console.log(err);
    }
}

/**
 * 
 * @param {*} TID 
 * @param {*} trainer_riding_style 
 */
function Set_Trainer_Riding_Style(TID, trainer_riding_style) {
    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        CON.query(
            "UPDATE Trainer " +
            "SET Trainer_Riding_Style = '" + trainer_riding_style + "' " +
            "WHERE TID = " + TID + ";"
        )

        // Close connection
        CON.end();
    } catch (err) {
        console.log(err);
    }
}

/**
 * 
 * @param {*} TID 
 * @param {*} administrator 
 */
async function Set_Trainer_Administrator(TID, administrator) {
    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        const TRAINER_VALUES = await CON.promise().query(
            "SELECT Trainer_Email_Address " +
            "FROM Trainer " +
            "WHERE TID = " + TID + ";");

        const TRAINER_EMAIL = TRAINER_VALUES[0][0].Trainer_Email_Address;

        CON.query(
            "UPDATE Login " +
            "SET Administrator = " + administrator + " " +
            "WHERE Login_Email = '" + TRAINER_EMAIL + "';");

        // Close connection
        CON.end();
    } catch (err) {
        console.log(err);
    }
}

/**
 * 
 * @param {*} TID 
 * @param {*} new_password 
 */
async function Set_Trainer_Password(TID, old_password, new_password) {
    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        var query = await CON.promise().query(
            "SELECT Trainer_Email_Address " +
            "FROM Trainer " +
            "WHERE TID = " + TID + ";");

        var email = query[0][0].Trainer_Email_Address;

        query = await CON.promise().query(
            "SELECT Login_Password " +
            "FROM Login " +
            "WHERE Login_Email = '" + email + "';");

        var old_login_password = query[0][0].Login_Password;

        if (old_login_password == old_password) {
            CON.query(
                "UPDATE Login " +
                "SET Login_Password = '" + new_password + "' " +
                "WHERE Login_Email = '" + email + "';");
        }

        // Close connection
        CON.end();
    } catch (err) {
        console.log(err);
    }
}

/**
 * 
 * @param {*} CID 
 */
async function Delete_Customer(CID) {
    try {
        // Get Current Date
        const TODAY = new Date();
        const DD = String(TODAY.getDate()).padStart(2, '0');
        const MM = String(TODAY.getMonth() + 1).padStart(2, '0');
        const YYYY = TODAY.getFullYear();
        const CURRENT_DATE = YYYY + '-' + MM + '-' + DD;

        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        var email = await CON.promise().query(
            "SELECT Customer_Email_Address " +
            "FROM Customer " +
            "WHERE CID = " + CID + ";");

        var customer_email = email[0][0].Customer_Email_Address;
        console.log(email[0][0].Customer_Email_Address);

        await CON.promise().query(
            "UPDATE Login " +
            "SET Decomissioned = 1 " +
            "WHERE Login_Email = '" + customer_email + "';");

        console.log("UPDATE Login " +
            "SET Decomissioned = 1 " +
            "WHERE Login_Email = '" + customer_email + "';");

        var reserved_appointment_keys = await CON.promise().query(
            "SELECT AID " +
            "FROM Appointment " +
            "INNER JOIN Customer_Group " +
            "ON Appointment.Appointment_GID = Customer_Group.GID " +
            "WHERE Appointment_Date >= '" + CURRENT_DATE + "' " +
            "AND (Customer_Group.CID_1 = " + CID + " " +
            "OR Customer_Group.CID_2 = " + CID + " " +
            "OR Customer_Group.CID_3 = " + CID + " " +
            "OR Customer_Group.CID_4 = " + CID + ");");

        // Close connection
        CON.end();

        var appointment_keys = reserved_appointment_keys[0];

        for (var i = 0; i < appointment_keys.length; i++) {
            await Set_Appointment_Reservation(appointment_keys[i].AID, CID, false);
        };
    } catch (err) {
        console.log(err);
    }
}

/**
 * 
 * @param {*} TID 
 */
async function Delete_Trainer(TID) {
    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        var email = await CON.promise().query(
            "SELECT Trainer_Email_Address " +
            "FROM Trainer " +
            "WHERE TID = " + TID + ";");

    var trainer_email = email[0][0].Trainer_Email_Address;

        CON.query(
            "UPDATE Login " +
            "SET Decomissioned = 1 " +
            "WHERE Email = '" + trainer_email + "';");

        CON.query(
            "UPDATE Appointment " +
            "SET Appointment_TID_1 = NULL " +
            "WHERE Appointment_TID_1 = " + TID + ";");

        CON.query(
            "UPDATE Appointment " +
            "SET Appointment_TID_2 = NULL " +
            "WHERE Appointment_TID_2 = " + TID + ";");

        // Close connection
        CON.end();
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    Set_Customer_Name,
    Set_Customer_Address,
    Set_Customer_Phone_Number,
    Set_Customer_Email_Address,
    Set_Customer_Emergency_Name,
    Set_Customer_Emergency_Phone_Number,
    Set_Customer_Difficulty,
    Set_Customer_Phone_Notifications,
    Set_Customer_Password,
    Set_Trainer_Name,
    Set_Trainer_Address,
    Set_Trainer_Phone_Number,
    Set_Trainer_Email_Address,
    Set_Trainer_Emergency_Name,
    Set_Trainer_Emergency_Phone_Number,
    Set_Trainer_Riding_Style,
    Set_Trainer_Administrator,
    Set_Trainer_Password,
    Delete_Customer,
    Delete_Trainer
};