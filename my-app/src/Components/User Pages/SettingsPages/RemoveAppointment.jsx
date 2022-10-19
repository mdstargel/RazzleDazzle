import React, { useState } from 'react';
import '../styles.css'
import ConfirmButton from "../../Buttons/ConfirmButton";
import CancelButton from "../../Buttons/CancelButton";

const RemoveAppointment = ({setSelectedTab}) => {
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

    const handleRemoveAppointment = () => {
        console.log('Made it here!')
        if (values.trainerName && values.date && values.startTime &&
            values.endTime && values.style && values.lessonType) {
            console.log('Adding Appointment!', values);
            // Send Values to backend to validate
        } else {
            console.log('Failed to add appointment!')
        }
        
    };

    return(
        <>
            <div className="form">
                <label>Trainer Name:</label>
                <input
                    type="text"
                    value={values.trainerName}
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
                <ConfirmButton buttonText={'Remove'} onClick={handleRemoveAppointment} />
            </div>
        </>
    );
}

export default RemoveAppointment;