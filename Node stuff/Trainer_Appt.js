const { nodemailer, transporter, emailAppt, textAppt } = require('./Notifications');

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

module.exports = {
    trainer_appt: trainer_appt
}