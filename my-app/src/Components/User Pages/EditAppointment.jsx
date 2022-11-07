import React, { useState } from 'react';
import '../User Pages/styles.css'
import ConfirmButton from "../Buttons/ConfirmButton";
import CancelButton from "../Buttons/CancelButton";

const EditAppointment = ({ appointment, setModifyAppointment}) => {
    const [values, setValues] = useState(appointment);

    const handletrainerNamesChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            trainerNames: event.target.value,
        }));
        console.log('trainerNames', values.trainerNames);
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
    const handleridingStyleChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            ridingStyle: event.target.value,
        }));
        console.log('ridingStyle', values.ridingStyle);
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
        if (values.trainerNames && values.date && values.startTime &&
            values.endTime && values.ridingStyle && values.lessonType) {
            console.log('Editing Appointment!', values);
            // Send Values to backend to validate
        } else {
            console.log('Failed to edit appointment!')
        }
        
    };

    return(
        <div className="fixedForm">
            <div className='inputTitles1'>
                <label>Trainer Name:</label>
            </div>
            <div className='inputBoxes1'>
                <input
                    type="text"
                    value={values.trainerNames}
                    onChange={handletrainerNamesChange}
                />
            </div>    
            <br /><br />
            <div className='inputTitles2'>
                <label>Date:</label>
            </div>
            <div className='inputBoxes2'>
            <input
                type="text"
                value={values.date}
                onChange={handleDateChange}
                />
            </div>
            <br /><br />

            <div className='inputTitles3'>
                <label>Start Time:</label>
            </div>
            <input
                type="text"
                value={values.startTime}
                onChange={handleStartTimeChange}
                />
                <br />
                
            <label>End Time:</label>
            <input
                type="text"
                value={values.endTime}
                onChange={handleEndTimeChange}
                />
                <br />
                
            <label>Lesson ridingStyle:</label>
            <input
                type="text"
                value={values.ridingStyle}
                onChange={handleridingStyleChange}
                />
                <br />
                
            <label>Lesson Type:</label>
            <input
                type="text"
                value={values.lessonType}
                onChange={handleLessonTypeChange}
                />
                <br/>

            <CancelButton onClick={() => setModifyAppointment()} />
            <ConfirmButton buttonText={'Edit'} onClick={handleEditAppointment} />
        </div>
    );
}

export default EditAppointment;