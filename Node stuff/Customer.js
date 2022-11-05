let appt = require('./Customer_Appt');
let customer_appt = appt.customer_appt;

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
        con.query("SELECT Cust_Name, Cust_Address, Cust_Phone_Num, Cust_Email_Addr, Cust_Emer_Name, " +
            "Cust_Emer_Num, Difficulty, Phone_Notif FROM Customer WHERE CID = " +
            this.customer_id + ";",
            function(err, result) {
                if (err) throw err;
                this.cust_name = result[0].Cust_Name;
                this.address = result[0].Cust_Address;
                this.phone = result[0].Cust_Phone_Num;
                this.email = result[0].Cust_Email_Addr;
                this.emer_name = result[0].Cust_Emer_Name;
                this.emer_num = result[0].Cust_Emer_Num;
                this.difficulty = result[0].Difficulty;
                this.phone_notif = result[0].Phone_Notif;
            });

        // Get array of appointments (calendar) starting with reservations
        var calendar = [];
        con.query("SELECT Appt_Key, Appt_Name, Appt_Date, Appt_Time, Appt_Description, Appt_Public_Notes, " +
            "Appt_Size FROM Appointment " +
            "INNER JOIN Customer_Group ON Appointment.Appt_GID = Customer_Group.GID " +
            "WHERE Customer_Group.CID_1 = " + this.customer_id + " " +
            "OR Customer_Group.CID_2 = " + this.customer_id + " " +
            "OR Customer_Group.CID_3 = " + this.customer_id + " " +
            "OR Customer_Group.CID_4 = " + this.customer_id + ";",
            function(err, result) {
                if (err) throw err;
                for (var i = 0; i < result.length; i++) {
                    calendar.push(new customer_appt(this.customer_id, result[i].Appt_Key, result[i].Appt_Name,
                        result[i].Appt_Date, result[i].Appt_Time, result[i].Appt_Description,
                        result[i].Appt_Public_Notes, result[i].Appt_Size, true));
                };
            });

        // Current Date String
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var curr_date = yyyy + '-' + mm + '-' + dd;

        // Add on appointments available for reservation
        con.query("SELECT Appt_Key, Appt_Name, Appt_Date, Appt_Time, Appt_Description, Appt_Public_Notes, " +
            "Appt_Size FROM Appointment " +
            "INNER JOIN Customer_Group ON Appointment.Appt_GID = Customer_Group.GID " +
            "WHERE Customer_Group.CID_1 != " + this.customer_id + " " +
            "AND Customer_Group.CID_2 != " + this.customer_id + " " +
            "AND Customer_Group.CID_3 != " + this.customer_id + " " +
            "AND Customer_Group.CID_4 != " + this.customer_id + " " +
            "AND Appt_Size > 0 " +
            "AND Appt_Date > '" + curr_date + "';",
            function(err, result) {
                if (err) throw err;
                for (var i = 0; i < result.length; i++) {
                    calendar.push(new customer_appt(this.customer_id, result[i].Appt_Key, result[i].Appt_Name,
                        result[i].Appt_Date, result[i].Appt_Time, result[i].Appt_Description,
                        result[i].Appt_Public_Notes, result[i].Appt_Size, false));
                };
            });

    }

    // Getters and setters
    getName() {
        return this.cust_name;
    }

    updateName() {
        var name;
        con.query("SELECT Cust_Name FROM Customer WHERE CID = '" +
            this.customer_id + "';",
            function(err, result) {
                if (err) throw err;
                name = result[0].Cust_Name;
            })
        this.cust_name = name;
    }

    setName(name) {
        this.cust_name = name;
        con.query("UPDATE Customer SET Cust_Name = '" + name +
            "' WHERE CID = " + this.customer_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getAddress() {
        return this.address;
    }

    updateAddress() {
        var addr;
        con.query("SELECT Cust_Address FROM Customer WHERE CID = '" +
            this.customer_id + "';",
            function(err, result) {
                if (err) throw err;
                addr = result[0].Cust_Address;
            })
        this.address = addr;
    }

    setAddress(addr) {
        this.address = addr;
        con.query("UPDATE Customer SET Cust_Address = '" + addr +
            "' WHERE CID = " + this.customer_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getPhone() {
        return this.phone;
    }

    updatePhone() {
        var phone_num;
        con.query("SELECT Cust_Phone_Num FROM Customer WHERE CID = '" +
            this.customer_id + "';",
            function(err, result) {
                if (err) throw err;
                phone_num = result[0].Cust_Phone_Num;
            })
        this.phone = phone_num;
    }

    setPhone(phone_num) {
        this.phone = phone_num;
        con.query("UPDATE Customer SET Cust_Phone_Number = '" + phone_num +
            "' WHERE CID = " + this.customer_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getEmail() {
        return this.email;
    }

    updateEmail() {
        var email_addr;
        con.query("SELECT Cust_Email_Addr FROM Customer WHERE CID = '" +
            this.customer_id + "';",
            function(err, result) {
                if (err) throw err;
                email_addr = result[0].Cust_Email_Addr;
            })
        this.email = email_addr;
    }

    setEmail(email_addr) {
        this.email = email_addr;
        con.query("UPDATE Customer SET Cust_Email_Addr = '" + email_addr +
            "' WHERE CID = " + this.customer_id + ";",
            function(err) {
                if (err) throw err;
            });

        con.query("UPDATE Login SET Email = '" + email_addr + "' WHERE Email = '" +
            this.email + "';",
            function(err) {
                if (err) throw err;
            })
    }

    getEmerName() {
        return this.emer_name;
    }

    updateEmerName() {
        var name;
        con.query("SELECT Cust_Emer_Name FROM Customer WHERE CID = '" +
            this.customer_id + "';",
            function(err, result) {
                if (err) throw err;
                name = result[0].Cust_Emer_Name;
            })
        this.emer_name = name;
    }

    setEmerName(name) {
        this.emer_name = name;
        con.query("UPDATE Customer SET Cust_Emer_Name = '" + name +
            "' WHERE CID = " + this.customer_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getEmerPhone() {
        return this.emer_num;
    }

    updateEmerPhone() {
        var phone_num;
        con.query("SELECT Cust_Emer_Num FROM Customer WHERE CID = '" +
            this.customer_id + "';",
            function(err, result) {
                if (err) throw err;
                phone_num = result[0].Cust_Emer_Num;
            })
        this.emer_num = phone_num;
    }

    setEmerPhone(phone_num) {
        this.emer_num = phone_num;
        con.query("UPDATE Customer SET Cust_Emer_Num = '" + phone_num +
            "' WHERE CID = " + this.customer_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getNotifications() {
        return this.phone_notif;
    }

    updateNotifications() {
        var notif;
        con.query("SELECT Phone_Notif FROM Customer WHERE CID = '" +
            this.customer_id + "';",
            function(err, result) {
                if (err) throw err;
                notif = result[0].Phone_Notif;
            })
        this.phone_notif = notif;
    }

    setNotifications(notif) {
        this.phone_notif = notif;
        con.query("UPDATE Customer SET Phone_Notif = '" + notif +
            "' WHERE CID = " + this.customer_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getCalendar() {
        return this.calendar;
    }

    updateCalendar() {
        calendar = [];
        con.query("SELECT Appt_Key, Appt_Name, Appt_Date, Appt_Time, Appt_Description, Appt_Public_Notes, " +
            "Appt_Size FROM Appointment " +
            "INNER JOIN Customer_Group ON Appointment.Appt_GID = Customer_Group.GID " +
            "WHERE Customer_Group.CID_1 = " + this.customer_id + " " +
            "OR Customer_Group.CID_2 = " + this.customer_id + " " +
            "OR Customer_Group.CID_3 = " + this.customer_id + " " +
            "OR Customer_Group.CID_4 = " + this.customer_id + ";",
            function(err, result) {
                if (err) throw err;
                for (var i = 0; i < result.length; i++) {
                    calendar.push(new customer_appt(this.customer_id, result[i].Appt_Key, result[i].Appt_Name,
                        result[i].Appt_Date, result[i].Appt_Time, result[i].Appt_Description,
                        result[i].Appt_Public_Notes, result[i].Appt_Size, true));
                };
            });

        // Current Date String
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var curr_date = yyyy + '-' + mm + '-' + dd;

        // Add on appointments available for reservation
        con.query("SELECT Appt_Key, Appt_Name, Appt_Date, Appt_Time, Appt_Description, Appt_Public_Notes, " +
            "Appt_Size FROM Appointment " +
            "INNER JOIN Customer_Group ON Appointment.Appt_GID = Customer_Group.GID " +
            "WHERE Customer_Group.CID_1 != " + this.customer_id + " " +
            "AND Customer_Group.CID_2 != " + this.customer_id + " " +
            "AND Customer_Group.CID_3 != " + this.customer_id + " " +
            "AND Customer_Group.CID_4 != " + this.customer_id + " " +
            "AND Appt_Size > 0 " +
            "AND Appt_Date > '" + curr_date + "';",
            function(err, result) {
                if (err) throw err;
                for (var i = 0; i < result.length; i++) {
                    calendar.push(new customer_appt(this.customer_id, result[i].Appt_Key, result[i].Appt_Name,
                        result[i].Appt_Date, result[i].Appt_Time, result[i].Appt_Description,
                        result[i].Appt_Public_Notes, result[i].Appt_Size, false));
                };
            });
    }

    changePassword(old_pw, new_pw) {
        var db_old_pw;
        con.query("SELECT Log_Password FROM Login WHERE Email = '" + this.email +
            "';",
            function(err, result) {
                if (err) throw err;
                db_old_pw = result[0].Log_Password;
            })

        if (db_old_pw == old_pw) {
            con.query("UPDATE Login SET Log_Password = '" + new_pw + "' WHERE Email = '" +
                this.email + "';",
                function(err) {
                    if (err) throw err;
                })
        }
    }

    delete() {
        con.query("UPDATE Login SET Decomission = 1 WHERE CID = " +
            this.customer_id + ";",
            function(err) {
                if (err) throw err;
            });

        // Get today's date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var curr_date = yyyy + '-' + mm + '-' + dd;

        // Unreserve from all appointments after today
        for (var i = 0; i < this.calendar.length; i++) {
            if (this.calendar[i].getDate() > curr_date) {
                this.calendar[i].setReserved(false);
            }
        };
    }
}

module.exports = {
    customer: customer
}