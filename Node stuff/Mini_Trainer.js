const { nodemailer, transporter, emailAppt, textAppt } = require('./Notifications');

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

module.exports = {
    mini_trainer: mini_trainer
}