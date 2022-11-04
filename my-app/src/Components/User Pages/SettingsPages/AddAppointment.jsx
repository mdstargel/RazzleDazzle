import React, { useState } from 'react';
import '../styles.css'
import ConfirmButton from '../../Buttons/ConfirmButton';
import CancelButton from '../../Buttons/CancelButton';
const AddAppointment = ({setShowAddAppointment}) => {
    const [values, setValues] = useState({
        trainerName: '',
        date: '',
        startTime: '',
        endTime: '',
        style: '',
        lessonType: '',
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
    const handleAddAppointment = () => {
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
            <div className="form backGround">
                <label>Trainer Name:</label>
                <input
                    type="text"
                    value={values.trainerName}
                    onChange={handleTrainerNameChange}
                />
                <br/>
                <label>Date:</label>
                <input
                    type="text"
                    value={values.date}
                    onChange={handleDateChange}
                />
                <br/>
                <label>Start Time:</label>
                <input
                    type="text"
                    value={values.startTime}
                    onChange={handleStartTimeChange}
                />
                <br/>
                <label>End Time:</label>
                <input
                    type="text"
                    value={values.endTime}
                    onChange={handleEndTimeChange}
                />
                <br/>
                <label>Lesson Style:</label>
                <input
                    type="text"
                    value={values.style}
                    onChange={handleStyleChange}
                />
                <br/>
                <label>Lesson Type:</label>
                <input
                    type="text"
                    value={values.lessonType}
                    onChange={handleLessonTypeChange}
                />
                <br/>
                {//this button is going to need to close add Appointment popup
                }
                <CancelButton onClick={setShowAddAppointment}></CancelButton>
                <ConfirmButton buttonText={'Add'} onClick={handleAddAppointment} />
            </div>
        </>
    );
}

export default AddAppointment;