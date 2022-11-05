const { nodemailer, transporter, emailAppt, textAppt } = require('./Notifications');

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

module.exports = {
    mini_customer: mini_customer
}