import React, { useState } from 'react';
// import MakeAppointment from './MakeAppointment';
import './Styes.css'



const AppointmentExpanded = ({ appointment, setCustomerAppointments, customerAppointments }) => {
    const [showIndividualAppointment, setShowIndividualAppointment] = useState(false);
    const [hidePill, setHidePill] = useState(false);

    return (
         !hidePill && <div className='appointmentPill'>
            <div onClick={() => setShowIndividualAppointment(!showIndividualAppointment)} className={showIndividualAppointment ? 'selectedAppointmentTitle' : 'appointmentTitle'}>
                {appointment.isGroup ? 'Group' : 'Individual'} {appointment.ridingStyle} {appointment.startTime}-{appointment.endTime}
            </div>
            {/* Show appointment information here */}
            {showIndividualAppointment && < div className='appointmentInfo'>
                <div>Date: {appointment.date}</div>
                <div>Spots Left: {appointment.remainingSpots}</div>
                <div onClick={() => handleAddAppointment({ appointment, setCustomerAppointments, customerAppointments, setHidePill})} className='addAppointmentButton'>Add Appointment</div>
            </div>}
        </div>
    );
};
const AppointmentInfo = ({
        appointments,
        setShowAddAppointment,
        showAddAppointment,
        setCustomerAppointments,
        customerAppointments,
    }) => {
    return (
        <div>
            {appointments.map((appointment) => (
            <AppointmentExpanded
                appointment={appointment}
                setShowAddAppointment={setShowAddAppointment}
                showAddAppointment={showAddAppointment}
                customerAppointments={customerAppointments}
                setCustomerAppointments={setCustomerAppointments}
                />
        ))}
        </div>
        );
};

const DayView = ({}) => {
    const [showAddAppointment, setShowAddAppointment] = useState(false);
    const [trainerName, setTrainerName] = useState();

    
    
    const outputDatePills = (
        <div style={{width: '100%', height: '400px'}}> Sign up for an Appointment!
        <br></br>
            {events.map((appointment) => (
                <div style={{ float: 'left' }} >
                    <div className='trainerPill'>{appointment.trainer}</div>
                    {!appointment.signedUp && <AppointmentInfo
                        appointments={appointment.appointments}
                        setShowAddAppointment={setShowAddAppointment}
                        showAddAppointment={showAddAppointment}
                        setTrainerName={setTrainerName}
                    />}
                </div>
            ))}
        </div>);
    
    return (
        <div style={{ paddingTop: '300px' }}>
            
            {outputDatePills}
            <br></br>
            {customerAppointments &&
                < div className='pillScroller'> My Appointments
                <br></br>
                    {customerAppointments.map((appointment) => (
                        <div className='customerAppointmentPill' style={{ float: 'left' }}>
                            <div>{appointment.date}</div>
                            <div>{appointment.startTime}-{appointment.endTime}</div>
                            <div>{appointment.ridingStyle}</div>
                            <div>{appointment.isGroup}</div>
                        </div>
                        ))}
                </div>}

      </div>
  );
}

export default DayView;