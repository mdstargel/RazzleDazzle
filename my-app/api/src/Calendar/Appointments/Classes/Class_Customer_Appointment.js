/**
 * @param:
 * AID,
 * appointment_name,
 * appointment_date,
 * appointment_start_time,
 * appointemnt_end_time,
 * appointment_riding_style,
 * appointment_description,
 * appointment_public_notes,
 * appointment_group,
 * appointment_group_size,
 * appointment_TID_1,
 * appointment_TID_2,
 * appointment_reserved
 */
class customer_appointment {
    // Constructor
    constructor(
        AID,
        appointment_name,
        appointment_date,
        appointment_start_time,
        appointment_end_time,
        appointment_riding_style,
        appointment_description,
        appointment_public_notes,
        appointment_group,
        appointment_group_size,
        appointment_TID_1,
        appointment_TID_2,
        appointment_reserved)

    {
        this.AID = AID;
        this.appointment_name = appointment_name;
        this.appointment_date = appointment_date;
        this.appointment_start_time = appointment_start_time;
        this.appointment_end_time = appointment_end_time;
        this.appointment_riding_style = appointment_riding_style;
        this.appointment_description = appointment_description;
        this.appointment_public_notes = appointment_public_notes;
        this.appointment_group = appointment_group;
        this.appointment_group_size = appointment_group_size;
        this.appointment_TID_1 = appointment_TID_1;
        this.appointment_TID_2 = appointment_TID_2;
        this.appointment_reserved = appointment_reserved;
    }

    // Getters and Setters
    Get_AID() {
        return this.AID;
    }

    Get_Appointment_Name() {
        return this.appoinment_name;
    }

    Set_Appointment_Name(appointment_name) {
        this.appoinment_name = appointment_name;
    }

    Get_Appointment_Date() {
        return this.appointment_date;
    }

    Set_Appointment_Date(appointment_date) {
        this.appointment_date = appointment_date;
    }

    Get_Start_Time() {
        return this.appointment_start_time;
    }

    Set_Start_Time(appointment_start_time) {
        this.appointment_start_time = appointment_start_time;
    }

    Get_End_Time() {
        return this.appointment_end_time;
    }

    Set_End_Time(appointment_end_time) {
        this.appointment_end_time = appointment_end_time;
    }

    Get_Riding_Style() {
        return this.appointment_riding_style;
    }

    Set_Riding_Style(appointment_riding_style) {
        this.appointment_riding_style = appointment_riding_style;
    }

    Get_Description() {
        return this.appointment_description;
    }

    Set_Description(appointment_description) {
        this.appointment_description = appointment_description;
    }

    Get_Public_Notes() {
        return this.appointment_public_notes;
    }

    Set_Public_Notes(appointment_public_notes) {
        this.appointment_public_notes = appointment_public_notes;
    }

    Get_Group() {
        return this.appointment_group;
    }

    Set_Group(appointment_group) {
        this.appointment_group = appointment_group;
    }

    Get_Group_Size() {
        return this.appointment_group_size;
    }

    Set_Group_Size(appointment_group_size) {
        this.appointment_group_size = appointment_group_size;
    }

    Get_TID_1() {
        return this.appointment_TID_1;
    }

    Set_TID_1(appointment_TID_1) {
        this.appointment_TID_1 = appointment_TID_1;
    }

    Get_TID_2() {
        return this.appointment_TID_2;
    }

    Set_TID_2(appointment_TID_2) {
        this.appointment_TID_2 = appointment_TID_2;
    }

    Get_Reserved() {
        return this.appointment_reserved;
    }

    Set_Reserved(appointment_reserved) {
        this.appointment_reserved = appointment_reserved;
        if (appointment_reserved) this.appointment_group_size--;
        else this.appointment_group_size++;
    }
}

module.exports = customer_appointment;