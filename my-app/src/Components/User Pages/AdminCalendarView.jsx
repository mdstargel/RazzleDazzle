import React, { useState } from 'react';
import axios from 'axios';

import CalendarEditButton from '../Buttons/CalendarEditButton';
import CalendarCancelButton from '../Buttons/CalendarCancelButton';
import EditAppointment from './EditAppointment';
// import AppointmentPill from './AppointmentPill';
import './styles.css'


const AdminCalendarView = ({ UserSchdeule, userPermissions }) => {
    const [modifyAppointment, setModifyAppointment] = useState();
    const handleRemoveAppointment = ({appointment}) => {
        /**
         * Send data to APIs
         */
        console.log(appointment.appointmentId);
    }

    const CustomerAppointmentPill = ({ appointment, dayStyle }) => {    
        const [showIndividualAppointment, setShowIndividualAppointment] = useState(false);
        // const [hidePill, setHidePill] = useState(false);
        const [isCancled, setCanceled] = useState(false);
        function handleCancelAppointment() {
            axios.post('/Admin/Calendar/Delete_Appointment', {"appointment_id": appointment.appointmentId}).then(resp => { })
            console.log(appointment.appointmentId)
            setCanceled(true);
        };
        return (
            !isCancled && <div className='appointmentPill'>
                <div onClick={() => setShowIndividualAppointment(!showIndividualAppointment)} className={showIndividualAppointment ? 'selectedAppointmentTitle' : 'appointmentTitle'}>
                    {appointment.isGroup ? 'Group' : 'Individual'} {appointment.ridingStyle} {appointment.startTime}-{appointment.endTime}
                </div>
                {/* Show appointment information here */}
                {showIndividualAppointment && < div className='appointmentInfo'>
                    <div>Date: {appointment.date}</div>
                    <div>Spots Left: {appointment.remainingSpots}</div>
                    <CalendarEditButton onClick={() => setModifyAppointment(<EditAppointment appointment={appointment} setModifyAppointment={setModifyAppointment}/>)}/>
                    <CalendarCancelButton setModifyAppointment={setModifyAppointment} onClick={() => handleCancelAppointment()} />
                </div>}
            </div>
        );
    };
    const AppointmentsByDay = ({trainerName}) => {
        
        // Loop through each person here
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
            if (appointment.trainerNames === trainerName) {
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
        <div>
                <div style={{ display: 'flex' }}>
                <div className='myCalendarTrainerName'>{trainerName}</div>
                <div className='myCalendarDay'>Monday {mondayPills}</div>
                <div className='myCalendarDay'>Tuesday {tuesdayPills}</div>
                <div className='myCalendarDay'>Wednesday {wednesdayPills}</div>
                <div className='myCalendarDay'>Thursday {thursdayPills}</div>
                <div className='myCalendarDay'>Friday {fridayPills}</div>
                <div className='myCalendarDay'>Saturday {saturdayPills}</div>
                <div className='myCalendarDay'>Sunday {sundayPills}</div>
            </div>
        </div>)
    };
    const MapAppointmentsByDay = () => {
        let trainersList = [];

        // Set TrainersList with unique values
        UserSchdeule.forEach(appointment => {trainersList.indexOf(appointment.trainerNames) === -1 && trainersList.push(appointment.trainerNames)});

        // Create Pills
        const pills = trainersList.map(trainerName => <AppointmentsByDay trainerName={trainerName} />);
        
        return pills;
    }
    return (
        <div style={{marginBottom: '66px'}}>
            {/* <AppointmentsByDay /> */}
            <MapAppointmentsByDay />
            {modifyAppointment}
        </div>)
}

export default AdminCalendarView;