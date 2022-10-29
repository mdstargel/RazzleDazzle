import React, { useState } from 'react';
import '../User Pages/styles.css'
import ConfirmButton from "../Buttons/ConfirmButton";
import CancelButton from "../Buttons/CancelButton";

const EditAppointment = ({setSelectedTab}) => {
    const [values, setValues] = useState({
        trainerName: 'John Doe',
        date: '8/24/2022',
        startTime: '8:00 AM',
        endTime: '9:00 AM',
        style: 'English',
        lessonType: 'Individual',
    });

    const handleTrainerNameChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            trainerName: event.target.value,
        }));
        console.log('trainerName', values.trainerName);
    };
    const handleDateChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            date: event.target.value,
        }));
        console.log('date', values.date);
    };

    const handleStartTimeChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            startTime: event.target.value,
        }));
        console.log('startTime', values.startTime);
    };
    const handleEndTimeChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            endTime: event.target.value,
        }));
        console.log('endTime', values.endTime);
    };
    const handleStyleChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            style: event.target.value,
        }));
        console.log('style', values.style);
    };
    const handleLessonTypeChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            lessonType: event.target.value,
        }));
        console.log('lessonType', values.lessonType);
    };
    const handleEditAppointment = () => {
        /**
         * Send edited information to the backend
         */
        if (values.trainerName && values.date && values.startTime &&
            values.endTime && values.style && values.lessonType) {
            console.log('Editing Appointment!', values);
            // Send Values to backend to validate
        } else {
            console.log('Failed to edit appointment!')
        }
        
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
                    onChange={handleDateChange}
                />
                <label>Start Time:</label>
                <input
                    type="text"
                    value={values.startTime}
                    onChange={handleStartTimeChange}
                />
                <label>End Time:</label>
                <input
                    type="text"
                    value={values.endTime}
                    onChange={handleEndTimeChange}
                />
                <label>Lesson Style:</label>
                <input
                    type="text"
                    value={values.style}
                    onChange={handleStyleChange}
                />
                <label>Lesson Type:</label>
                <input
                    type="text"
                    value={values.lessonType}
                    onChange={handleLessonTypeChange}
                />
                {//this button is going to need to close add Appointment popup
                }
                <CancelButton onClick={() => setSelectedTab('')} />
                <ConfirmButton buttonText={'Edit'} onClick={handleEditAppointment} />
            </div>
        </>
        </div>
    );
}

export default EditAppointment;