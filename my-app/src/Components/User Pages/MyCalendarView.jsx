import React, { useState } from 'react';
import CalendarEditButton from '../Buttons/CalendarEditButton';
import CalendarCancelButton from '../Buttons/CalendarCancelButton';
import EditAppointment from './EditAppointment';
// import AppointmentPill from './AppointmentPill';
import './styles.css'

const MyCalendarView = ({ UserSchdeule, userPermissions }) => {
    const [modifyAppointment, setModifyAppointment] = useState();
    const handleRemoveAppointment = ({appointment}) => {
        /**
         * Send data to APIs
         */
        console.log(appointment.appointmentId);
    }
    const CustomerAppointmentPill = ({ appointment, dayStyle }) => {        
        return (
            <div className={dayStyle}>
                <div>{appointment.date}</div>
                <hr></hr>
                <div>Time: {appointment.startTime}-{appointment.endTime}</div>
                <div>Style: {appointment.ridingStyle}</div>
                <div>{appointment.isGroup ? 'Group' : 'Individual'}</div>
                <div>{appointment.isGroup && appointment.remainingSpots}</div>
                {(userPermissions.isAdmin || userPermissions.isTrainer) && <CalendarEditButton onClick={() => setModifyAppointment(<EditAppointment appointment={appointment} setModifyAppointment={setModifyAppointment}/>)}/>}
                <CalendarCancelButton setModifyAppointment={setModifyAppointment} onClick={() => handleRemoveAppointment({appointment})} />
            </div>);
    };
const AppointmentsByDay = () => {
    let sundayAppointments = [];
    let mondayAppointments = [];
    let tuesdayAppointments = [];
    let wednesdayAppointments = [];
    let thursdayAppointments = [];
    let fridayAppointments = [];
    let saturdayAppointments = [];
    
    // Customer Schedule and Trainer Schedule
    UserSchdeule.forEach(appointment => {
        // Convert date into a day of the week
        const parts = appointment.date.split("/");

        const dayOfWeeek = new Date(parts[2], parts[0] - 1, parts[1]).getDay();
        
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
            sundayAppointments.push(appointment);
        } else if (dayOfWeeek === 1) {
            mondayAppointments.push(appointment);
        } else if (dayOfWeeek === 2) {
            tuesdayAppointments.push(appointment);
        } else if (dayOfWeeek === 3) {
            wednesdayAppointments.push(appointment);
        } else if (dayOfWeeek === 4) {
            console.log('Before', thursdayAppointments)
            thursdayAppointments.push(appointment)
            console.log('After', thursdayAppointments)
        } else if (dayOfWeeek === 5) {
            fridayAppointments.push(appointment);
        } else if (dayOfWeeek === 6) {
            saturdayAppointments.push(appointment);
        }

    });

    const mondayPills = mondayAppointments.map(appointment => <CustomerAppointmentPill appointment={appointment} dayStyle='customerAppointmentPill monPill'></CustomerAppointmentPill>);
    const tuesdayPills = tuesdayAppointments.map(appointment => <CustomerAppointmentPill appointment={appointment} dayStyle='customerAppointmentPill tuePill'></CustomerAppointmentPill>);
    const wednesdayPills = wednesdayAppointments.map(appointment => <CustomerAppointmentPill appointment={appointment} dayStyle='customerAppointmentPill wedPill'></CustomerAppointmentPill>);
    const thursdayPills = thursdayAppointments.map(appointment => <CustomerAppointmentPill appointment={appointment} dayStyle='customerAppointmentPill thuPill'></CustomerAppointmentPill>);
    const fridayPills = fridayAppointments.map(appointment => <CustomerAppointmentPill appointment={appointment} dayStyle='customerAppointmentPill friPill'></CustomerAppointmentPill>);
    const saturdayPills = saturdayAppointments.map(appointment => <CustomerAppointmentPill appointment={appointment} dayStyle='customerAppointmentPill satPill'></CustomerAppointmentPill>);
    const sundayPills = sundayAppointments.map(appointment => <CustomerAppointmentPill appointment={appointment} dayStyle='customerAppointmentPill sunPill'></CustomerAppointmentPill>);

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
    
    return (
        <div>
            <AppointmentsByDay />
            {modifyAppointment}
        </div>)
}

export default MyCalendarView;