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

    // Getters and Updaters
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

module.exports = {
    customer_appt: customer_appt
}