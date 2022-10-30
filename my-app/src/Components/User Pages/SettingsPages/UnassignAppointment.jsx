import React, { useState } from 'react';
import '../styles.css'
import ConfirmButton from "../../Buttons/ConfirmButton";
import CancelButton from "../../Buttons/CancelButton";

const UnassignAppointment = ({setSelectedTab}) => {
    /**
     * The following data will be filled in by the database
     */
    const [values, setValues] = useState({
        trainerName: 'John Doe',
        date: '8/24/2022',
        startTime: '8:00 AM',
        endTime: '9:00 AM',
        style: 'English',
        type: 'Individual',
    });

    const handleUnassignAppointment = (event) => {
        /**
         * Send information to database regarding unassigned appointment
         */
        event.persist();
            setValues((values) => ({
                ...values,
                trainerName: '',
            }));
            console.log('trainerName', values.trainerName);
    };

    const handleTrainerNameChange = (event) => {
            event.persist();
            setValues((values) => ({
                ...values,
                trainerName: event.target.value,
            }));
            console.log('trainerName', values.trainerName);
    };
    
    return(
        <div className='backGround'>
            <>
            <div className="form">
                <label>Trainer Name:</label>
                <input
                    type="text"
                    value={values.trainerName}
                    onChange={handleTrainerNameChange}
                />
                <label>Date:</label>
                <input
                    type="text"
                    value={values.date}
                />
                <label>Start Time:</label>
                <input
                    type="text"
                    value={values.startTime}
                />
                <label>End Time:</label>
                <input
                    type="text"
                    value={values.endTime}
                />
                <label>Lesson Style:</label>
                <input
                    type="text"
                    value={values.style}
                />
                <label>Lesson Type:</label>
                <input
                    type="text"
                    value={values.type}
                />
                {//this button is going to need to close add Appointment popup
                }
                <CancelButton onClick={() => setSelectedTab('')} />
                <ConfirmButton buttonText={'Unassign'} onClick={handleUnassignAppointment} />
            </div>
        </>
        </div>
    );
}

export default UnassignAppointment;