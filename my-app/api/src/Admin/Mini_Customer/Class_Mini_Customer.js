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

    getAddress() {
        return this.cust_addr;
    }

    getPhone() {
        return this.cust_phone;
    }

    getEmail() {
        return this.cust_email;
    }

    getEmerName() {
        return this.cust_econ;
    }

    getEmerNum() {
        return this.cust_econ_phone;
    }

    getDifficulty() {
        return this.cust_diff;
    }

    getNotifications() {
        return this.cust_notif;
    }

    // Setters
    setDifficulty(diff) {
        this.cust_diff = diff;
    }
}

module.exports = {
    mini_customer: mini_customer
}