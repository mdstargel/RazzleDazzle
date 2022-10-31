import React from 'react';
import '../styles.css'

const MyAppointments = ({ customerAppointments }) => {
    return (
       <div className='pillScroller'>
            {customerAppointments.map((appointment) => (
                <div className='customerAppointmentPill' style={{float: 'left'}}>
                    <div>{appointment.date}</div>
                    <div>{appointment.startTime}-{appointment.endTime}</div>
                    <div>{appointment.ridingStyle}</div>
                    <div>{appointment.isGroup}</div>
                </div>))}
        </div>
    );
}

export default MyAppointments;