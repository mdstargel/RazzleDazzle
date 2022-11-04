import React, { useState } from 'react';
import './styles.css'
import EditAppointment from './EditAppointment';
import CalendarEditButton from '../Buttons/CalendarEditButton';
import CalendarCancelButton from '../Buttons/CalendarCancelButton';


const AppointmentPill = ({ trainerName, availableAppointments, userPermissions }) => {
    const [modifyAppointment, setModifyAppointment] = useState();

    const AppointmentExpanded = ({appointment}) => {
        const [showIndividualAppointment, setShowIndividualAppointment] = useState(false);
        // const [hidePill, setHidePill] = useState(false);

        return (
            <div className='appointmentPill'>
                <div onClick={() => setShowIndividualAppointment(!showIndividualAppointment)} className={showIndividualAppointment ? 'selectedAppointmentTitle' : 'appointmentTitle'}>
                    {appointment.isGroup ? 'Group' : 'Individual'} {appointment.ridingStyle} {appointment.startTime}-{appointment.endTime}
                </div>
                {/* Show appointment information here */}
                {showIndividualAppointment && < div className='appointmentInfo'>
                    <div>Date: {appointment.date}</div>
                    <div>Spots Left: {appointment.remainingSpots}</div>
                    <div onClick={() => console.log('this should add appointment', appointment.appointmentId)} className='addAppointmentButton'>Add Appointment</div>
                   {(userPermissions.isAdmin || userPermissions.isTrainer) && <CalendarEditButton onClick={() => setModifyAppointment(<EditAppointment appointment={appointment} setModifyAppointment={setModifyAppointment}/>)}/>}
                 {(userPermissions.isAdmin || userPermissions.isTrainer) && <CalendarCancelButton setModifyAppointment={setModifyAppointment} onClick={() => console.log('this should add appointment', appointment.appointmentId)} />}
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