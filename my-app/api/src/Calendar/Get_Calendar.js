/**
 * Imports
 */
const async = require('async');
const customer_appointment = require('./Appointments/Classes/Class_Customer_Appointment');
const trainer_appointment = require('./Appointments/Classes/Class_Trainer_Appointment');
const administrator_appointment = require('./Appointments/Classes/Class_Administrator_Appointment');
const administrator_trainer_appointment = require('./Appointments/Classes/Class_Administrator_Trainer_Appointment');

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


function Get_Monday_To_Sunday(date) {
    const DATE = new Date(date);
    const MONDAY_DATE = DATE.getDate() - DATE.getDay() + 1;
    const SUNDAY_DATE = MONDAY_DATE + 6;
    const MONDAY = new Date(DATE.setDate(MONDAY_DATE));
    const SUNDAY = new Date(DATE.setDate(SUNDAY_DATE));
    const mDD = String(MONDAY.getDate()).padStart(2, '0');
    const mMM = String(MONDAY.getMonth() + 1).padStart(2, '0');
    const mYYYY = MONDAY.getFullYear();
    const MONDAY_STRING = mYYYY + '-' + mMM + '-' + mDD;
    const sDD = String(SUNDAY.getDate()).padStart(2, '0');
    const sMM = String(SUNDAY.getMonth() + 1).padStart(2, '0');
    const sYYYY = SUNDAY.getFullYear();
    const SUNDAY_STRING = sYYYY + '-' + sMM + '-' + sDD;

    const monday_sunday = [
        MONDAY_STRING,
        SUNDAY_STRING
    ];
    return monday_sunday;
}

/**
 * 
 * @param {*} CID 
 * @returns customer calendar
 */
async function Get_Customer_Calendar(CID) {
    // Create calendar
    var calendar = [];

    // Get Current Date
    const TODAY = new Date();
    const DD = String(TODAY.getDate()).padStart(2, '0');
    const MM = String(TODAY.getMonth() + 1).padStart(2, '0');
    const YYYY = TODAY.getFullYear();
    const CURRENT_DATE = YYYY + '-' + MM + '-' + DD;

    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        // Get registered appointments
        var registered_appointments = await CON.promise().query(
            "SELECT Appointment.AID, " +
            "Appointment.Appointment_Name, " +
            "Appointment.Appointment_Date, " +
            "Appointment.Appointment_Start_Time, " +
            "Appointment.Appointment_End_Time, " +
            "Appointment.Appointment_Riding_Style, " +
            "Appointment.Appointment_Description, " +
            "Appointment.Appointment_Public_Notes, " +
            "Appointment.Appointment_Group, " +
            "Appointment.Appointment_Group_Size, " +
            "Appointment.Appointment_TID_1, " +
            "Appointment.Appointment_TID_2 " +
            "FROM Appointment " +
            "INNER JOIN Customer_Group " +
            "ON Appointment.Appointment_GID = Customer_Group.GID " +
            "WHERE Customer_Group.CID_1 = " + CID + " " +
            "OR Customer_Group.CID_2 = " + CID + " " +
            "OR Customer_Group.CID_3 = " + CID + " " +
            "OR Customer_Group.CID_4 = " + CID + ";");

        // Get customer difficulty
        const DIFFICULTY = await CON.promise().query(
            "SELECT Customer_Difficulty " +
            "FROM Customer " +
            "WHERE CID = " + CID + ";");
        var customer_difficulty = DIFFICULTY[0][0].Customer_Difficulty;

        // Get open appointments
        var open_appointments = await CON.promise().query(
            "SELECT Appointment.AID, " +
            "Appointment.Appointment_Name, " +
            "Appointment.Appointment_Date, " +
            "Appointment.Appointment_Start_Time, " +
            "Appointment.Appointment_End_Time, " +
            "Appointment.Appointment_Riding_Style, " +
            "Appointment.Appointment_Description, " +
            "Appointment.Appointment_Public_Notes, " +
            "Appointment.Appointment_Group, " +
            "Appointment.Appointment_Group_Size, " +
            "Appointment.Appointment_TID_1, " +
            "Appointment.Appointment_TID_2, " +
            "Appointment.Appointment_GID " +
            "FROM Appointment " +
            "WHERE Appointment.Appointment_Difficulty = '" + customer_difficulty + "' " +
            "AND Appointment.Appointment_Group_Size > 0 " +
            "AND Appointment.Appointment_Date > '" + CURRENT_DATE + "';");

        var query_results = await CON.promise().query(
            "SELECT GID " +
            "FROM Customer_Group " +
            "WHERE CID_1 = " + CID + " " +
            "OR CID_2 = " + CID + " " +
            "OR CID_3 = " + CID + " " +
            "OR CID_4 = " + CID + ";");

        // Close connection
        CON.end();

        // Pull values
        registered_appointments = registered_appointments[0];
        open_appointments = open_appointments[0];
        var registrations = query_results[0];

        // Add registered appointments to calendar
        for (var i = 0; i < registered_appointments.length; i++) {
            calendar.push(
                new customer_appointment(
                    registered_appointments[i].AID,
                    registered_appointments[i].Appointment_Name,
                    registered_appointments[i].Appointment_Date,
                    registered_appointments[i].Appointment_Start_Time,
                    registered_appointments[i].Appointment_End_Time,
                    registered_appointments[i].Appointment_Riding_Style,
                    registered_appointments[i].Appointment_Description,
                    registered_appointments[i].Appointment_Public_Notes,
                    registered_appointments[i].Appointment_Group,
                    registered_appointments[i].Appointment_Group_Size,
                    registered_appointments[i].Appointment_TID_1,
                    registered_appointments[i].Appointment_TID_2,
                    true)
            );
        };

        // Add open appointments to calendar
        var registered;
        for (var i = 0; i < open_appointments.length; i++) {

            // Assume open appointment isnt registered to customer
            registered = false;

            // If no group, not registered, add
            if (open_appointments[i].Appointment_GID == null) {
                calendar.push(
                    new customer_appointment(
                        open_appointments[i].AID,
                        open_appointments[i].Appointment_Name,
                        open_appointments[i].Appointment_Date,
                        open_appointments[i].Appointment_Start_Time,
                        open_appointments[i].Appointment_End_Time,
                        open_appointments[i].Appointment_Riding_Style,
                        open_appointments[i].Appointment_Description,
                        open_appointments[i].Appointment_Public_Notes,
                        open_appointments[i].Appointment_Group,
                        open_appointments[i].Appointment_Group_Size,
                        open_appointments[i].Appointment_TID_1,
                        open_appointments[i].Appointment_TID_2,
                        false)
                );

                // If group, check registered
            } else {
                // Cycle through all groups customer in. If match then registered
                for (var j = 0; j < registrations.length; j++) {
                    if (open_appointments[i].Appointment_GID ==
                        registrations[j].GID) {
                        registered = true;
                    }

                    // If not registered
                    if (!registered) {
                        calendar.push(
                            new customer_appointment(
                                open_appointments[i].AID,
                                open_appointments[i].Appointment_Name,
                                open_appointments[i].Appointment_Date,
                                open_appointments[i].Appointment_Start_Time,
                                open_appointments[i].Appointment_End_Time,
                                open_appointments[i].Appointment_Riding_Style,
                                open_appointments[i].Appointment_Description,
                                open_appointments[i].Appointment_Public_Notes,
                                open_appointments[i].Appointment_Group,
                                open_appointments[i].Appointment_Group_Size,
                                open_appointments[i].Appointment_TID_1,
                                open_appointments[i].Appointment_TID_2,
                                false)
                        );
                    }
                }
            }
        };
    } catch (err) {
        console.error(err)
    }

    return calendar;
}

/**
 * 
 * @param {*} CID 
 * @param {*} date 
 * @returns calendar for week of given date
 */
async function Get_Customer_Week_Calendar(CID, date) {
    // Create calendar
    var calendar = [];

    // Get Current Date
    const TODAY = new Date();
    const DD = String(TODAY.getDate()).padStart(2, '0');
    const MM = String(TODAY.getMonth() + 1).padStart(2, '0');
    const YYYY = TODAY.getFullYear();
    const CURRENT_DATE = YYYY + '-' + MM + '-' + DD;

    // Get Current Week
    const NEW_DATE = new Date(date);
    const MONDAY_SUNDAY = Get_Monday_To_Sunday(NEW_DATE);
    const FIRST_DATE = MONDAY_SUNDAY[0];
    const LAST_DATE = MONDAY_SUNDAY[1];

    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        // Get registered appointments
        var registered_appointments = await CON.promise().query(
            "SELECT Appointment.AID, " +
            "Appointment.Appointment_Name, " +
            "Appointment.Appointment_Date, " +
            "Appointment.Appointment_Start_Time, " +
            "Appointment.Appointment_End_Time, " +
            "Appointment.Appointment_Riding_Style, " +
            "Appointment.Appointment_Description, " +
            "Appointment.Appointment_Public_Notes, " +
            "Appointment.Appointment_Group, " +
            "Appointment.Appointment_Group_Size, " +
            "Appointment.Appointment_TID_1, " +
            "Appointment.Appointment_TID_2 " +
            "FROM Appointment " +
            "INNER JOIN Customer_Group " +
            "ON Appointment.Appointment_GID = Customer_Group.GID " +
            "WHERE Appointment.Appointment_Date >= '" + FIRST_DATE + "' " +
            "AND Appointment.Appointment_Date <= '" + LAST_DATE + "' " +
            "AND (Customer_Group.CID_1 = " + CID + " " +
            "OR Customer_Group.CID_2 = " + CID + " " +
            "OR Customer_Group.CID_3 = " + CID + " " +
            "OR Customer_Group.CID_4 = " + CID + ");");

        // Get customer difficulty
        const DIFFICULTY = await CON.promise().query(
            "SELECT Customer_Difficulty " +
            "FROM Customer " +
            "WHERE CID = " + CID + ";");
        var customer_difficulty = DIFFICULTY[0][0].Customer_Difficulty;

        // Get open appointments
        var open_appointments = await CON.promise().query(
            "SELECT Appointment.AID, " +
            "Appointment.Appointment_Name, " +
            "Appointment.Appointment_Date, " +
            "Appointment.Appointment_Start_Time, " +
            "Appointment.Appointment_End_Time, " +
            "Appointment.Appointment_Riding_Style, " +
            "Appointment.Appointment_Description, " +
            "Appointment.Appointment_Public_Notes, " +
            "Appointment.Appointment_Group, " +
            "Appointment.Appointment_Group_Size, " +
            "Appointment.Appointment_TID_1, " +
            "Appointment.Appointment_TID_2, " +
            "Appointment.Appointment_GID " +
            "FROM Appointment " +
            "WHERE Appointment.Appointment_Difficulty = '" + customer_difficulty + "' " +
            "AND Appointment.Appointment_Group_Size > 0 " +
            "AND Appointment.Appointment_Date >= '" + FIRST_DATE + "' " +
            "AND Appointment.Appointment_Date <= '" + LAST_DATE + "' " +
            "AND Appointment.Appointment_Date > '" + CURRENT_DATE + "';");

        var query_results = await CON.promise().query(
            "SELECT GID " +
            "FROM Customer_Group " +
            "WHERE CID_1 = " + CID + " " +
            "OR CID_2 = " + CID + " " +
            "OR CID_3 = " + CID + " " +
            "OR CID_4 = " + CID + ";");

        // Close connection
        CON.end();

        // Pull values
        registered_appointments = registered_appointments[0];
        open_appointments = open_appointments[0];
        var registrations = query_results[0];

        // Add registered appointments to calendar
        for (var i = 0; i < registered_appointments.length; i++) {
            calendar.push(
                new customer_appointment(
                    registered_appointments[i].AID,
                    registered_appointments[i].Appointment_Name,
                    registered_appointments[i].Appointment_Date,
                    registered_appointments[i].Appointment_Start_Time,
                    registered_appointments[i].Appointment_End_Time,
                    registered_appointments[i].Appointment_Riding_Style,
                    registered_appointments[i].Appointment_Description,
                    registered_appointments[i].Appointment_Public_Notes,
                    registered_appointments[i].Appointment_Group,
                    registered_appointments[i].Appointment_Group_Size,
                    registered_appointments[i].Appointment_TID_1,
                    registered_appointments[i].Appointment_TID_2,
                    true)
            );
        };

        // Add open appointments to calendar
        var registered;
        for (var i = 0; i < open_appointments.length; i++) {

            // Assume open appointment isnt registered to customer
            registered = false;

            // If no group, not registered, add
            if (open_appointments[i].Appointment_GID == null) {
                calendar.push(
                    new customer_appointment(
                        open_appointments[i].AID,
                        open_appointments[i].Appointment_Name,
                        open_appointments[i].Appointment_Date,
                        open_appointments[i].Appointment_Start_Time,
                        open_appointments[i].Appointment_End_Time,
                        open_appointments[i].Appointment_Riding_Style,
                        open_appointments[i].Appointment_Description,
                        open_appointments[i].Appointment_Public_Notes,
                        open_appointments[i].Appointment_Group,
                        open_appointments[i].Appointment_Group_Size,
                        open_appointments[i].Appointment_TID_1,
                        open_appointments[i].Appointment_TID_2,
                        false)
                );

                // If group, check registered
            } else {
                // Cycle through all groups customer in. If match then registered
                for (var j = 0; j < registrations.length; j++) {
                    if (open_appointments[i].Appointment_GID ==
                        registrations[j].GID) {
                        registered = true;
                    }

                    // If not registered
                    if (!registered) {
                        calendar.push(
                            new customer_appointment(
                                open_appointments[i].AID,
                                open_appointments[i].Appointment_Name,
                                open_appointments[i].Appointment_Date,
                                open_appointments[i].Appointment_Start_Time,
                                open_appointments[i].Appointment_End_Time,
                                open_appointments[i].Appointment_Riding_Style,
                                open_appointments[i].Appointment_Description,
                                open_appointments[i].Appointment_Public_Notes,
                                open_appointments[i].Appointment_Group,
                                open_appointments[i].Appointment_Group_Size,
                                open_appointments[i].Appointment_TID_1,
                                open_appointments[i].Appointment_TID_2,
                                false)
                        );
                    }
                }
            }
        };
    } catch (err) {
        console.error(err)
    }

    return calendar;
}

/**
 * 
 * @param {*} CID 
 * @param {*} date 
 * @returns calendar for selected date
 */
async function Get_Customer_Day_Calendar(CID, date) {
    // Create calendar
    var calendar = [];

    // Get Current Date
    const TODAY = new Date();
    const DD = String(TODAY.getDate()).padStart(2, '0');
    const MM = String(TODAY.getMonth() + 1).padStart(2, '0');
    const YYYY = TODAY.getFullYear();
    const CURRENT_DATE = YYYY + '-' + MM + '-' + DD;

    // Get Date given
    const NEW_DATE = new Date(date);
    const DATE_DD = String(NEW_DATE.getDate()).padStart(2, '0');
    const DATE_MM = String(NEW_DATE.getMonth() + 1).padStart(2, '0');
    const DATE_YYYY = NEW_DATE.getFullYear();
    const DATE = DATE_YYYY + '-' + DATE_MM + '-' + DATE_DD;

    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        // Get registered appointments
        var registered_appointments = await CON.promise().query(
            "SELECT Appointment.AID, " +
            "Appointment.Appointment_Name, " +
            "Appointment.Appointment_Date, " +
            "Appointment.Appointment_Start_Time, " +
            "Appointment.Appointment_End_Time, " +
            "Appointment.Appointment_Riding_Style, " +
            "Appointment.Appointment_Description, " +
            "Appointment.Appointment_Public_Notes, " +
            "Appointment.Appointment_Group, " +
            "Appointment.Appointment_Group_Size, " +
            "Appointment.Appointment_TID_1, " +
            "Appointment.Appointment_TID_2 " +
            "FROM Appointment " +
            "INNER JOIN Customer_Group " +
            "ON Appointment.Appointment_GID = Customer_Group.GID " +
            "WHERE Appointment.Appointment_Date = '" + DATE + "' " +
            "AND (Customer_Group.CID_1 = " + CID + " " +
            "OR Customer_Group.CID_2 = " + CID + " " +
            "OR Customer_Group.CID_3 = " + CID + " " +
            "OR Customer_Group.CID_4 = " + CID + ");");

        // Get customer difficulty
        const DIFFICULTY = await CON.promise().query(
            "SELECT Customer_Difficulty " +
            "FROM Customer " +
            "WHERE CID = " + CID + ";");
        var customer_difficulty = DIFFICULTY[0][0].Customer_Difficulty;

        // Get open appointments
        var open_appointments = await CON.promise().query(
            "SELECT Appointment.AID, " +
            "Appointment.Appointment_Name, " +
            "Appointment.Appointment_Date, " +
            "Appointment.Appointment_Start_Time, " +
            "Appointment.Appointment_End_Time, " +
            "Appointment.Appointment_Riding_Style, " +
            "Appointment.Appointment_Description, " +
            "Appointment.Appointment_Public_Notes, " +
            "Appointment.Appointment_Group, " +
            "Appointment.Appointment_Group_Size, " +
            "Appointment.Appointment_TID_1, " +
            "Appointment.Appointment_TID_2, " +
            "Appointment.Appointment_GID " +
            "FROM Appointment " +
            "WHERE Appointment.Appointment_Difficulty = '" + customer_difficulty + "' " +
            "AND Appointment.Appointment_Group_Size > 0 " +
            "AND Appointment.Appointment_Date = '" + DATE + "' " +
            "AND Appointment.Appointment_Date > '" + CURRENT_DATE + "';");

        var query_results = await CON.promise().query(
            "SELECT GID " +
            "FROM Customer_Group " +
            "WHERE CID_1 = " + CID + " " +
            "OR CID_2 = " + CID + " " +
            "OR CID_3 = " + CID + " " +
            "OR CID_4 = " + CID + ";");

        // Close connection
        CON.end();

        // Pull values
        registered_appointments = registered_appointments[0];
        open_appointments = open_appointments[0];
        var registrations = query_results[0];

        // Add registered appointments to calendar
        for (var i = 0; i < registered_appointments.length; i++) {
            calendar.push(
                new customer_appointment(
                    registered_appointments[i].AID,
                    registered_appointments[i].Appointment_Name,
                    registered_appointments[i].Appointment_Date,
                    registered_appointments[i].Appointment_Start_Time,
                    registered_appointments[i].Appointment_End_Time,
                    registered_appointments[i].Appointment_Riding_Style,
                    registered_appointments[i].Appointment_Description,
                    registered_appointments[i].Appointment_Public_Notes,
                    registered_appointments[i].Appointment_Group,
                    registered_appointments[i].Appointment_Group_Size,
                    registered_appointments[i].Appointment_TID_1,
                    registered_appointments[i].Appointment_TID_2,
                    true)
            );
        };

        // Add open appointments to calendar
        var registered;
        for (var i = 0; i < open_appointments.length; i++) {

            // Assume open appointment isnt registered to customer
            registered = false;

            // If no group, not registered, add
            if (open_appointments[i].Appointment_GID == null) {
                calendar.push(
                    new customer_appointment(
                        open_appointments[i].AID,
                        open_appointments[i].Appointment_Name,
                        open_appointments[i].Appointment_Date,
                        open_appointments[i].Appointment_Start_Time,
                        open_appointments[i].Appointment_End_Time,
                        open_appointments[i].Appointment_Riding_Style,
                        open_appointments[i].Appointment_Description,
                        open_appointments[i].Appointment_Public_Notes,
                        open_appointments[i].Appointment_Group,
                        open_appointments[i].Appointment_Group_Size,
                        open_appointments[i].Appointment_TID_1,
                        open_appointments[i].Appointment_TID_2,
                        false)
                );

                // If group, check registered
            } else {
                // Cycle through all groups customer in. If match then registered
                for (var j = 0; j < registrations.length; j++) {
                    if (open_appointments[i].Appointment_GID ==
                        registrations[j].GID) {
                        registered = true;
                    }

                    // If not registered
                    if (!registered) {
                        calendar.push(
                            new customer_appointment(
                                open_appointments[i].AID,
                                open_appointments[i].Appointment_Name,
                                open_appointments[i].Appointment_Date,
                                open_appointments[i].Appointment_Start_Time,
                                open_appointments[i].Appointment_End_Time,
                                open_appointments[i].Appointment_Riding_Style,
                                open_appointments[i].Appointment_Description,
                                open_appointments[i].Appointment_Public_Notes,
                                open_appointments[i].Appointment_Group,
                                open_appointments[i].Appointment_Group_Size,
                                open_appointments[i].Appointment_TID_1,
                                open_appointments[i].Appointment_TID_2,
                                false)
                        );
                    }
                }
            }
        };
    } catch (err) {
        console.error(err)
    }

    return calendar;
}

/**
 * 
 * @param {*} TID 
 * @returns trainer calendar
 */
async function Get_Trainer_Calendar(TID) {
    // Create calendar
    var calendar = [];

    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        // Get assigned appointments
        var assigned_appointments = await CON.promise().query(
            "SELECT AID, " +
            "Appointment_Name, " +
            "Appointment_Date, " +
            "Appointment_Start_Time, " +
            "Appointment_End_Time, " +
            "Appointment_Riding_Style, " +
            "Appointment_Description, " +
            "Appointment_Public_Notes, " +
            "Appointment_Private_Notes, " +
            "Appointment_Group, " +
            "Appointment_Group_Size " +
            "Appointment_GID " +
            "FROM Appointment " +
            "WHERE Appointment_TID_1 = " + TID + " " +
            "OR Appointment_TID_2 = " + TID + ";");

        // Close connection
        CON.end();

        // Pull values
        assigned_appointments = assigned_appointments[0];

        // Add assigned appointments to calendar
        for (var i = 0; i < assigned_appointments.length; i++) {
            calendar.push(
                new trainer_appointment(
                    assigned_appointments[i].AID,
                    assigned_appointments[i].Appointment_Name,
                    assigned_appointments[i].Appointment_Date,
                    assigned_appointments[i].Appointment_Start_Time,
                    assigned_appointments[i].Appointment_End_Time,
                    assigned_appointments[i].Appointment_Riding_Style,
                    assigned_appointments[i].Appointment_Description,
                    assigned_appointments[i].Appointment_Public_Notes,
                    assigned_appointments[i].Appointment_Private_Notes,
                    assigned_appointments[i].Appointment_Group,
                    assigned_appointments[i].Appointment_Group_Size,
                    assigned_appointments[i].Appointment_GID)
            );
        };
    } catch (err) {
        console.error(err);
    }

    return calendar;
}

/**
 * 
 * @param {*} TID 
 * @param {*} date 
 * @returns calendar for the week of the selected date
 */
async function Get_Trainer_Week_Calendar(TID, date) {
    // Create calendar
    var calendar = [];

    // Get Current Week
    const NEW_DATE = new Date(date);
    const MONDAY_SUNDAY = Get_Monday_To_Sunday(NEW_DATE);
    const FIRST_DATE = MONDAY_SUNDAY[0];
    const LAST_DATE = MONDAY_SUNDAY[1];

    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        // Get assigned appointments
        var assigned_appointments = await CON.promise().query(
            "SELECT AID, " +
            "Appointment_Name, " +
            "Appointment_Date, " +
            "Appointment_Start_Time, " +
            "Appointment_End_Time, " +
            "Appointment_Riding_Style, " +
            "Appointment_Description, " +
            "Appointment_Public_Notes, " +
            "Appointment_Private_Notes, " +
            "Appointment_Group, " +
            "Appointment_Group_Size " +
            "Appointment_GID " +
            "FROM Appointment " +
            "WHERE Appointment.Appointment_Date >= '" + FIRST_DATE + "' " +
            "AND Appointment.Appointment_Date <= '" + LAST_DATE + "' " +
            "AND (Appointment_TID_1 = " + TID + " " +
            "OR Appointment_TID_2 = " + TID + ");");

        // Close connection
        CON.end();

        // Pull values
        assigned_appointments = assigned_appointments[0];

        // Add assigned appointments to calendar
        for (var i = 0; i < assigned_appointments.length; i++) {
            calendar.push(
                new trainer_appointment(
                    assigned_appointments[i].AID,
                    assigned_appointments[i].Appointment_Name,
                    assigned_appointments[i].Appointment_Date,
                    assigned_appointments[i].Appointment_Start_Time,
                    assigned_appointments[i].Appointment_End_Time,
                    assigned_appointments[i].Appointment_Riding_Style,
                    assigned_appointments[i].Appointment_Description,
                    assigned_appointments[i].Appointment_Public_Notes,
                    assigned_appointments[i].Appointment_Private_Notes,
                    assigned_appointments[i].Appointment_Group,
                    assigned_appointments[i].Appointment_Group_Size,
                    assigned_appointments[i].Appointment_GID)
            );
        };
    } catch (err) {
        console.error(err);
    }

    return calendar;
}

/**
 * 
 * @param {*} TID 
 * @param {*} date 
 * @returns Calendar for the day selected
 */
async function Get_Trainer_Day_Calendar(TID, date) {
    // Create calendar
    var calendar = [];

    // Get Date given
    const NEW_DATE = new Date(date);
    const DATE_DD = String(NEW_DATE.getDate()).padStart(2, '0');
    const DATE_MM = String(NEW_DATE.getMonth() + 1).padStart(2, '0');
    const DATE_YYYY = NEW_DATE.getFullYear();
    const DATE = DATE_YYYY + '-' + DATE_MM + '-' + DATE_DD;

    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        // Get assigned appointments
        var assigned_appointments = await CON.promise().query(
            "SELECT AID, " +
            "Appointment_Name, " +
            "Appointment_Date, " +
            "Appointment_Start_Time, " +
            "Appointment_End_Time, " +
            "Appointment_Riding_Style, " +
            "Appointment_Description, " +
            "Appointment_Public_Notes, " +
            "Appointment_Private_Notes, " +
            "Appointment_Group, " +
            "Appointment_Group_Size " +
            "Appointment_GID " +
            "FROM Appointment " +
            "WHERE Appointment_Date = '" + DATE + "' " +
            "AND (Appointment_TID_1 = " + TID + " " +
            "OR Appointment_TID_2 = " + TID + ");");

        // Close connection
        CON.end();

        // Pull values
        assigned_appointments = assigned_appointments[0];

        // Add assigned appointments to calendar
        for (var i = 0; i < assigned_appointments.length; i++) {
            calendar.push(
                new trainer_appointment(
                    assigned_appointments[i].AID,
                    assigned_appointments[i].Appointment_Name,
                    assigned_appointments[i].Appointment_Date,
                    assigned_appointments[i].Appointment_Start_Time,
                    assigned_appointments[i].Appointment_End_Time,
                    assigned_appointments[i].Appointment_Riding_Style,
                    assigned_appointments[i].Appointment_Description,
                    assigned_appointments[i].Appointment_Public_Notes,
                    assigned_appointments[i].Appointment_Private_Notes,
                    assigned_appointments[i].Appointment_Group,
                    assigned_appointments[i].Appointment_Group_Size,
                    assigned_appointments[i].Appointment_GID)
            );
        };
    } catch (err) {
        console.error(err);
    }

    return calendar;
}

/**
 * 
 * @returns administrator calendar
 */
async function Get_Administrator_Calendar() {
    // Create calendar
    var calendar = [];

    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        // Get all appointments
        var appointments = await CON.promise().query(
            "SELECT * " +
            "FROM Appointment;");

        // Close connection
        CON.end();

        // Pull values
        appointments = appointments[0];

        // Add all appointments to calendar
        for (var i = 0; i < appointments.length; i++) {
            calendar.push(
                new administrator_appointment(
                    appointments[i].AID,
                    appointments[i].Appointment_Name,
                    appointments[i].Appointment_Date,
                    appointments[i].Appointment_Start_Time,
                    appointments[i].Appointment_End_Time,
                    appointments[i].Appointment_Riding_Style,
                    appointments[i].Appointment_Difficulty,
                    appointments[i].Appointment_Description,
                    appointments[i].Appointment_Public_Notes,
                    appointments[i].Appointment_Private_Notes,
                    appointments[i].Appointment_Group,
                    appointments[i].Appointment_Group_Size,
                    appointments[i].Appointment_TID_1,
                    appointments[i].Appointment_TID_2,
                    appointments[i].Appointment_GID)
            );
        };
    } catch (err) {
        console.error(err);
    }

    return calendar;
}


async function Get_Administrator_Week_Calendar(date) {
    // Create calendar
    var calendar = [];

    // Get Current Week
    const NEW_DATE = new Date(date);
    const MONDAY_SUNDAY = Get_Monday_To_Sunday(NEW_DATE);
    const FIRST_DATE = MONDAY_SUNDAY[0];
    const LAST_DATE = MONDAY_SUNDAY[1];

    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        // Get assigned appointments
        var assigned_appointments = await CON.promise().query(
            "SELECT Appointment.AID, " +
            "Appointment.Appointment_Name, " +
            "Appointment.Appointment_Date, " +
            "Appointment.Appointment_Start_Time, " +
            "Appointment.Appointment_End_Time, " +
            "Appointment.Appointment_Riding_Style, " +
            "Appointment.Appointment_Description, " +
            "Appointment.Appointment_Public_Notes, " +
            "Appointment.Appointment_Private_Notes, " +
            "Appointment.Appointment_Group, " +
            "Appointment.Appointment_Group_Size, " +
            "Appointment.Appointment_GID, " +
            "Appointment.Appointment_TID_1 " +
            "FROM Appointment " +
            "INNER JOIN Trainer " +
            "ON Trainer.TID = Appointment.TID_1 " +
            "WHERE Appointment.Appointment_Date >= '" + FIRST_DATE + "' " +
            "AND Appointment.Appointment_Date <= '" + LAST_DATE + "');");

        // Close connection
        CON.end();

        // Pull values
        assigned_appointments = assigned_appointments[0];
        query_values = query_values[0];

        // Add assigned appointments to calendar
        for (var i = 0; i < assigned_appointments.length; i++) {
            calendar.push(
                new administrator_trainer_appointment(
                    assigned_appointments[i].AID,
                    assigned_appointments[i].Appointment_Name,
                    assigned_appointments[i].Appointment_Date,
                    assigned_appointments[i].Appointment_Start_Time,
                    assigned_appointments[i].Appointment_End_Time,
                    assigned_appointments[i].Appointment_Riding_Style,
                    assigned_appointments[i].Appointment_Description,
                    assigned_appointments[i].Appointment_Public_Notes,
                    assigned_appointments[i].Appointment_Private_Notes,
                    assigned_appointments[i].Appointment_Group,
                    assigned_appointments[i].Appointment_Group_Size,
                    assigned_appointments[i].Appointment_GID,
                    assigned_appointments[i].Trainer_Name)
            );
        };
    } catch (err) {
        console.error(err);
    }

    return calendar;
}

/**
 * 
 * @param {*} date 
 * @returns day calendar
 */
async function Get_Administrator_Day_Calendar(date) {
    // Create calendar
    var calendar = [];

    // Get Date given
    const NEW_DATE = new Date(date);
    const DATE_DD = String(NEW_DATE.getDate()).padStart(2, '0');
    const DATE_MM = String(NEW_DATE.getMonth() + 1).padStart(2, '0');
    const DATE_YYYY = NEW_DATE.getFullYear();
    const DATE = DATE_YYYY + '-' + DATE_MM + '-' + DATE_DD;

    try {
        // Open connection
        const CON = MYSQL.createConnection(MYSQL_CONFIG);

        // Get all appointments
        var appointments = await CON.promise().query(
            "SELECT * " +
            "FROM Appointment " +
            "WHERE Appointment_Date = '" + DATE + "';");

        // Close connection
        CON.end();

        // Pull values
        appointments = appointments[0];

        // Add all appointments to calendar
        for (var i = 0; i < appointments.length; i++) {
            calendar.push(
                new administrator_appointment(
                    appointments[i].AID,
                    appointments[i].Appointment_Name,
                    appointments[i].Appointment_Date,
                    appointments[i].Appointment_Start_Time,
                    appointments[i].Appointment_End_Time,
                    appointments[i].Appointment_Riding_Style,
                    appointments[i].Appointment_Difficulty,
                    appointments[i].Appointment_Description,
                    appointments[i].Appointment_Public_Notes,
                    appointments[i].Appointment_Private_Notes,
                    appointments[i].Appointment_Group,
                    appointments[i].Appointment_Group_Size,
                    appointments[i].Appointment_TID_1,
                    appointments[i].Appointment_TID_2,
                    appointments[i].Appointment_GID)
            );
        };
    } catch (err) {
        console.error(err);
    }

    return calendar;
}

module.exports = {
    Get_Customer_Calendar,
    Get_Customer_Week_Calendar,
    Get_Customer_Day_Calendar,
    Get_Trainer_Calendar,
    Get_Trainer_Week_Calendar,
    Get_Trainer_Day_Calendar,
    Get_Administrator_Calendar,
    Get_Administrator_Day_Calendar,
    Get_Administrator_Week_Calendar
}