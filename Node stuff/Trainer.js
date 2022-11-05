let appt = require('./Trainer_Appt');
let trainer_appt = appt.trainer_appt;

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

module.exports = {
    trainer: trainer
}