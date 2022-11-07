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
            <div className="fixedForm backGround">
                <div className='inputTitles1'>
                    <label className='label'>Trainer Name:</label>
                </div>
                <div className='inputBoxes1'>
                    <input
                    className='input2'
                    type="text"
                    value={values.trainerName}
                    onChange={handleTrainerNameChange}
                    />
                </div>
                <br /><br />
                <div className='inputTitles2'>
                    <label className='label'>Date:</label>
                </div>
                <div className='inputBoxes2'>
                    <input
                        className='input2'
                        type="text"
                        value={values.date}
                        onChange={handleDateChange}
                        />
                </div>
                <br /><br />
                <div className='inputTitles3'>
                    <label className='label'>Start Time:</label>
                </div>
                <div className='inputBoxes3'>
                    <input
                        className='input2'
                    type="text"
                    value={values.startTime}
                    onChange={handleStartTimeChange}
                    />
                </div>
                <br /><br />
                <div className='inputTitles4'>
                    <label className='label'>End Time:</label>
                </div>
                <div className='inputBoxes4'>
                    <input
                    className='input2'
                    type="text"
                    value={values.endTime}
                    onChange={handleEndTimeChange}
                    />
                </div>
                <br /><br />
                <div className='inputTitles5'>
                    <label className='label'>Lesson Style:</label>
                </div>
                <div className='inputBoxes5'>
                    <input
                    className='input2'
                    type="text"
                    value={values.style}
                    onChange={handleStyleChange}
                    />
                </div>
                <br /><br />
                <div className='inputTitles6'>
                    <label className='label'>Lesson Type:</label>
                </div>
                <div className='inputBoxes6'>
                    <input
                        className='input2'
                    type="text"
                    value={values.lessonType}
                    onChange={handleLessonTypeChange}
                    />
                </div>
                <br/><br/>
                {//this button is going to need to close add Appointment popup
                }
                <br /><br />
                <div className='buttonContainer'>
                    <div className='button1'>
                    <CancelButton onClick={() => setShowAddAppointment(null)}></CancelButton>
                    <ConfirmButton buttonText={'Add'} onClick={handleAddAppointment} />
                        </div>
                    </div>
            </div>
        </>
    );
}

export default AddAppointment;