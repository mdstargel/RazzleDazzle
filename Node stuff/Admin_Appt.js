let mTrainer = require('./Micro_Trainer');
let micro_trainer = mTrainer.micro_trainer;

const { nodemailer, transporter, emailAppt, textAppt } = require('./Notifications');

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

module.exports = {
    admin_appt: admin_appt
}