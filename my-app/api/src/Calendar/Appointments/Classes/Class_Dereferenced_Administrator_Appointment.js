/**
 * @param:
 * appointment_name,
 * appointment_date,
 * appointment_start_time,
 * appointemnt_end_time,
 * appointment_riding_style,
 * appointment_difficulty,
 * appointment_description,
 * appointment_public_notes,
 * appointment_private_notes,
 * appointment_group,
 * appointment_group_size,
 * appointment_TID_1,
 * appointment_TID_2,
 * appointment_GID,
 * appointment_micro_trainers
 */
class dereferenced_administrator_appointment {
    // Constructor
    constructor(
        appointment_name,
        appointment_date,
        appointment_start_time,
        appointment_end_time,
        appointment_riding_style,
        appointment_difficulty,
        appointment_description,
        appointment_public_notes,
        appointment_private_notes,
        appointment_group,
        appointment_group_size,
        appointment_TID_1,
        appointment_TID_2,
        appointment_GID)

    {
        this.appointment_name = appointment_name;
        this.appointment_date = appointment_date;
        this.appointment_start_time = appointment_start_time;
        this.appointment_end_time = appointment_end_time;
        this.appointment_riding_style = appointment_riding_style;
        this.appointment_difficulty = appointment_difficulty;
        this.appointment_description = appointment_description;
        this.appointment_public_notes = appointment_public_notes;
        this.appointment_private_notes = appointment_private_notes;
        this.appointment_group = appointment_group;
        this.appointment_group_size = appointment_group_size;
        this.appointment_TID_1 = appointment_TID_1;
        this.appointment_TID_2 = appointment_TID_2;
        this.appointment_GID = appointment_GID;
    }

    // Getters
    Get_Appointment_Name() {
        return this.appoinment_name;
    }

    Get_Appointment_Date() {
        return this.appointment_date;
    }

    Get_Start_Time() {
        return this.appointment_start_time;
    }

    Get_End_Time() {
        return this.appointment_end_time;
    }

    Get_Riding_Style() {
        return this.appointment_riding_style;
    }

    Get_Difficulty() {
        return this.appointment_difficulty;
    }

    Get_Description() {
        return this.appointment_description;
    }

    Get_Public_Notes() {
        return this.appointment_public_notes;
    }

    Get_Private_Notes() {
        return this.appointment_public_notes;
    }

    Get_Group() {
        return this.appointment_group;
    }

    Get_Group_Size() {
        return this.appointment_group_size;
    }

    Get_TID_1() {
        return this.appointment_TID_1;
    }

    Get_TID_2() {
        return this.appointment_TID_2;
    }

    Get_GID() {
        return this.appointment_GID;
    }
}

module.exports = dereferenced_administrator_appointment;