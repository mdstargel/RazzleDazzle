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
        appt_description, appt_pub_notes, appt_priv_notes) {
        this.appt_key = appt_key;
        this.appt_name = appt_name;
        this.appt_date = appt_date;
        this.appt_time = appt_time;
        this.appt_description = appt_description;
        this.appt_pub_notes = appt_pub_notes;
        this.appt_priv_notes = appt_priv_notes;
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
    }

    getPrivateNotes() {
        return this.appt_priv_notes;
    }

    setPrivateNotes(notes) {
        this.appt_priv_notes = notes;
    }
}

module.exports = {
    trainer_appt: trainer_appt
}