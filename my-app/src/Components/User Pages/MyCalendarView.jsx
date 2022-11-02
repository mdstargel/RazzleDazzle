import React, { useState } from 'react';
import './styles.css'

const MyCalendarView = ({ UserSchdeule, userPermissions }) => {
    let sundayAppointments = [];
    let mondayAppointments = [];
    let tuesdayAppointments = [];
    let wednesdayAppointments = [];
    let thursdayAppointments = [];
    let fridayAppointments = [];
    let saturdayAppointments = [];

    const CustomerAppointmentPill = ({ appointment, dayStyle }) => {        
        return (
            <div className={dayStyle}>
                <div>{appointment.date}</div>
                <hr></hr>
                <div>Time: {appointment.startTime}-{appointment.endTime}</div>
                <div>Style: {appointment.ridingStyle}</div>
                <div>{appointment.isGroup ? 'Group' : 'Individual'}</div>
                {(userPermissions.isTrainer || userPermissions.isAdmin) && <div>{appointment.isGroup && appointment.remainingSpots}</div>}
            </div>);
    };
const AppointmentsByDay = () => {
    // Customer Schedule and Trainer Schedule
    UserSchdeule.forEach(appointment => {
        // Convert date into a day of the week

        const parts = appointment.date.split("/");
        const dayOfWeeek = new Date(parts[2], parts[1] - 1, parts[0]).getDay();
        
        /**
         * Sunday   0    
         * Monday   1
         * Tuesday  2
         * Wednesday3
         * Thursday 4
         * Friday   5
         * Saturday 6
         */
        console.log(dayOfWeeek, appointment);
        if (dayOfWeeek === 0) {
            // sundayAppointments.push(appointment);
        } else if (dayOfWeeek === 1) {
            // mondayAppointments.push(appointment);
        } else if (dayOfWeeek === 2) {
            tuesdayAppointments.push(appointment);
        } else if (dayOfWeeek === 3) {
            // Monday
            // mondayAppointments.push(appointment);
        } else if (dayOfWeeek === 4) {
            // Wednesday *
        } else if (dayOfWeeek === 5) {
            // Thursday *
            // thursdayAppointments.push(appointment)
            wednesdayAppointments.push(appointment);
        } else if (dayOfWeeek === 6) {
            // Saturday
            // saturdayAppointments.push(appointment);
        }

    });
    // console.log(saturdayAppointments);
    const mondayPills = mondayAppointments.map(appointment => <CustomerAppointmentPill appointment={appointment} dayStyle='customerAppointmentPill mondayPill'></CustomerAppointmentPill>);
    const tuesdayPills = tuesdayAppointments.map(appointment => <CustomerAppointmentPill appointment={appointment} dayStyle='customerAppointmentPill mondayPill'></CustomerAppointmentPill>);
    const wednesdayPills = wednesdayAppointments.map(appointment => <CustomerAppointmentPill appointment={appointment} dayStyle='customerAppointmentPill mondayPill'></CustomerAppointmentPill>);
    const thursdayPills = thursdayAppointments.map(appointment => <CustomerAppointmentPill appointment={appointment} dayStyle='customerAppointmentPill mondayPill'></CustomerAppointmentPill>);
    const fridayPills = fridayAppointments.map(appointment => <CustomerAppointmentPill appointment={appointment} dayStyle='customerAppointmentPill mondayPill'></CustomerAppointmentPill>);
    const saturdayPills = saturdayAppointments.map(appointment => <CustomerAppointmentPill appointment={appointment} dayStyle='customerAppointmentPill saturdayPill'></CustomerAppointmentPill>);
    const sundayPills = sundayAppointments.map(appointment => <CustomerAppointmentPill appointment={appointment} dayStyle='customerAppointmentPill saturdayPill'></CustomerAppointmentPill>);

    // console.log(saturdayPills);
    return (
        <div style={{marginTop: '100px'}}>
            <div style={{ marginLeft: '10px', position: 'absolute' }}>Monday {mondayPills}</div>
            <div style={{ marginLeft: '250px', position: 'absolute'}}>Tuesday {tuesdayPills}</div>
            <div style={{ marginLeft: '500px', position: 'absolute' }}>Wednesday {wednesdayPills}</div>
            <div style={{ marginLeft: '750px', position: 'absolute' }}>Thursday {thursdayPills}</div>
            <div style={{ marginLeft: '900px', position: 'absolute'}}>Friday {fridayPills}</div>
            <div style={{ marginLeft: '1150px', position: 'absolute' }}>Saturday {saturdayPills}</div>
            <div style={{ marginLeft: '1400px', position: 'absolute' }}>Sunday {sundayPills}</div>
        </div>)
    };
    
    return (<AppointmentsByDay></AppointmentsByDay>)
}

export default MyCalendarView;