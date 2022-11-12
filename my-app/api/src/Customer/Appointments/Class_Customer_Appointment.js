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
    constructor(appt_key, appt_name, appt_date, appt_time, appt_end_time,
        appt_type, appt_description, appt_pub_notes, appt_group_size,
        appt_reserved) {
        this.appt_key = appt_key;
        this.appt_name = appt_name;
        this.appt_date = appt_date;
        this.appt_time = appt_time;
        this.appt_end_time = appt_end_time;
        this.appt_type = appt_type;
        this.appt_description = appt_description;
        this.appt_pub_notes = appt_pub_notes;
        this.appt_group_size = appt_group_size;
        this.appt_reserved = appt_reserved;
    }

    // Getters and Setters
    getApptKey() {
        return this.appt_key;
    }

    getName() {
        return this.appt_name;
    }

    setName(name) {
        this.appt_name = name;
    }

    getDate() {
        return this.appt_date;
    }

    setDate(date) {
        this.appt_date = date;
    }

    getTime() {
        return this.appt_time;
    }

    setTime(time) {
        this.appt_time = time;
    }

    getEndTime() {
        return this.appt_end_time;
    }

    setEndTime(end_time) {
        this.appt_end_time = end_time;
    }

    getType() {
        return this.appt_type;
    }

    setType(ap_type) {
        this.appt_type = ap_type;
    }

    getDescription() {
        return this.appt_description;
    }

    setDescription(description) {
        this.appt_description = description;
    }

    getPublicNotes() {
        return this.appt_pub_notes;
    }

    setPublicNotes(pub_notes) {
        this.appt_pub_notes = pub_notes;
    }

    getGroupSize() {
        return this.appt_group_size;
    }

    setGroupSize(group) {
        this.appt_group_size = group;
    }

    getReserved() {
        return this.appt_reserved;
    }

    setReserved(reserve) {
        this.appt_reserved = reserve;
        if (reserve) this.appt_group_size--;
        else this.appt_group_size++;

    }
}

module.exports = {
    customer_appt: customer_appt
}