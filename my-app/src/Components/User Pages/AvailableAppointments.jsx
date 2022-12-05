import React, { useState } from 'react';
import AppointmentPill from './AppointmentPill';
import './styles.css'

const AvailableAppointments = ({ availableAppointments, userPermissions, UserInfo }) => {
    let trainersList = [];

    // Set TrainersList with unique values
    availableAppointments.forEach(appointment => {trainersList.indexOf(appointment.trainerNames) === -1 && trainersList.push(appointment.trainerNames)});

    // Create Pills
    const pills = trainersList.map(trainerName => <div> <AppointmentPill UserInfo={UserInfo} trainerName={trainerName} availableAppointments={availableAppointments} userPermissions={userPermissions}/></div> );

    return (
        <div style={{display: 'flex', marginLeft: 'calc(50% - 350px)', paddingBottom: '66px'}}>{pills}</div>
    )
}

export default AvailableAppointments;