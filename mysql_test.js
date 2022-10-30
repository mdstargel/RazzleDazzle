// Variables for connection
var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "108.213.201.29",
    user: "root",
    password: "RazzleDazzle1!",
    insecureAuth: true,
    connectTimeout: 30000
});

con.connect(function(err) {
    if (err) throw err;
})

/**
 * Customer Appointment Class. Class consists of:
 * Int          Appointment Key
 * String       Name
 * String       Date
 * String       Time
 * String       Description
 * String       Public Notes
 * Int          Group Size
 * Bool         Reserved (Y/N)
 */
class customer_appt {
    // Constructor
    constructor(appt_key, appt_name, appt_date, appt_time,
        appt_description, appt_pub_notes, appt_group_size, appt_reserved) {
        this.appt_key = appt_key;
        this.appt_name = appt_name;
        this.appt_date = appt_date;
        this.appt_time = appt_time;
        this.appt_description = appt_description;
        this.appt_pub_notes = appt_pub_notes;
        this.appt_group_size = appt_group_size;
        this.appt_reserved = appt_reserved;
    }

    // Getters
    getName() {
        return this.appt_name;
    }

    getDate() {
        return this.appt_date;
    }

    getTime() {
        return this.appt_time;
    }

    getDescription() {
        return this.appt_description;
    }

    getPublicNotes() {
        return this.appt_pub_notes;
    }

    getGroupSize() {
        return this.appt_group_size;
    }

    getReserved() {
        return this.appt_reserved;
    }

    // Setters
    setReserved(reserve) {
        this.appt_reserved = reserve;
        // If set reserved to true, reduce available group size (also in DB)
        if (reserve) {
            this.appt_group_size--;
            con.query("UPDATE Appointment SET Size = Size - 1 WHERE Key = " +
                this.appt_key + ";",
                function(err) {
                    if (err) throw err;
                });
        }

        // If set reserved to false, reduce available group size (also in DB)
        else if (!reserve) {
            this.appt_group_size++;
            con.query("UPDATE Appointment SET Size = Size + 1 WHERE Key = " +
                this.appt_key + ";",
                function(err) {
                    if (err) throw err;
                });
        }
    }
}

/**
 * Customer Class. Class consists of:
 * Customer ID
 * Name
 * Address
 * Phone Number
 * Email Address
 * Emergency Contact Name
 * Emergency Contact Phone Number
 * Phone Notifications (Y/N)
 * Calendar
 */
class customer {
    // Constructor
    constructor(customer_id) {
        // Get key at creation
        this.customer_id = customer_id;

        // Query simple values from Database
        con.query("SELECT Name, Address, Phone_Num, Email_Addr, Emer_Name, " +
            "Emer_Num, Difficutly, Phone_Notif FROM Customer WHERE CID = " +
            this.customer_id + ";",
            function(err, result) {
                if (err) throw err;
                cust_name = result[0].Name;
                address = result[0].Address;
                phone = result[0].Phone_Num;
                email = result[0].Email_Addr;
                emer_name = result[0].Emer_Name;
                emer_num = result[0].Emer_Num;
                difficulty = result[0].Difficulty;
                phone_notif = result[0].Phone_Notif;
            });

        // Get array of appointments (calendar) starting with reservations
        con.query("SELECT Key, Name, Date, Time, Description, Public_Notes, " +
            "Size FROM Appointment " +
            "INNER JOIN Group ON Appointment.GID = Group.GID " +
            "WHERE Group.CID_1 = " + this.customer_id + " " +
            "OR Group.CID_2 = " + this.customer_id + " " +
            "OR Group.CID_3 = " + this.customer_id + " " +
            "OR Group.CID_4 = " + this.customer_id + ";",
            function(err, result) {
                if (err) throw err;
                var calendar = [];
                for (var i = 0; i < result.length; i++) {
                    calendar.push(customer_appt(result[i].Key, result[i].Name,
                        result[i].Date, result[i].Time, result[i].Description,
                        result[i].Public_Notes, result[i].Size, true));
                };
            });

        // Current Date String
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var curr_date = yyyy + '-' + mm + '-' + dd;

        // Add on appointments available for reservation
        con.query("SELECT Key, Name, Date, Time, Description, Public_Notes, " +
            "Size FROM Appointment " +
            "INNER JOIN Group ON Appointment.GID = Group.GID " +
            "WHERE Group.CID_1 != " + this.customer_id + " " +
            "AND Group.CID_2 != " + this.customer_id + " " +
            "AND Group.CID_3 != " + this.customer_id + " " +
            "AND Group.CID_4 != " + this.customer_id + " " +
            "AND Size > 0 " +
            "AND Date > '" + curr_date + "';",
            function(err, result) {
                if (err) throw err;
                for (var i = 0; i < result.length; i++) {
                    calendar.push(customer_appt(result[i].Key, result[i].Name,
                        result[i].Date, result[i].Time, result[i].Description,
                        result[i].Public_Notes, result[i].Size, false));
                };
            });

    }

    // Getters and setters
    getName() {
        return this.cust_name;
    }

    setName(name) {
        this.cust_name = name;
        con.query("UPDATE Customer SET Name = '" + name +
            "' WHERE CID = " + this.customer_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getAddress() {
        return this.address;
    }

    setAddress(address) {
        this.address = address;
        con.query("UPDATE Customer SET Address = '" + address +
            "' WHERE CID = " + this.customer_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getPhone() {
        return this.phone;
    }

    setPhone(phone) {
        this.phone = phone;
        con.query("UPDATE Customer SET Phone_Number = '" + phone +
            "' WHERE CID = " + this.customer_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getEmail() {
        return this.email;
    }

    setEmail(email) {
        this.email = email;
        con.query("UPDATE Customer SET Email_Addr = '" + email +
            "' WHERE CID = " + this.customer_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getEmerName() {
        return this.emer_name;
    }

    setEmerName(name) {
        this.emer_name = name;
        con.query("UPDATE Customer SET Emer_Name = '" + name +
            "' WHERE CID = " + this.customer_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getEmerPhone() {
        return this.emer_num;
    }

    setEmerPhone(phone) {
        this.emer_num = phone;
        con.query("UPDATE Customer SET Emer_Num = '" + phone +
            "' WHERE CID = " + this.customer_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getNotifications() {
        return this.phone_notif;
    }

    setNotifications(notif) {
        this.phone_notif = notif;
        con.query("UPDATE Customer SET Name = '" + notif +
            "' WHERE CID = " + this.customer_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getCalendar() {
        return this.calendar;
    }
}

/**
 * Trainer Appointment Class. Class consists of:
 * String       Name
 * String       Date
 * String       Time
 * String       Description
 * String       Public Notes
 * String       Private Notes
 * Int          Group Size
 * String[]     List of Customers
 */
class trainer_appt {
    constructor(appt_key, appt_name, appt_date, appt_time,
        appt_description, appt_pub_notes, appt_priv_notes, appt_group_size,
        appt_customers) {
        this.appt_key = appt_key;
        this.appt_name = appt_name;
        this.appt_date = appt_date;
        this.appt_time = appt_time;
        this.appt_description = appt_description;
        this.appt_pub_notes = appt_pub_notes;
        this.appt_priv_notes = appt_priv_notes;
        this.appt_group_size = appt_group_size;
        this.appt_customers = appt_customers;
    }

    // Getters and Setters
    getName() {
        return this.appt_name;
    }

    getDate() {
        return this.appt_date;
    }

    getTime() {
        return this.appt_time;
    }

    getDescription() {
        return this.appt_description;
    }

    getPublicNotes() {
        return this.appt_pub_notes;
    }

    setPublicNotes(notes) {
        this.appt_pub_notes = notes;
        con.query("UPDATE Appointment SET Public_Notes = '" + notes +
            "' WHERE Key = " + this.appt_key + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getPrivateNotes() {
        return this.appt_priv_notes;
    }

    setPrivateNotes(notes) {
        this.appt_priv_notes = notes;
        con.query("UPDATE Appointment SET Private_Notes = '" + notes +
            "' WHERE Key = " + this.appt_key + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getCustomers() {
        return this.appt_customers;
    }
}

/** 
 * Trainer Class. Class consists of:
 * Int              ID
 * String           Name
 * String           Address
 * String           Phone
 * String           Email
 * String           Emergency Contact
 * String           Emergency Number
 * trainer_appt[]   
 */
class trainer {
    // Constructor
    constructor(trainer_id) {
        // Get key at creation
        this.trainer_id = trainer_id;

        // Query simple values from database
        con.query("SELECT Name, Address, Phone_Num, Email_Addr, Emer_Name, " +
            "Emer_Num FROM Trainer WHERE TID = " + this.trainer_id,
            function(err, result) {
                if (err) throw err;
                trainer_name = result[0].Name;
                address = result[0].Address;
                phone = result[0].Phone_Num;
                email = result[0].Email_Addr;
                emer_name = result[0].Emer_Name;
                emer_num = result[0].Emer_Num;
            });

        // Get all appointments where Trainer is assigned
        con.query("SELECT Key, Name, Date, Time, Difficulty, Description, " +
            "Public_Notes, Private_Notes, Size FROM Appointment " +
            "WHERE TID_1 = " + this.trainer_id +
            "OR TID_2 = " + this.trainer_id + ";",
            function(err, result) {
                if (err) throw err;
                var assigned_calendar = [];
                for (var i = 0; i < result.length; i++) {

                    // Get all names of customers in that appointment
                    var appt_cust_names = [];
                    con.query("SELECT Name FROM Customer " +
                        "INNER JOIN Group ON Customer.CID = Group.CID_1 " +
                        "INNER JOIN Appointment ON Group.GID = Appointment.GID " +
                        "WHERE Appointment.key = " + result[i].key + ";",
                        function(err, result2) {
                            if (err) throw err;
                            appt_cust_names.push(result2[0].Name);
                        });

                    con.query("SELECT Name FROM Customer " +
                        "INNER JOIN Group ON Customer.CID = Group.CID_2 " +
                        "INNER JOIN Appointment ON Group.GID = Appointment.GID " +
                        "WHERE Appointment.key = " + result[i].key + ";",
                        function(err, result2) {
                            if (err) throw err;
                            appt_cust_names.push(result2[0].Name);
                        });

                    con.query("SELECT Name FROM Customer " +
                        "INNER JOIN Group ON Customer.CID = Group.CID_3 " +
                        "INNER JOIN Appointment ON Group.GID = Appointment.GID " +
                        "WHERE Appointment.key = " + result[i].key + ";",
                        function(err, result2) {
                            if (err) throw err;
                            appt_cust_names.push(result2[0].Name);
                        });

                    con.query("SELECT Name FROM Customer " +
                        "INNER JOIN Group ON Customer.CID = Group.CID_4 " +
                        "INNER JOIN Appointment ON Group.GID = Appointment.GID " +
                        "WHERE Appointment.key = " + result[i].key + ";",
                        function(err, result2) {
                            if (err) throw err;
                            appt_cust_names.push(result2[0].Name);
                        });

                    assigned_calendar.push(trainer_appt(result[i].Key,
                        result[i].Name, result[i].Date, result[i].Time,
                        result[i].Description, result[i].Public_Notes,
                        result[i].Private_Notes, result[i].Size,
                        appt_cust_names));
                };
            });
    }

    // Getters and setters
    getName() {
        return this.trainer_name;
    }

    setName(name) {
        this.trainer_name = name;
        con.query("UPDATE Trainer SET Name = '" + name +
            "' WHERE CID = " + this.customer_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getAddress() {
        return this.address;
    }

    setAddress(address) {
        this.address = address;
        con.query("UPDATE Trainer SET Address = '" + address +
            "' WHERE CID = " + this.customer_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getPhone() {
        return this.phone;
    }

    setPhone(phone) {
        this.phone = phone;
        con.query("UPDATE Trainer SET Phone_Number = '" + phone +
            "' WHERE CID = " + this.customer_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getEmail() {
        return this.email;
    }

    setEmail(email) {
        this.email = email;
        con.query("UPDATE Trainer SET Email_Addr = '" + email +
            "' WHERE CID = " + this.customer_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getEmerName() {
        return this.emer_name;
    }

    setEmerName(name) {
        this.emer_name = name;
        con.query("UPDATE Trainer SET Emer_Name = '" + name +
            "' WHERE CID = " + this.customer_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getEmerPhone() {
        return this.emer_num;
    }

    setEmerPhone(phone) {
        this.emer_num = phone;
        con.query("UPDATE Trainer SET Emer_Num = '" + phone +
            "' WHERE CID = " + this.customer_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getCalendar() {
        return this.assigned_calendar;
    }
}

/**
 * Mini-Customer Class. Class consists of:
 * Customer ID
 * Name
 * Address
 * Phone Number
 * Email Address
 * Emergency Contact Name
 * Emergency Contact Phone Number
 */
class mini_customer {
    constructor(cust_id, cust_name, cust_addr, cust_phone, cust_email,
        cust_econ, cust_econ_phone, cust_diff) {
        this.cust_id = cust_id;
        this.cust_name = cust_name;
        this.cust_addr = cust_addr;
        this.cust_phone = cust_phone;
        this.cust_email = cust_email;
        this.cust_econ = cust_econ;
        this.cust_econ_phone = cust_econ_phone;
        this.cust_diff = cust_diff;
    }

    // Getters
    getID() {
        return this.cust_id;
    }

    getName() {
        return this.cust_name;
    }

    getAddress() {
        return this.cust_addr;
    }

    getPhone() {
        return this.cust_phone;
    }

    getEmail() {
        return this.cust_email;
    }

    getEmerContact() {
        return this.cust_econ;
    }

    getEmerContactPhone() {
        return this.cust_econ_phone;
    }

    getDifficulty() {
        return this.cust_diff;
    }

    // Setters
    setDifficulty(diff) {
        this.cust_diff = diff;
        con.query("UPDATE Customer SET Difficulty = " + diff +
            " WHERE CID = " + this.cust_id);
    }

    // DELETE FUNCTION
}

/**
 * Mini-Trainer Class. Class consists of:
 * Trainer ID
 * Name
 * Address
 * Phone Number
 * Email Address
 * Emergency Contact Name
 * Emergency Contact Phone Number
 */
class mini_trainer {
    constructor(tr_id, tr_name, tr_addr, tr_phone, tr_email,
        tr_econ, tr_econ_phone, tr_admin) {
        this.tr_id = tr_id;
        this.tr_name = tr_name;
        this.tr_addr = tr_addr;
        this.tr_phone = tr_phone;
        this.tr_email = tr_email;
        this.tr_econ = tr_econ;
        this.tr_econ_phone = tr_econ_phone;
        this.tr_admin = tr_admin;
    }

    // Getters
    getID() {
        return this.cust_id;
    }

    getName() {
        return this.cust_name;
    }

    getAddress() {
        return this.cust_addr;
    }

    getPhone() {
        return this.cust_phone;
    }

    getEmail() {
        return this.cust_email;
    }

    getEmerContact() {
        return this.cust_econ;
    }

    getEmerContactPhone() {
        return this.cust_econ_phone;
    }

    getAdmin() {
        return this.tr_admin;
    }

    // Setter
    setAdmin(admin) {
        this.tr_admin = admin;
        con.query("UPDATE Trainer SET Admin = " + admin + " " +
            "WHERE TID = " + this.tr_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    // DELETE FUNCTION
}

class micro_trainer {
    constructor(tr_ID, tr_name) {
        this.tr_ID = tr_ID;
        this.tr_name = tr_name;
    }

    // Getters
    getID() {
        return this.tr_ID;
    }

    getName() {
        return this.tr_name;
    }
}

class micro_customer {
    constructor(cust_ID, cust_name) {
        this.cust_ID = cust_ID;
        this.cust_name = cust_name;
    }

    // Getters
    getID() {
        return this.cust_ID;
    }

    getName() {
        return this.cust_name;
    }
}

class admin_appt {
    constructor(appt_key, appt_name, appt_date, appt_time, appt_difficulty,
        appt_desc, appt_pub_notes, appt_priv_notes, appt_size,
        appt_micro_trainer, appt_micro_trainer_index, appt_micro_cust) {
        this.appt_key = appt_key;
        this.appt_name = appt_name;
        this.appt_date = appt_date;
        this.appt_time = appt_time;
        this.appt_difficulty = appt_difficulty;
        this.appt_desc = appt_desc;
        this.appt_pub_notes = appt_pub_notes;
        this.appt_priv_notes = appt_priv_notes;
        this.appt_size = appt_size;
        this.appt_micro_trainer = appt_micro_trainer;
        this.appt_micro_trainer_index = appt_micro_trainer_index;
        this.appt_micro_cust;
    }

    // Getters and Setters
    getName() {
        return this.appt_name;
    }

    setName(name) {
        this.appt_name = name;
        con.query("UPDATE Appointment SET Name = '" + name +
            "' WHERE Key = " + this.appt_key + ";");
    }
}

class admin {
    constructor(admin_id) {
        this.admin_id = admin_id;

        // Get simple values
        con.query("SELECT Name, Address, Phone_Num, Email_Addr, Emer_Name, " +
            "Emer_Num FROM Trainer WHERE TID = " + this.admin_id + ";",
            function(err, result) {
                if (err) throw err;
                t_name = result[0].Name;
                address = result[0].Address;
                phone = result[0].Phone_Num;
                email = result[0].Email_Addr;
                emer_name = result[0].Emer_Name;
                emer_num = result[0].Emer_Num;
            });

        // Get Mini-Customer List
        con.query("SELECT CID, Name, Address, Phone_Num, Email_Addr, " +
            "Emer_Name, Emer_Num, Difficulty FROM Customer;",
            function(err, result) {
                if (err) throw err;
                var customers = [];
                for (var i = 0; i < result.length; i++) {
                    customers.push(mini_customer(result[i].CID, result[i].Name,
                        result[i].Address, result[i].Phone_Num,
                        result[i].Email_Addr, result[i].Emer_Name,
                        result[i].Emer_Num, result[i].Difficulty));
                };
            });

        // Get Mini-Trainer List
        con.query("SELECT TID, Name, Address, Phone_Num, Email_Addr, " +
            "Emer_Name, Emer_Num, Admin FROM Trainer;",
            function(err, result) {
                if (err) throw err;
                var trainers = [];
                for (var i = 0; i < result.length; i++) {
                    trainers.push(mini_trainer(result[i].TID, result[i].Name,
                        result[i].Address, result[i].Phone_Num,
                        result[i].Email_Addr, result[i].Emer_Name,
                        result[i].Emer_Num, result[i].Admin));
                };
            });

        // Get All Appointments
        con.query("SELECT * FROM Appointment;", function(err, result) {
            if (err) throw err;
            var calendar = [];
            for (var i = 0; i < result.length; i++) {
                // Get names of customers with CID's associated with the GID of result[i]
                con.query("SELECT ", function(err, result2) {
                    if (err) throw err;
                    var appt_cust_names = [];
                    for (var j = 0; j < result2.length; j++) {
                        appt_cust_names.push(result2[j]);
                    }
                })
                calendar.push(trainer_appt(result[i].Name,
                    result[i].Date, result[i].Time, result[i].Description,
                    result[i].Public_Notes, result[i].Private_Notes,
                    appt_cust_names));
            };
        });

    }

    // Getters and setters

}

con.end();