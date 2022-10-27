import React, { useState } from 'react';
import '../styles.css'
import CancelButton from '../../Buttons/CancelButton';
import ConfirmButton from '../../Buttons/ConfirmButton';

const MakeAppointment = ({ setSelectedTab, AppointmentInformation, setShowAddAppointment }) => {
    const handleAddAppointment = () => {
        /**
         * Connect with Backend API
         */
        console.log('Making Appointment for Customer');
    }
    
        return (
            <>
                <div style={{ position: 'absolute', marginLeft: '50%', marginTop: '-320px'}} className="form">
                    <label>Trainer Name:</label>
                    <input
                        type="text"
                        value={'Trainer Name'}
                    />
                    <label>Date:</label>
                    <input
                        type="text"
                    value={AppointmentInformation.date}
                    />
                    <label>Start Time:</label>
                    <input
                        type="text"
                        value={AppointmentInformation.startTime}
                    />
                    <label>End Time:</label>
                    <input
                        type="text"
                        value={AppointmentInformation.endTime}
                    />
                    <label>Lesson Style:</label>
                <input
                    type="text"
                    value={AppointmentInformation.ridingStyle}
                /> 
                     <label>Lesson Type:</label>
                <input
                    type="text"
                    value={AppointmentInformation.isGroup ? 'Group' : 'Individual'}
                    />
                    <div>Spots left {AppointmentInformation.remainingSpots}</div>

                    <CancelButton onClick={() => setShowAddAppointment(false)} />
                    <ConfirmButton buttonText={'Add'} onClick={() => handleAddAppointment} />
                </div>
            </>
        
        );
}

export default MakeAppointment;