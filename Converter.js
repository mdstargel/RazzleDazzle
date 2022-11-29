function Convert_Appointment(appointment) {
    var date_array = appointment.appointment_date.split("-");
    var new_date = date_array[1] + "/" + date_array[2] + "/" + date_array[0];

    var new_start_time = appointment.appointment_start_time + "";
    var new_end_time = appointment.appointment_end_time + "";

    var start_time_array = new_start_time.split(":");
    var end_time_array = new_end_time.split(":");
    var start_time;
    var end_time;

    if (start_time_array[0] > 0 &&
        start_time_array[0] < 12) {
        if (start_time_array[1] != 0) {
            start_time = start_time_array[0] + ":" + start_time_array[1];
        } else {
            start_time = start_time_array[0] + "";
        }
        start_time += "am";
    } else {
        start_hour = start_time_array[0] - 12;
        if (start_time_array[1] != 0) {
            start_time = start_hour + ":" + start_time_array[1];
        } else {
            start_time = start_hour + "";
        }
        start_time += "pm";
    }

    if (end_time_array[0] > 0 &&
        end_time_array[0] < 12) {
        if (end_time_array[1] != 0) {
            end_time = end_time_array[0] + ":" + end_time_array[1];
        } else {
            end_time = end_time_array[0] + "";
        }
        end_time += "am";
    } else {
        end_hour = end_time_array[0] - 12;
        if (end_time_array[1] != 0) {
            end_time = end_hour + ":" + end_time_array[1];
        } else {
            end_time = end_hour + "";
        }
        end_time += "pm";
    }

    var group = true;
    var trainee = true;
    if (appointment.appointment_group == 0) group = false;
    if (appointment.appointment_TID_2 == 5) trainee = false;

    var reserved = true;
    if (appointment.appointment_reserved == false ||
        appointment.appointment_reserved == undefined) reserved = false;

    new_appointment = {
        appointmentId: appointment.AID,
        date: new_date,
        startTime: start_time,
        endTIme: end_time,
        ridingStyle: appointment.appointment_riding_style,
        ridingLevel: appointment.appointment_difficulty,
        isGroup: group,
        signedUp: reserved,
        remainingSpots: appointment.appointment_group_size,
        hasTrainee: trainee,
        PubicNotes: appointment.appointment_public_notes,
        PrivateNotes: appointment.appointment_private_notes
    }

    return new_appointment;
}