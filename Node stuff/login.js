// Variables for connection
var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "108.213.201.29",
    user: "root",
    password: "RazzleDazzle1!",
    database: "Horse_Site",
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
    constructor(cust_id, appt_key, appt_name, appt_date, appt_time,
        appt_description, appt_pub_notes, appt_group_size, appt_reserved) {
        this.cust_id = cust_id;
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

    updateName() {
        var name;
        con.query("SELECT Appt_Name FROM Appointment WHERE Appt_Key = '" +
            this.appt_key + "';",
            function(err, result) {
                if (err) throw err;
                name = result[0].Appt_Name;
            })
        this.appt_name = name;
    }

    getDate() {
        return this.appt_date;
    }

    updateDate() {
        var date;
        con.query("SELECT Appt_Date FROM Appointment WHERE Appt_Key = " +
            this.appt_key + ";",
            function(err, result) {
                if (err) throw err;
                date = result[0].Appt_Date;
            })
        this.appt_date = date;
    }

    getTime() {
        return this.appt_time;
    }

    updateTime() {
        var time;
        con.query("SELECT Appt_Time FROM Appointment WHERE Appt_Key = " +
            this.appt_key + ";",
            function(err, result) {
                if (err) throw err;
                time = result[0].Appt_Time;
            })
        this.appt_time = time;
    }

    getDescription() {
        return this.appt_description;
    }

    updateDescription() {
        var description;
        con.query("SELECT Appt_Description FROM Appointment WHERE Appt_Key = '" +
            this.appt_key + "';",
            function(err, result) {
                if (err) throw err;
                description = result[0].Appt_Description;
            })
        this.appt_description = description;
    }

    getPublicNotes() {
        return this.appt_pub_notes;
    }

    updatePublicNotes() {
        var pub_notes;
        con.query("SELECT Appt_Public_Notes FROM Appointment WHERE Appt_Key = '" +
            this.appt_key + "';",
            function(err, result) {
                if (err) throw err;
                pub_notes = result[0].Appt_Public_Notes;
            })
        this.appt_pub_notes = pub_notes;
    }

    getGroupSize() {
        return this.appt_group_size;
    }

    updateGroupSize() {
        var group;
        con.query("SELECT Appt_Size FROM Appointment WHERE Appt_Key = '" +
            this.appt_key + "';",
            function(err, result) {
                if (err) throw err;
                group = result[0].Appt_Size;
            })
        this.appt_group_size = size;
    }

    getReserved() {
        return this.appt_reserved;
    }

    updateReserved() {
        var reserved;
        con.query("SELECT CID_1, CID_2, CID_3, CID_4 FROM Customer_Group INNER " +
            "JOIN Appointment ON GID = Appointment.Appt_GID WHERE Appt_Key = '" +
            this.appt_key + "';",
            function(err, result) {
                if (err) throw err;
                if (result[0].CID_1 == this.cust_id ||
                    result[0].CID_2 == this.cust_id ||
                    result[0].CID_3 == this.cust_id ||
                    result[0].CID_4 == this.cust_id) {
                    reserved = true;
                } else reserved = false;
            })
        this.appt_reserved = reserved;
    }

    // Setters
    setReserved(reserve) {
        this.appt_reserved = reserve;
        // If set reserved to true, reduce available group size (also in DB)
        if (reserve) {
            this.appt_group_size--;
            con.query("UPDATE Appointment SET Appt_Size = Appt_Size - 1 WHERE Appt_Key = " +
                this.appt_key + ";",
                function(err) {
                    if (err) throw err;
                });

            // Get GID of appointment reserved
            var appt_gid;
            con.query("SELECT Appt_GID FROM Appointment WHERE Appt_Key = " +
                this.appt_key + ";",
                function(err, result) {
                    if (err) throw err;
                    appt_gid = result[0].Appt_GID;
                });

            // If no group exists
            if (appt_gid == null) {
                con.query("INSERT INTO Customer_Group (CID_1) VALUES (" +
                    this.cust_id + ");",
                    function(err) {
                        if (err) throw err;
                    });

                // Get that GID
                var gid;
                con.query("SELECT GID FROM Customer_Group WHERE CID_1 = " +
                    this.cust_id + " ORDER BY GID DESC LIMIT 1;",
                    function(err, result) {
                        if (err) throw err;
                        gid = result[0].GID;
                    })

                // Update this appointment with that GID
            }

            // If group does exist
            else {
                // Get GID and all CID's
                var gid;
                con.query("SELECT Appt_GID FROM Appointment WHERE Appt_Key = " +
                    this.appt_key + ";",
                    function(err, result) {
                        if (err) throw err;
                        gid = result[0].Appt_GID;
                    });

                var CID_2, CID_3, CID_4;
                con.query("SELECT CID_2, CID_3, CID_4 FROM Customer_Group WHERE GID = " +
                    gid + ";",
                    function(err, result) {
                        if (err) throw err;
                        CID_2 = result[0].CID_2;
                        CID_3 = result[0].CID_3;
                        CID_4 = result[0].CID_4;
                    })

                // If CID_2 is empty
                if (CID_2 == null) {
                    con.query("UPDATE Customer_Group SET CID_2 = " + this.cust_id +
                        " WHERE GID = " + gid + ";",
                        function(err) {
                            if (err) throw err;
                        })
                }

                // Else if CID_3 is empty
                else if (CID_3 == null) {
                    con.query("UPDATE Customer_Group SET CID_3 = " + this.cust_id +
                        " WHERE GID = " + gid + ";",
                        function(err) {
                            if (err) throw err;
                        })
                }

                // Else if CID_4 is empty
                else if (CID_4 == null) {
                    con.query("UPDATE Customer_Group SET CID_4 = " + this.cust_id +
                        " WHERE GID = " + gid + ";",
                        function(err) {
                            if (err) throw err;
                        })
                }
            }
        }

        // If set reserved to false, reduce available group size (also in DB)
        else if (!reserve) {
            this.appt_group_size++;
            con.query("UPDATE Appointment SET Size = Size + 1 WHERE Appt_Key = " +
                this.appt_key + ";",
                function(err) {
                    if (err) throw err;
                })

            // Update Customer_Group table
            // Get CID_ values
            var gid, CID_1, CID_2, CID_3, CID_4;
            con.query("SELECT * FROM Customer_Group " +
                "INNER JOIN Appointment ON GID = Appointment.Appt_GID " +
                " WHERE Appointment.Appt_Key = " + this.appt_key + ";",
                function(err, result) {
                    if (err) throw err;
                    gid = result[0].GID;
                    CID_1 = result[0].CID_1;
                    CID_2 = result[0].CID_2;
                    CID_3 = result[0].CID_3;
                    CID_4 = result[0].CID_4;
                })

            // Check values
            if (CID_2 == this.cust_id) {
                con.query("UPDATE Customer_Group SET CID_2 = NULL WHERE GID = " +
                    gid + ";",
                    function(err) {
                        if (err) throw err;
                    })
            } else if (CID_3 == this.cust_id) {
                con.query("UPDATE Customer_Group SET CID_3 = NULL WHERE GID = " +
                    gid + ";",
                    function(err) {
                        if (err) throw err;
                    })
            } else if (CID_4 == this.cust_id) {
                con.query("UPDATE Customer_Group SET CID_4 = NULL WHERE GID = " +
                    gid + ";",
                    function(err) {
                        if (err) throw err;
                    })
            } else if (CID_1 == this.cust_id && CID_2 != NULL && CID_3 != NULL && CID_4 != NULL) {
                con.query("UPDATE Customer_Group SET CID_1 = CID_4 WHERE GID = " +
                    gid + ";",
                    function(err) {
                        if (err) throw err;
                    })
                con.query("UPDATE Customer_Group SET CID_4 = NULL WHERE GID = " +
                    gid + ";",
                    function(err) {
                        if (err) throw err;
                    })
            } else if (CID_1 == this.cust_id && CID_2 != NULL && CID_3 != NULL) {
                con.query("UPDATE Customer_Group SET CID_1 = CID_3 WHERE GID = " +
                    gid + ";",
                    function(err) {
                        if (err) throw err;
                    })
                con.query("UPDATE Customer_Group SET CID_3 = NULL WHERE GID = " +
                    gid + ";",
                    function(err) {
                        if (err) throw err;
                    })
            } else if (CID_1 == this.cust_id && CID_2 != NULL) {
                con.query("UPDATE Customer_Group SET CID_1 = CID_2 WHERE GID = " +
                    gid + ";",
                    function(err) {
                        if (err) throw err;
                    })
                con.query("UPDATE Customer_Group SET CID_2 = NULL WHERE GID = " +
                    gid + ";",
                    function(err) {
                        if (err) throw err;
                    })
            } else {
                con.query("UPDATE Appointment SET Appt_GID = NULL WHERE Appt_Key = " +
                    this.appt_key + ";",
                    function(err) {
                        if (err) throw err;
                    })
                con.query("DELETE FROM Customer_Group WHERE GID = " + gid + ";",
                    function(err) {
                        if (err) throw err;
                    })
            }
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
        appt_description, appt_pub_notes, appt_priv_notes, appt_group_size) {
        this.appt_key = appt_key;
        this.appt_name = appt_name;
        this.appt_date = appt_date;
        this.appt_time = appt_time;
        this.appt_description = appt_description;
        this.appt_pub_notes = appt_pub_notes;
        this.appt_priv_notes = appt_priv_notes;
        this.appt_group_size = appt_group_size;
    }

    // Getters and Setters
    getName() {
        return this.appt_name;
    }

    updateName() {
        var name;
        con.query("SELECT Appt_Name FROM Appointment WHERE Appt_Key = '" +
            this.appt_key + "';",
            function(err, result) {
                if (err) throw err;
                name = result[0].Appt_Name;
            })
        this.appt_name = name;
    }

    getDate() {
        return this.appt_date;
    }

    updateDate() {
        var date;
        con.query("SELECT Appt_Date FROM Appointment WHERE Appt_Key = '" +
            this.appt_key + "';",
            function(err, result) {
                if (err) throw err;
                date = result[0].Appt_Date;
            })
        this.appt_date = date;
    }

    getTime() {
        return this.appt_time;
    }

    updateTime() {
        var time;
        con.query("SELECT Appt_Time FROM Appointment WHERE Appt_Key = '" +
            this.appt_key + "';",
            function(err, result) {
                if (err) throw err;
                time = result[0].Appt_Time;
            })
        this.appt_time = time;
    }

    getDescription() {
        return this.appt_description;
    }

    updateDescription() {
        var description;
        con.query("SELECT Appt_Description FROM Appointment WHERE Appt_Key = '" +
            this.appt_key + "';",
            function(err, result) {
                if (err) throw err;
                description = result[0].Appt_Description;
            })
        this.appt_description = description;
    }

    getPublicNotes() {
        return this.appt_pub_notes;
    }

    updatePublicNotes() {
        var publicNotes;
        con.query("SELECT Appt_Public_Notes FROM Appointment WHERE Appt_Key = '" +
            this.appt_key + "';",
            function(err, result) {
                if (err) throw err;
                publicNotes = result[0].Appt_Public_Notes;
            })
        this.appt_pub_notes = publicNotes;
    }

    setPublicNotes(notes) {
        this.appt_pub_notes = notes;
        con.query("UPDATE Appointment SET Appt_Public_Notes = '" + notes +
            "' WHERE Appt_Key = " + this.appt_key + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getPrivateNotes() {
        return this.appt_priv_notes;
    }

    updatePrivateNotes() {
        var privateNotes;
        con.query("SELECT Appt_Private_Notes FROM Appointment WHERE Appt_Key = '" +
            this.appt_key + "';",
            function(err, result) {
                if (err) throw err;
                privateNotes = result[0].Appt_Private_Notes;
            })
        this.appt_priv_notes = privateNotes;
    }

    setPrivateNotes(notes) {
        this.appt_priv_notes = notes;
        con.query("UPDATE Appointment SET Appt_Private_Notes = '" + notes +
            "' WHERE Appt_Key = " + this.appt_key + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getCustomers() {
        var appt_cust_names = [];
        con.query("SELECT Name FROM Customer " +
            "INNER JOIN Customer_Group ON Customer.CID = Customer_Group.CID_1 " +
            "INNER JOIN Appointment ON Customer_Group.GID = Appointment.Appt_GID " +
            "WHERE Appointment.Appt_Key = " + result[i].Appt_Key + ";",
            function(err, result2) {
                if (err) throw err;
                appt_cust_names.push(result2[0].Name);
            });

        con.query("SELECT Name FROM Customer " +
            "INNER JOIN Customer_Group ON Customer.CID = Customer_Group.CID_2 " +
            "INNER JOIN Appointment ON Customer_Group.GID = Appointment.Appt_GID " +
            "WHERE Appointment.Appt_Key = " + result[i].Appt_Key + ";",
            function(err, result2) {
                if (err) throw err;
                appt_cust_names.push(result2[0].Name);
            });

        con.query("SELECT Name FROM Customer " +
            "INNER JOIN Customer_Group ON Customer.CID = Customer_Group.CID_3 " +
            "INNER JOIN Appointment ON Customer_Group.GID = Appointment.Appt_GID " +
            "WHERE Appointment.Appt_Key = " + result[i].Appt_Key + ";",
            function(err, result2) {
                if (err) throw err;
                appt_cust_names.push(result2[0].Name);
            });

        con.query("SELECT Name FROM Customer " +
            "INNER JOIN Customer_Group ON Customer.CID = Customer_Group.CID_4 " +
            "INNER JOIN Appointment ON Customer_Group.GID = Appointment.GID " +
            "WHERE Appointment.key = " + result[i].Appt_Key + ";",
            function(err, result2) {
                if (err) throw err;
                appt_cust_names.push(result2[0].Name);
            });
        return this.appt_cust_names;
    }

    getPhoneNumbers() {
        // Get all CID's
        var CID_1, CID_2, CID_3, CID_4;
        con.query("SELECT CID_1, CID_2, CID_3, CID_4 FROM Customer_Group INNER JOIN " +
            "Appointment ON GID = Appointment.Appt_GID WHERE Appointment.Appt_Key = " +
            this.appt_key + ";",
            function(err, result) {
                if (err) throw err;
                CID_1 = result[0].CID_1;
                CID_2 = result[0].CID_2;
                CID_3 = result[0].CID_3;
                CID_4 = result[0].CID_4;
            })

        // Get Phone Numbers
        var phone = [];
        con.query("SELECT Cust_Phone_Num, Phone_Notif FROM Customer INNER JOIN Customer_Group " +
            "ON CID = Customer_Group.CID_1 INNER JOIN Appointment ON Customer_Group.GID " +
            "= Appointment.Appt_GID WHERE Appointment.Appt_Key = " + this.appt_key + ";",
            function(err, result) {
                if (err) throw err;
                var pNumber = result[0].Cust_Phone_Num.match(/\d/g) + "";
                if (result[0].Phone_Notif) phone.push(pNumber);
            })

        if (CID_2 != null) {
            con.query("SELECT Cust_Phone_Num, Phone_Notif FROM Customer INNER JOIN Customer_Group " +
                "ON CID = Customer_Group.CID_2 INNER JOIN Appointment ON Customer_Group.GID " +
                "= Appointment.Appt_GID WHERE Appointment.Appt_Key = " + this.appt_key + ";",
                function(err, result) {
                    if (err) throw err;
                    var pNumber = result[0].Cust_Phone_Num.match(/\d/g) + "";
                    if (result[0].Phone_Notif) phone.push(pNumber);
                })
        }

        if (CID_3 != null) {
            con.query("SELECT Cust_Phone_Num, Phone_Notif FROM Customer INNER JOIN Customer_Group " +
                "ON CID = Customer_Group.CID_3 INNER JOIN Appointment ON Customer_Group.GID " +
                "= Appointment.Appt_GID WHERE Appointment.Appt_Key = " + this.appt_key + ";",
                function(err, result) {
                    if (err) throw err;
                    var pNumber = result[0].Cust_Phone_Num.match(/\d/g) + "";
                    if (result[0].Phone_Notif) phone.push(pNumber);
                })
        }

        if (CID_4 != null) {
            con.query("SELECT Cust_Phone_Num, Phone_Notif FROM Customer INNER JOIN Customer_Group " +
                "ON CID = Customer_Group.CID_4 INNER JOIN Appointment ON Customer_Group.GID " +
                "= Appointment.Appt_GID WHERE Appointment.Appt_Key = " + this.appt_key + ";",
                function(err, result) {
                    if (err) throw err;
                    var pNumber = result[0].Cust_Phone_Num.match(/\d/g) + "";
                    if (result[0].Phone_Notif) phone.push(pNumber);
                })
        }

        return phone;
    }

    getEmails() {
        // Get all CID's
        var CID_1, CID_2, CID_3, CID_4;
        con.query("SELECT CID_1, CID_2, CID_3, CID_4 FROM Customer_Group INNER JOIN " +
            "Appointment ON GID = Appointment.Appt_GID WHERE Appointment.Appt_Key = " +
            this.appt_key + ";",
            function(err, result) {
                if (err) throw err;
                CID_1 = result[0].CID_1;
                CID_2 = result[0].CID_2;
                CID_3 = result[0].CID_3;
                CID_4 = result[0].CID_4;
            })

        // Get email addresses
        var emails = [];
        con.query("SELECT Cust_Email_Addr FROM Customer INNER JOIN Customer_Group " +
            "ON CID = Customer_Group.CID_1 INNER JOIN Appointment ON Customer_Group.GID " +
            "= Appointment.Appt_GID WHERE Appointment.Appt_Key = " + this.appt_key + ";",
            function(err, result) {
                if (err) throw err;
                emails.push(result[0].Cust_Email_Addr);
            })

        if (CID_2 != null) {
            con.query("SELECT Cust_Email_Addr FROM Customer INNER JOIN Customer_Group " +
                "ON CID = Customer_Group.CID_2 INNER JOIN Appointment ON Customer_Group.GID " +
                "= Appointment.Appt_GID WHERE Appointment.Appt_Key = " + this.appt_key + ";",
                function(err, result) {
                    if (err) throw err;
                    emails.push(result[0].Cust_Email_Addr);
                })
        }

        if (CID_3 != null) {
            con.query("SELECT Cust_Email_Addr FROM Customer INNER JOIN Customer_Group " +
                "ON CID = Customer_Group.CID_3 INNER JOIN Appointment ON Customer_Group.GID " +
                "= Appointment.Appt_GID WHERE Appointment.Appt_Key = " + this.appt_key + ";",
                function(err, result) {
                    if (err) throw err;
                    emails.push(result[0].Cust_Email_Addr);
                })
        }

        if (CID_4 != null) {
            con.query("SELECT Cust_Email_Addr FROM Customer INNER JOIN Customer_Group " +
                "ON CID = Customer_Group.CID_4 INNER JOIN Appointment ON Customer_Group.GID " +
                "= Appointment.Appt_GID WHERE Appointment.Appt_Key = " + this.appt_key + ";",
                function(err, result) {
                    if (err) throw err;
                    emails.push(result[0].Cust_Email_Addr);
                })
        }

        return emails;
    }

    sendNotifications(title, notification) {
        var emails = getEmails();
        for (var i = 0; i < emails.length; i++) {
            emailAppt(emails[i], title, notification);
        }

        // Send texts
        var phone = getPhoneNumbers();
        for (var i = 0; i < phone.length; i++) {
            textAppt(phone[i], notification);
        }
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
        con.query("SELECT Train_Name, Train_Address, Train_Phone_Num, Train_Email_Addr, Train_Emer_Name, " +
            "Train_Emer_Num FROM Trainer WHERE TID = " + this.trainer_id,
            function(err, result) {
                if (err) throw err;
                this.trainer_name = result[0].Train_Name;
                this.address = result[0].Train_Address;
                this.phone = result[0].Train_Phone_Num;
                this.email = result[0].Train_Email_Addr;
                this.emer_name = result[0].Train_Emer_Name;
                this.emer_num = result[0].Train_Emer_Num;
            });

        // Get all appointments where Trainer is assigned
        var assigned_calendar = [];
        con.query("SELECT Appt_Key, Appt_Name, Appt_Date, Appt_Time, Appt_Difficulty, Appt_Description, " +
            "Appt_Public_Notes, Appt_Private_Notes, Appt_Size FROM Appointment " +
            "WHERE Appt_TID_1 = " + this.trainer_id + " " +
            "OR Appt_TID_2 = " + this.trainer_id + ";",
            function(err, result) {
                if (err) throw err;
                for (var i = 0; i < result.length; i++) {
                    assigned_calendar.push(new trainer_appt(result[i].Appt_Key,
                        result[i].Appt_Name, result[i].Appt_Date, result[i].Appt_Time,
                        result[i].Appt_Description, result[i].Appt_Public_Notes,
                        result[i].Appt_Private_Notes, result[i].Appt_Size));
                };
            });
    }

    // Getters and setters
    getName() {
        return this.trainer_name;
    }

    updateName() {
        var name;
        con.query("SELECT Train_Name FROM Trainer WHERE TID = '" +
            this.trainer_id + "';",
            function(err, result) {
                if (err) throw err;
                name = result[0].Train_Name;
            })
        this.trainer_name = name;
    }

    setName(name) {
        this.trainer_name = name;
        con.query("UPDATE Trainer SET Train_Name = '" + name +
            "' WHERE TID = " + this.trainer_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getAddress() {
        return this.address;
    }

    updateAddress() {
        var address;
        con.query("SELECT Train_Address FROM Trainer WHERE TID = '" +
            this.trainer_id + "';",
            function(err, result) {
                if (err) throw err;
                address = result[0].Train_Address;
            })
        this.address = address;
    }

    setAddress(address) {
        this.address = address;
        con.query("UPDATE Trainer SET Train_Address = '" + address +
            "' WHERE TID = " + this.trainer_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getPhone() {
        return this.phone;
    }

    updatePhone() {
        var phone;
        con.query("SELECT Train_Phone_Num FROM Trainer WHERE TID = '" +
            this.trainer_id + "';",
            function(err, result) {
                if (err) throw err;
                phone = result[0].Train_Phone_Num;
            })
        this.phone = phone;
    }

    setPhone(phone) {
        this.phone = phone;
        con.query("UPDATE Trainer SET Train_Phone_Number = '" + phone +
            "' WHERE TID = " + this.trainer_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getEmail() {
        return this.email;
    }

    updateEmail() {
        var email;
        con.query("SELECT Train_Email_Addr FROM Trainer WHERE TID = '" +
            this.trainer_id + "';",
            function(err, result) {
                if (err) throw err;
                email = result[0].Train_Email_Addr;
            })
        this.email = email;
    }

    setEmail(email) {
        this.email = email;
        con.query("UPDATE Trainer SET Train_Email_Addr = '" + email +
            "' WHERE TID = " + this.trainer_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getEmerName() {
        return this.emer_name;
    }

    updateEmerName() {
        var emerName;
        con.query("SELECT Train_Emer_Name FROM Trainer WHERE TID = '" +
            this.trainer_id + "';",
            function(err, result) {
                if (err) throw err;
                emerName = result[0].Train_Emer_Name;
            })
        this.emer_name = emerName;
    }

    setEmerName(name) {
        this.emer_name = name;
        con.query("UPDATE Trainer SET Train_Emer_Name = '" + name +
            "' WHERE TID = " + this.trainer_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getEmerPhone() {
        return this.emer_num;
    }

    updateEmerPhone() {
        var emerPhone;
        con.query("SELECT Train_Emer_Num FROM Trainer WHERE TID = '" +
            this.trainer_id + "';",
            function(err, result) {
                if (err) throw err;
                emerPhone = result[0].Train_Emer_Num;
            })
        this.emer_num = emerPhone;
    }

    setEmerPhone(phone) {
        this.emer_num = phone;
        con.query("UPDATE Trainer SET Train_Emer_Num = '" + phone +
            "' WHERE TID = " + this.trainer_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getCalendar() {
        return this.assigned_calendar;
    }

    updateCalendar() {
        this.assigned_calendar = [];
        con.query("SELECT Appt_Key, Appt_Name, Appt_Date, Appt_Time, Appt_Difficulty, Appt_Description, " +
            "Appt_Public_Notes, Appt_Private_Notes, Appt_Size FROM Appointment " +
            "WHERE Appt_TID_1 = " + this.trainer_id + " " +
            "OR Appt_TID_2 = " + this.trainer_id + ";",
            function(err, result) {
                if (err) throw err;
                for (var i = 0; i < result.length; i++) {
                    this.assigned_calendar.push(new trainer_appt(result[i].Appt_Key,
                        result[i].Appt_Name, result[i].Appt_Date, result[i].Appt_Time,
                        result[i].Appt_Description, result[i].Appt_Public_Notes,
                        result[i].Appt_Private_Notes, result[i].Appt_Size));
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
        cust_econ, cust_econ_phone, cust_diff, cust_notif) {
        this.cust_id = cust_id;
        this.cust_name = cust_name;
        this.cust_addr = cust_addr;
        this.cust_phone = cust_phone;
        this.cust_email = cust_email;
        this.cust_econ = cust_econ;
        this.cust_econ_phone = cust_econ_phone;
        this.cust_diff = cust_diff;
        this.cust_notif = cust_notif;
    }

    // Getters
    getID() {
        return this.cust_id;
    }

    getName() {
        return this.cust_name;
    }

    updateName() {
        var name;
        con.query("SELECT Cust_Name FROM Customer WHERE CID = '" +
            this.cust_id + "';",
            function(err, result) {
                if (err) throw err;
                name = result[0].Cust_Name;
            })
        this.cust_name = name;
    }

    getAddress() {
        return this.cust_addr;
    }

    updateAddress() {
        var addr;
        con.query("SELECT Cust_Address FROM Customer WHERE CID = '" +
            this.cust_id + "';",
            function(err, result) {
                if (err) throw err;
                addr = result[0].Cust_Address;
            })
        this.cust_addr = addr;
    }

    getPhone() {
        return this.cust_phone;
    }

    updatePhone() {
        var phone;
        con.query("SELECT Cust_Phone_Num FROM Customer WHERE CID = '" +
            this.cust_id + "';",
            function(err, result) {
                if (err) throw err;
                phone = result[0].Cust_Phone_Num;
            })
        this.cust_phone = phone;
    }

    getEmail() {
        return this.cust_email;
    }

    updateEmail() {
        var email;
        con.query("SELECT Cust_Email_Addr FROM Customer WHERE CID = '" +
            this.cust_id + "';",
            function(err, result) {
                if (err) throw err;
                email = result[0].Cust_Email_Addr;
            })
        this.cust_email = email;
    }

    getEmerContact() {
        return this.cust_econ;
    }

    updateEmerContact() {
        var name;
        con.query("SELECT Cust_Emer_Name FROM Customer WHERE CID = '" +
            this.cust_id + "';",
            function(err, result) {
                if (err) throw err;
                name = result[0].Cust_Emer_Name;
            })
        this.cust_econ = name;
    }

    getEmerContactPhone() {
        return this.cust_econ_phone;
    }

    updateEmerContactPhone() {
        var phone;
        con.query("SELECT Cust_Emer_Num FROM Customer WHERE CID = '" +
            this.cust_id + "';",
            function(err, result) {
                if (err) throw err;
                phone = result[0].Cust_Emer_Num;
            })
        this.cust_econ_phone = phone;
    }

    getDifficulty() {
        return this.cust_diff;
    }

    updateDifficulty() {
        var difficulty;
        con.query("SELECT Difficulty FROM Customer WHERE CID = '" +
            this.cust_id + "';",
            function(err, result) {
                if (err) throw err;
                difficulty = result[0].Difficulty;
            })
        this.cust_diff = difficulty;
    }

    // Setters
    setDifficulty(diff) {
        this.cust_diff = diff;
        con.query("UPDATE Customer SET Difficulty = " + diff +
            " WHERE CID = " + this.cust_id);
    }

    // Delete function
    delete() {
        var cust = new customer(this.cust_id);
        cust.delete();
    }

    updateNotifications() {
        var notif;
        con.query("SELECT Phone_Notif FROM Customer WHERE CID = '" +
            this.cust_id + "';",
            function(err, result) {
                if (err) throw err;
                notif = result[0].Phone_Notif;
            })
        this.cust_notif = notif;
    }

    notify(title, notification) {
        emailAppt(this.cust_email, title, notification);
        var phone = this.cust_phone.match(/\d/g) + "";
        this.updateNotifications();
        if (this.cust_notif) textAppt(phone, notification);
    }
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
        return this.tr_id;
    }

    getName() {
        return this.tr_name;
    }

    updateName() {
        var name;
        con.query("SELECT Train_Name FROM Trainer WHERE TID = '" +
            this.tr_id + "';",
            function(err, result) {
                if (err) throw err;
                name = result[0].Train_Name;
            })
        this.tr_name = name;
    }

    getAddress() {
        return this.tr_addr;
    }

    updateAddress() {
        var address;
        con.query("SELECT Train_Address FROM Trainer WHERE TID = '" +
            this.tr_id + "';",
            function(err, result) {
                if (err) throw err;
                address = result[0].Train_Address;
            })
        this.tr_addr = address;
    }

    getPhone() {
        return this.tr_phone;
    }

    updatePhone() {
        var phone;
        con.query("SELECT Train_Phone_Num FROM Trainer WHERE TID = '" +
            this.tr_id + "';",
            function(err, result) {
                if (err) throw err;
                phone = result[0].Train_Phone_Num;
            })
        this.tr_phone = phone;
    }

    getEmail() {
        return this.tr_email;
    }

    updateEmail() {
        var email;
        con.query("SELECT Train_Email_Addr FROM Trainer WHERE TID = '" +
            this.tr_id + "';",
            function(err, result) {
                if (err) throw err;
                email = result[0].Train_Email_Addr;
            })
        this.tr_email = email;
    }

    getEmerContact() {
        return this.tr_econ;
    }

    updateEmerName() {
        var emerName;
        con.query("SELECT Train_Emer_Name FROM Trainer WHERE TID = '" +
            this.tr_id + "';",
            function(err, result) {
                if (err) throw err;
                emerName = result[0].Train_Emer_Name;
            })
        this.tr_econ = emerName;
    }

    getEmerContactPhone() {
        return this.tr_econ_phone;
    }

    updateEmerPhone() {
        var emerPhone;
        con.query("SELECT Train_Emer_Num FROM Trainer WHERE TID = '" +
            this.tr_id + "';",
            function(err, result) {
                if (err) throw err;
                emerPhone = result[0].Train_Emer_Num;
            })
        this.tr_econ_phone = emerPhone;
    }

    getAdmin() {
        return this.tr_admin;
    }

    updateAdmin() {
        var admin;
        con.query("SELECT Admin FROM Trainer WHERE TID = '" +
            this.tr_id + "';",
            function(err, result) {
                if (err) throw err;
                admin = result[0].Admin;
            })
        this.tr_admin = admin;
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

    delete() {
        con.query("UPDATE Login SET Decomissioned = 1 WHERE Email = " +
            this.tr_email + ";",
            function(err) {
                if (err) throw err;
            })
        con.query("UPDATE Appointment SET Appt_TID_1 = NULL WHERE Appt_TID_1 = " +
            this.tr_id + ";",
            function(err) {
                if (err) throw err;
            })
        con.query("UPDATE Appointment SET Appt_TID_2 = NULL WHERE Appt_TID_2 = " +
            this.tr_id + ";",
            function(err) {
                if (err) throw err;
            })
    }

    notify(title, notification) {
        emailAppt(this.tr_email, title, notification);
        var phone = this.tr_phone.match(/\d/g) + "";
        textAppt(phone, notification);
    }
}

/** 
 * Micro trainer for drop down for assigning appointments to a trainer
 */
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



class admin_appt {
    constructor(appt_key, appt_name, appt_date, appt_time, appt_difficulty,
        appt_desc, appt_pub_notes, appt_priv_notes, appt_size,
        appt_TID_1, appt_TID_2, appt_GID) {
        this.appt_key = appt_key;
        this.appt_name = appt_name;
        this.appt_date = appt_date;
        this.appt_time = appt_time;
        this.appt_difficulty = appt_difficulty;
        this.appt_desc = appt_desc;
        this.appt_pub_notes = appt_pub_notes;
        this.appt_priv_notes = appt_priv_notes;
        this.appt_size = appt_size;
        this.appt_TID_1 = appt_TID_1;
        this.appt_TID_2 = appt_TID_2;
        this.appt_GID = appt_GID;
        this.appt_micro_trainers = [];
        con.query("SELECT TID, Train_Name FROM Trainer;",
            function(err, result) {
                if (err) throw err;
                for (var i = 0; i < result.length; i++) {
                    this.appt_micro_trainers.push(new micro_trainer(result[i].TID, result[i].Train_Name));
                }
            });
    }

    // Getters, Updaters and Setters
    getName() {
        return this.appt_name;
    }

    updateName() {
        var name;
        con.query("SELECT Appt_Name FROM Appointment WHERE Appt_Key = " +
            this.appt_key + ";",
            function(err, result) {
                if (err) throw err;
                name = result[0].Appt_Name;
            })
        this.appt_name = name;
    }

    setName(name) {
        this.appt_name = name;
        con.query("UPDATE Appointment SET Appt_Name = '" + name +
            "' WHERE Appt_Key = " + this.appt_key + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getDate() {
        return this.appt_date;
    }

    updateDate() {
        var date;
        con.query("SELECT Appt_Date FROM Appointment WHERE Appt_Key = " +
            this.appt_key + ";",
            function(err, result) {
                if (err) throw err;
                date = result[0].Appt_Date;
            })
        this.appt_date = date;
    }

    setDate(date) {
        this.appt_date = date;
        con.query("UPDATE Appointment SET Appt_Date = '" + date +
            "' WHERE Appt_Key = " + this.appt_key + ";",
            function(err) {
                if (err) throw err;
            })
    }

    getTime() {
        return this.appt_time;
    }

    updateTime() {
        var time;
        con.query("SELECT Appt_Time FROM Appointment WHERE Appt_Key = " +
            this.appt_key + ";",
            function(err, result) {
                if (err) throw err;
                time = result[0].Appt_Date;
            })
        this.appt_time = time;
    }

    setTime(time) {
        this.appt_time = time;
        con.query("UPDATE Appointment SET Appt_Time = '" + time +
            "' WHERE Appt_Key = " + this.appt_key + ";",
            function(err) {
                if (err) throw err;
            })
    }

    getDifficulty() {
        return this.appt_difficulty;
    }

    updateDifficulty() {
        var diff;
        con.query("SELECT Appt_Difficulty FROM Appointment WHERE Appt_Key = " +
            this.appt_key + ";",
            function(err, result) {
                if (err) throw err;
                diff = result[0].Appt_Difficulty;
            })
        this.appt_difficulty = diff;
    }

    setDifficulty(diff) {
        this.appt_difficulty = diff;
        con.query("UPDATE Appointment SET Appt_Difficulty = '" + diff +
            "' WHERE Appt_Key = " + this.appt_key + ";",
            function(err) {
                if (err) throw err;
            })
    }

    getDescription() {
        return this.appt_desc;
    }

    updateDescription() {
        var desc;
        con.query("SELECT Appt_Description FROM Appointment WHERE Appt_Key = " +
            this.appt_key + ";",
            function(err, result) {
                if (err) throw err;
                desc = result[0].Appt_Description;
            })
        this.appt_desc = desc;
    }

    setDescription(desc) {
        this.appt_desc = desc;
        con.query("UPDATE Appointment SET Appt_Description = '" + desc +
            "' WHERE Appt_Key = " + this.appt_key + ";",
            function(err) {
                if (err) throw err;
            })
    }

    getPublicNotes() {
        return this.appt_pub_notes;
    }

    updatePublicNotes() {
        var pub_notes;
        con.query("SELECT Appt_Public_Notes FROM Appointment WHERE Appt_Key = " +
            this.appt_key + ";",
            function(err, result) {
                if (err) throw err;
                pub_notes = result[0].Appt_Public_Notes;
            })
        this.appt_pub_notes = pub_notes;
    }

    setPublicNotes(pub_notes) {
        this.appt_pub_notes = pub_notes;
        con.query("UPDATE Appointment SET Appt_Public_Notes = '" + pub_notes +
            "' WHERE Appt_Key = " + this.appt_key + ";",
            function(err) {
                if (err) throw err;
            })
    }

    getPrivateNotes() {
        return this.appt_priv_notes;
    }

    updatePrivateNotes() {
        var priv_notes;
        con.query("SELECT Appt_Private_Notes FROM Appointment WHERE Appt_Key = " +
            this.appt_key + ";",
            function(err, result) {
                if (err) throw err;
                priv_notes = result[0].Appt_Private_Notes;
            })
        this.appt_priv_notes = priv_notes;
    }

    setPrivateNotes(priv_notes) {
        this.appt_priv_notes = priv_notes;
        con.query("UPDATE Appointment SET Appt_Private_Notes = '" + priv_notes +
            "' WHERE Appt_Key = " + this.appt_key + ";",
            function(err) {
                if (err) throw err;
            })
    }

    getSize() {
        return this.appt_size;
    }

    updateSize() {
        var size;
        con.query("SELECT Appt_Size FROM Appointment WHERE Appt_Key = " +
            this.appt_key + ";",
            function(err, result) {
                if (err) throw err;
                size = result[0].Appt_Size;
            })
        this.appt_size = size;
    }

    setSize(size) {
        this.appt_size = size;
        con.query("UPDATE Appointment SET Appt_Size = '" + size +
            "' WHERE Appt_Key = " + this.appt_key + ";",
            function(err) {
                if (err) throw err;
            })
    }

    getTID1() {
        return this.appt_TID_1;
    }

    updateTID1() {
        var tid_1;
        con.query("SELECT Appt_TID_1 FROM Appointment WHERE Appt_Key = " +
            this.appt_key + ";",
            function(err, result) {
                if (err) throw err;
                tid_1 = result[0].Appt_TID_1;
            })
        this.appt_TID_1 = tid_1;
    }

    setTID1(tid_1) {
        this.appt_TID_1 = tid_1;
        con.query("UPDATE Appointment SET Appt_TID_1 = '" + tid_1 +
            "' WHERE Appt_Key = " + this.appt_key + ";",
            function(err) {
                if (err) throw err;
            })
    }

    getTID2() {
        return this.appt_TID_2;
    }

    updateTID2() {
        var tid_2;
        con.query("SELECT Appt_TID_2 FROM Appointment WHERE Appt_Key = " +
            this.appt_key + ";",
            function(err, result) {
                if (err) throw err;
                tid_1 = result[0].Appt_TID_2;
            })
        this.appt_TID_2 = tid_2;
    }

    setTID2(tid_2) {
        this.appt_TID_2 = tid_2;
        con.query("UPDATE Appointment SET Appt_TID_2 = '" + tid_2 +
            "' WHERE Appt_Key = " + this.appt_key + ";",
            function(err) {
                if (err) throw err;
            })
    }

    getGID() {
        return this.appt_GID;
    }

    updateGID() {
        var gid;
        con.query("SELECT Appt_GID FROM Appointment WHERE Appt_Key = '" +
            this.appt_key + "';",
            function(err, result) {
                if (err) throw err;
                gid = result[0].Appt_GID;
            })
        this.appt_GID = gid;
    }

    setGID(gid) {
        this.appt_GID = gid;
        con.query("UPDATE Appointment SET Appt_GID = '" + gid +
            "' WHERE Appt_Key = " + this.appt_key + ";",
            function(err) {
                if (err) throw err;
            })
    }

    delete() {
        this.updateGID();
        if (this.appt_GID != null) {
            con.query("DELETE FROM Customer_Group WHERE GID = '" + this.appt_GID + "';",
                function(err) {
                    if (err) throw err;
                })
        }
        con.query("DELETE FROM Appointment WHERE Appt_Key = " + this.appt_key + ";",
            function(err) {
                if (err) throw err;
            })
    }

    getPhoneNumbers() {
        // Get all CID's
        var CID_1, CID_2, CID_3, CID_4;
        con.query("SELECT CID_1, CID_2, CID_3, CID_4 FROM Customer_Group WHERE GID = " +
            this.appt_GID + ";",
            function(err, result) {
                if (err) throw err;
                CID_1 = result[0].CID_1;
                CID_2 = result[0].CID_2;
                CID_3 = result[0].CID_3;
                CID_4 = result[0].CID_4;
            })

        // Get Phone Numbers
        var phone = [];
        con.query("SELECT Cust_Phone_Num, Phone_Notif FROM Customer INNER JOIN Customer_Group " +
            "ON CID = Customer_Group.CID_1 WHERE Customer_Group.GID = " + this.appt_GID + ";",
            function(err, result) {
                if (err) throw err;
                var pNumber = result[0].Cust_Phone_Num.match(/\d/g) + "";
                if (result[0].Phone_Notif) phone.push(pNumber);
            })

        if (CID_2 != null) {
            con.query("SELECT Cust_Phone_Num, Phone_Notif FROM Customer INNER JOIN Customer_Group " +
                "ON CID = Customer_Group.CID_2 WHERE Customer_Group.GID = " + this.appt_GID + ";",
                function(err, result) {
                    if (err) throw err;
                    var pNumber = result[0].Cust_Phone_Num.match(/\d/g) + "";
                    if (result[0].Phone_Notif) phone.push(pNumber);
                })
        }

        if (CID_3 != null) {
            con.query("SELECT Cust_Phone_Num, Phone_Notif FROM Customer INNER JOIN Customer_Group " +
                "ON CID = Customer_Group.CID_3 WHERE Customer_Group.GID = " + this.appt_GID + ";",
                function(err, result) {
                    if (err) throw err;
                    var pNumber = result[0].Cust_Phone_Num.match(/\d/g) + "";
                    if (result[0].Phone_Notif) phone.push(pNumber);
                })
        }

        if (CID_4 != null) {
            con.query("SELECT Cust_Phone_Num, Phone_Notif FROM Customer INNER JOIN Customer_Group " +
                "ON CID = Customer_Group.CID_4 WHERE Customer_Group.GID = " + this.appt_GID + ";",
                function(err, result) {
                    if (err) throw err;
                    var pNumber = result[0].Cust_Phone_Num.match(/\d/g) + "";
                    if (result[0].Phone_Notif) phone.push(pNumber);
                })
        }

        return phone;
    }

    getEmails() {
        // Get all CID's
        var CID_1, CID_2, CID_3, CID_4;
        con.query("SELECT CID_1, CID_2, CID_3, CID_4 FROM Customer_Group WHERE GID = " +
            this.appt_GID + ";",
            function(err, result) {
                if (err) throw err;
                CID_1 = result[0].CID_1;
                CID_2 = result[0].CID_2;
                CID_3 = result[0].CID_3;
                CID_4 = result[0].CID_4;
            })

        // Get Phone Numbers
        var emails = [];
        con.query("SELECT Cust_Email_Addr FROM Customer INNER JOIN Customer_Group " +
            "ON CID = Customer_Group.CID_1 WHERE Customer_Group.GID = " + this.appt_GID + ";",
            function(err, result) {
                if (err) throw err;
                emails.push(result[0].Cust_Phone_Num);
            })

        if (CID_2 != null) {
            con.query("SELECT Cust_Email_Addr FROM Customer INNER JOIN Customer_Group " +
                "ON CID = Customer_Group.CID_2 WHERE Customer_Group.GID = " + this.appt_GID + ";",
                function(err, result) {
                    if (err) throw err;
                    emails.push(result[0].Cust_Phone_Num);
                })
        }

        if (CID_3 != null) {
            con.query("SELECT Cust_Email_Addr FROM Customer INNER JOIN Customer_Group " +
                "ON CID = Customer_Group.CID_3 WHERE Customer_Group.GID = " + this.appt_GID + ";",
                function(err, result) {
                    if (err) throw err;
                    emails.push(result[0].Cust_Phone_Num);
                })
        }

        if (CID_4 != null) {
            con.query("SELECT Cust_Email_Addr FROM Customer INNER JOIN Customer_Group " +
                "ON CID = Customer_Group.CID_4 WHERE Customer_Group.GID = " + this.appt_GID + ";",
                function(err, result) {
                    if (err) throw err;
                    emails.push(result[0].Cust_Phone_Num);
                })
        }

        return emails;
    }

    getMicroTrainers() {
        return this.appt_micro_trainers;
    }

    updateMicroTrainers() {
        var trainers = [];
        con.query("SELECT TID, Train_Name FROM Trainer;",
            function(err, result) {
                if (err) throw err;
                for (var i = 0; i < result.length; i++) {
                    trainers.push(new micro_trainer(result[i].TID, result[i].Train_Name));
                }
            })
        this.appt_micro_trainers = trainers;
    }

    sendNotifications(title, notification) {
        var emails = getEmails();
        for (var i = 0; i < emails.length; i++) {
            emailAppt(emails[i], title, notification);
        }

        // Send texts
        var phone = getPhoneNumbers();
        for (var i = 0; i < phone.length; i++) {
            textAppt(phone[i], notification);
        }
    }
}

class news {
    constructor(news_key, img_name, title, link, news_description) {
        this.news_key = news_key;
        this.img_name = img_name;
        this.title = title;
        this.link = link;
        this.news_description = news_description;
    }

    getImageName() {
        return this.img_name;
    }

    updateImageName() {
        var imgName;
        con.query("SELECT IMG_Name FROM News WHERE Key = " + this.news_key + ";",
            function(err, result) {
                if (err) throw err;
                imgName = result[0].IMG_Name;
            })
        this.img_name = imgName;
    }

    setImageName(imgName) {
        con.query("UPDATE News SET IMG_Name = '" + imgName + "' WHERE KEY = " +
            this.news_key + ";",
            function(err) {
                if (err) throw err;
            })
        this.img_name = imgName;
    }

    getTitle() {
        return this.title;
    }

    updateTitle() {
        var news_title;
        con.query("SELECT Title FROM News WHERE Key = " + this.news_key + ";",
            function(err, result) {
                if (err) throw err;
                news_title = result[0].Title;
            })
        this.title = news_title;
    }

    setTitle(news_title) {
        con.query("UPDATE News SET Title = '" + news_title + "' WHERE KEY = " +
            this.news_key + ";",
            function(err) {
                if (err) throw err;
            })
        this.title = news_title;
    }

    getLink() {
        return this.link;
    }

    updateLink() {
        var news_link;
        con.query("SELECT Link FROM News WHERE Key = " + this.news_key + ";",
            function(err, result) {
                if (err) throw err;
                news_link = result[0].Link;
            })
        this.link = news_link;
    }

    setLink(news_link) {
        con.query("UPDATE News SET Link = '" + news_link + "' WHERE KEY = " +
            this.news_key + ";",
            function(err) {
                if (err) throw err;
            })
        this.link = news_link;
    }

    getNewsDescription() {
        return this.news_description;
    }

    updateNewsDescription() {
        var description;
        con.query("SELECT News_Description FROM News WHERE Key = " + this.news_key + ";",
            function(err, result) {
                if (err) throw err;
                description = result[0].News_Description;
            })
        this.news_description = description;
    }

    setNewsDescription(description) {
        con.query("UPDATE News SET IMG_Name = '" + description + "' WHERE KEY = " +
            this.news_key + ";",
            function(err) {
                if (err) throw err;
            })
        this.news_description = description;
    }

    delete() {
        con.query("DELETE FROM News WHERE Key = " + this.news_key + ";",
            function(err) {
                if (err) throw err;
            })
    }
}

class admin {
    constructor(admin_id) {
        this.admin_id = admin_id;

        // Get simple values
        con.query("SELECT Train_Name, Train_Address, Train_Phone_Num, Train_Email_Addr, Train_Emer_Name, " +
            "Train_Emer_Num FROM Trainer WHERE TID = " + this.admin_id + ";",
            function(err, result) {
                if (err) throw err;
                this.admin_name = result[0].Train_Name;
                this.address = result[0].Train_Address;
                this.phone = result[0].Train_Phone_Num;
                this.email = result[0].Train_Email_Addr;
                this.emer_name = result[0].Train_Emer_Name;
                this.emer_num = result[0].Train_Emer_Num;
            });

        // Get Mini-Customer List
        var customers = [];
        con.query("SELECT * FROM Customer;",
            function(err, result) {
                if (err) throw err;
                for (var i = 0; i < result.length; i++) {
                    customers.push(new mini_customer(result[i].CID, result[i].Cust_Name,
                        result[i].Cust_Address, result[i].Cust_Phone_Num,
                        result[i].Cust_Email_Addr, result[i].Cust_Emer_Name,
                        result[i].Cust_Emer_Num, result[i].Difficulty,
                        result[i].Phone_Notif));
                };
            });

        // Get Mini-Trainer List
        var trainers = [];
        con.query("SELECT TID, Train_Name, Train_Address, Train_Phone_Num, Train_Email_Addr, " +
            "Train_Emer_Name, Train_Emer_Num, Admin FROM Trainer;",
            function(err, result) {
                if (err) throw err;
                for (var i = 0; i < result.length; i++) {
                    trainers.push(new mini_trainer(result[i].TID, result[i].Train_Name,
                        result[i].Train_Address, result[i].Train_Phone_Num,
                        result[i].Train_Email_Addr, result[i].Train_Emer_Name,
                        result[i].Train_Emer_Num, result[i].Admin));
                };
            });

        // Get All Appointments
        var calendar = [];
        con.query("SELECT * FROM Appointment;", function(err, result) {
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                calendar.push(new admin_appt(result[i].Appt_Key, result[i].Appt_Name,
                    result[i].Appt_Date, result[i].Appt_Time, result[i].Appt_Difficulty,
                    result[i].Appt_Description, result[i].Appt_Public_Notes,
                    result[i].Appt_Private_Notes, result[i].Appt_Size, result[i].Appt_TID_1,
                    result[i].Appt_TID_2, result[i].Appt_GID));
            };
        });

        // Get All News
        var admin_news = [];
        con.query("SELECT * FROM News;", function(err, result) {
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                admin_news.push(new news(result[i].Key, result[i].IMG_Name,
                    result[i].Title, result[i].Link, result[i].News_Description));
            }
        })
    }

    // Getters and setters
    getName() {
        return this.trainer_name;
    }

    updateName() {
        var name;
        con.query("SELECT Train_Name FROM Trainer WHERE TID = '" +
            this.trainer_id + "';",
            function(err, result) {
                if (err) throw err;
                name = result[0].Train_Name;
            })
        this.trainer_name = name;
    }

    setName(name) {
        this.admin_name = name;
        con.query("UPDATE Trainer SET Train_Name = '" + name +
            "' WHERE TID = " + this.admin_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getAddress() {
        return this.address;
    }

    updateAddress() {
        var address;
        con.query("SELECT Train_Address FROM Trainer WHERE TID = '" +
            this.trainer_id + "';",
            function(err, result) {
                if (err) throw err;
                address = result[0].Train_Address;
            })
        this.address = address;
    }

    setAddress(address) {
        this.address = address;
        con.query("UPDATE Trainer SET Train_Address = '" + address +
            "' WHERE TID = " + this.admin_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getPhone() {
        return this.phone;
    }

    updatePhone() {
        var phone;
        con.query("SELECT Train_Phone_Num FROM Trainer WHERE TID = '" +
            this.trainer_id + "';",
            function(err, result) {
                if (err) throw err;
                phone = result[0].Train_Phone_Num;
            })
        this.phone = phone;
    }

    setPhone(phone) {
        this.phone = phone;
        con.query("UPDATE Trainer SET Train_Phone_Number = '" + phone +
            "' WHERE TID = " + this.admin_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getEmail() {
        return this.email;
    }

    updateEmail() {
        var email;
        con.query("SELECT Train_Email_Addr FROM Trainer WHERE TID = '" +
            this.trainer_id + "';",
            function(err, result) {
                if (err) throw err;
                email = result[0].Train_Email_Addr;
            })
        this.email = email;
    }

    setEmail(email) {
        this.email = email;
        con.query("UPDATE Trainer SET Train_Email_Addr = '" + email +
            "' WHERE TID = " + this.admin_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getEmerName() {
        return this.emer_name;
    }

    updateEmerName() {
        var emerName;
        con.query("SELECT Train_Emer_Name FROM Trainer WHERE TID = '" +
            this.trainer_id + "';",
            function(err, result) {
                if (err) throw err;
                emerName = result[0].Train_Emer_Name;
            })
        this.emer_name = emerName;
    }

    setEmerName(name) {
        this.emer_name = name;
        con.query("UPDATE Trainer SET Train_Emer_Name = '" + name +
            "' WHERE TID = " + this.admin_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getEmerPhone() {
        return this.emer_num;
    }

    updateEmerPhone() {
        var emerPhone;
        con.query("SELECT Train_Emer_Num FROM Trainer WHERE TID = '" +
            this.trainer_id + "';",
            function(err, result) {
                if (err) throw err;
                emerPhone = result[0].Train_Emer_Num;
            })
        this.emer_num = emerPhone;
    }

    setEmerPhone(phone) {
        this.emer_num = phone;
        con.query("UPDATE Trainer SET Train_Emer_Num = '" + phone +
            "' WHERE TID = " + this.admin_id + ";",
            function(err) {
                if (err) throw err;
            });
    }

    getCalendar() {
        return this.calendar;
    }

    updateCalendar() {
        this.calendar = [];
        con.query("SELECT * FROM Appointment;", function(err, result) {
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                this.calendar.push(new admin_appt(result[i].Appt_Key, result[i].Appt_Name,
                    result[i].Appt_Date, result[i].Appt_Time, result[i].Appt_Difficulty,
                    result[i].Appt_Description, result[i].Appt_Public_Notes,
                    result[i].Appt_Private_Notes, result[i].Appt_Size, result[i].Appt_TID_1,
                    result[i].Appt_TID_2, result[i].Appt_GID));
            };
        });
    }

    createTrainer(tr_name, tr_addr, tr_phone, tr_email, tr_econ, tr_enum) {
        // If any values are empty set null;
        if (tr_addr == '') tr_addr = null;
        if (tr_econ == '') tr_econ = null;
        if (tr_enum == '') tr_enum = null;

        // Insert into Trainer table
        con.query("INSERT INTO Trainer (Train_Name, Train_Address, Train_Phone_Num, Train_Email_Addr, Train_Emer_Name, Train_Emer_Num) VALUES ('" +
            tr_name + "', '" + tr_addr + "', '" + tr_phone + "', " + tr_email + "', '" + tr_econ + "', '" + tr_enum + "');",
            function(err) {
                if (err) throw err;
            })

        // Get TID
        var TID;
        con.query("SELECT TID FROM Trainer WHERE Train_Name = " +
            tr_name + ";",
            function(err, result) {
                if (err) throw err;
                TID = result[0].TID;
            })

        // Update Login
        con.query("INSERT INTO Login (Email, Log_Password, TID) VALUES ('" +
            tr_email + "', 'P@ssw0rd', " + TID + ");",
            function(err) {
                if (err) throw err;
            })

        // Add mini trainer
        trainers.push(new mini_trainer(TID, tr_name, tr_addr, tr_phone, tr_email, tr_econ, tr_enum, false));
    }

    createAppointment(appt_name, appt_date, appt_time, appt_difficulty, appt_desc, appt_pub_notes, appt_priv_notes, appt_size, appt_TID_1, appt_TID_2) {
        4
        // Reconfigure default values
        if (appt_difficulty == '') appt_difficulty = 0;
        if (appt_desc == '') appt_desc = null;
        if (appt_pub_notes == '') appt_pub_notes = null;
        if (appt_priv_notes == '') appt_priv_notes = null;
        if (appt_size == '') appt_size = 1;
        if (appt_TID_1 == '') appt_TID_1 = null;
        if (appt_TID_2 == '') appt_TID_2 = null;

        // Insert appointment
        con.query("INSERT INTO Appointment (Appt_Name, Appt_Date, Appt_Time, Appt_Difficulty, " +
            "Appt_Description, Appt_Public_Notes, Appt_Private_Notes, Appt_Size, Appt_TID_1, Appt_TID_2, Appt_GID) " +
            "VALUES ('" + appt_name + "', '" + appt_date + "', '" + appt_time + "', '" +
            appt_difficulty + "', '" + appt_desc + "', '" + appt_pub_notes + "', '" +
            appt_priv_notes + "', '" + appt_size + "', '" + appt_TID_1 + "', '" +
            appt_TID_2 + "', null);",
            function(err) {
                if (err) throw err;
            })

        // Get appt key
        var appt_key;
        con.query("SELECT Appt_Key FROM Appointment ORDER BY Appt_Key DESC LIMIT 1;", function(err, result) {
            if (err) throw err;
            appt_key = result[0].Appt_Key;
        })

        // Add appointment to calendar
        calendar.push(new admin_appt(appt_key, appt_name, appt_date, appt_time, appt_difficulty,
            appt_desc, appt_pub_notes, appt_priv_notes, appt_size, appt_TID_1, appt_TID_2, null));
    }

    createNews(news_name, news_title, news_link, description) {
        if (description == '') description = null;
        admin_news.push(new news(news_name, news_title, news_link, description));

        while (admin_news.length > 5) {
            admin_news[0].delete();
            admin_news = [];
            con.query("SELECT * FROM News;", function(err, result) {
                if (err) throw err;
                for (var i = 0; i < result.length; i++) {
                    admin_news.push(new news(result[i].Key, result[i].IMG_Name,
                        result[i].Title, result[i].Link, result[i].News_Description));
                }
            })
        }
    }
}

// TODO: Change login? We need a way to return that the user is cust, trainer, or admin
// Add getType to classes? Call user.getType() after generation to get type then load?

login = (email, passwrd) => {
    var CID = null;
    var TID = null;
    var administrator;
    var user;
    con.query("SELECT * FROM Login WHERE Email = '" + email + "' " +
        "AND Log_Password = '" + passwrd + "';",
        function(err, result) {
            if (err) throw err;

            // If login values match
            if (result != NULL) {
                // If Customer
                if (result[0].CID = !NULL) {
                    CID = result[0].CID;
                }

                // If Trainer
                else if (result[0].TID != NULL) {
                    TID = result[0].TID;
                };
            };
        });
    if (CID != null) {
        user = new customer(CID);
    } else {
        con.query("SELECT Admin FROM Trainer WHERE TID = " + TID + ";",
            function(err, result) {
                if (err) throw err;
                administrator = result[0].Admin;
            });
        if (administrator) user = new admin(TID);
        else user = new trainer(TID);
    }

    return user;
}
con.end();