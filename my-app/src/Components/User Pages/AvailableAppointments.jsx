import React, { useState } from 'react';
import AppointmentPill from './AppointmentPill';
import './styles.css'

const AvailableAppointments = ({ availableAppointments, userPermissions }) => {
    let trainersList = [];

    // Set TrainersList with unique values
    availableAppointments.forEach(appointment => {trainersList.indexOf(appointment.trainerNames) === -1 && trainersList.push(appointment.trainerNames)});

    // Create Pills
    const pills = trainersList.map(trainerName => <div> <AppointmentPill trainerName={trainerName} availableAppointments={availableAppointments} userPermissions={userPermissions}/></div> );

    return (
        <div>{pills}</div>
    )
}

export default AvailableAppointments;