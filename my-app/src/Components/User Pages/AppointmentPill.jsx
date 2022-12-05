import React, { useState } from 'react';
import axios from 'axios';

import './styles.css'
import EditAppointment from './EditAppointment';
import CalendarEditButton from '../Buttons/CalendarEditButton';
import CalendarCancelButton from '../Buttons/CalendarCancelButton';
import CalendarAddButton from '../Buttons/CalendarAddButton';
import CalendarNotesButton from '../Buttons/CalendarNotesButton';
import CalendarNotes from './CalendarNotes';


const AppointmentPill = ({ trainerName, availableAppointments, userPermissions, UserInfo }) => {
    const [modifyAppointment, setModifyAppointment] = useState();


    const AppointmentExpanded = ({ appointment }) => {
        const [isCancled, setCanceled] = useState(false);
        const [added, setAdded] = useState(false);
        function handleCancelAppointment() {
            axios.post('/Admin/Calendar/Delete_Appointment', {"appointment_id": appointment.appointmentId}).then(resp => { })
            console.log(appointment.appointmentId)
            setCanceled(true);
        };

        function handleAddAppointment() {
            console.log('add id', UserInfo.id)
            axios.post('/Customer/Calendar/Reservation', {"appointment_id": appointment.appointmentId, "user_id": UserInfo.id, "reserve": 1 
}).then(resp => { })
            console.log(appointment.appointmentId)
            setAdded(true);
        };
        const [showIndividualAppointment, setShowIndividualAppointment] = useState(false);
        // const [hidePill, setHidePill] = useState(false);

        return (
            !isCancled && <div className='appointmentPill'>
                <div onClick={() => setShowIndividualAppointment(!showIndividualAppointment)} className={showIndividualAppointment ? 'selectedAppointmentTitle' : 'appointmentTitle'}>
                    {appointment.isGroup ? 'Group' : 'Individual'} {appointment.ridingStyle} {appointment.startTime}-{appointment.endTime}
                </div>
                {/* Show appointment information here */}
                {showIndividualAppointment && < div className='appointmentInfo'>
                    <div>Date: {appointment.date}</div>
                    <div>Spots Left: {appointment.remainingSpots}</div>
                    {/* <div onClick={() => console.log('this should add appointment', appointment.appointmentId)} className='addAppointmentButton'>Add Appointment</div> */}
                    {(userPermissions.isCustomer) && !added && <CalendarAddButton onClick={() => handleAddAppointment()} />}
                   {(userPermissions.isAdmin || userPermissions.isTrainer) && <CalendarEditButton onClick={() => setModifyAppointment(<EditAppointment appointment={appointment} setModifyAppointment={setModifyAppointment}/>)}/>}
                    {(userPermissions.isAdmin || userPermissions.isTrainer) && <CalendarCancelButton setModifyAppointment={setModifyAppointment} onClick={() => handleCancelAppointment()} />}
                    <CalendarNotesButton onClick={() => setModifyAppointment(<CalendarNotes appointment={appointment} setModifyAppointment={setModifyAppointment} userPermissions={userPermissions} />)}/>
                </div>}
            </div>
        );
    };
    
    const WrapperPill = ({ appointment }) => {
        return (
            <div>
                <div className=''></div>
                <AppointmentExpanded appointment={appointment} />
            </div>
        )
    }

    let appointmentPills = [];

    availableAppointments.forEach(appointment => {
        trainerName === appointment.trainerNames && appointmentPills.push(
            <WrapperPill appointment={appointment}></WrapperPill>
        )
    });
    
    return (
        <div style={{width: '230x'}}>
            <div className='trainerPill' >{trainerName}</div>
            {appointmentPills}
            {modifyAppointment}
        </div>
    )
}

export default AppointmentPill;