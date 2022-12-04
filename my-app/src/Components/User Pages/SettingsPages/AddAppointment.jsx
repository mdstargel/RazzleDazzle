import React, { useState } from 'react';
import axios from 'axios';

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
        Difficulty: '',
        Spots: '',
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
    const handleDifficultyChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            Difficulty: event.target.value,
        }));
        console.log('Difficulty', values.Difficulty);
    };
     const handleSpotsChange = (event) => {
         event.persist();
         if (values !== '') {
             setValues((values) => ({
                 ...values,
                 Spots: event.target.value,
             }));
             console.log('Spots', values.Spots);
         }
    };
    const handleAddAppointment = () => {
            console.log('Adding Appointment!', values);
   
            // Send Values to backend to validate
            let jsDate = new Date(values.date);
            
            let appointmentData = {
                "appointment_trainer_1_name": values.trainerName,
                "appointment_date": jsDate,
                "appointment_start_time": values.startTime,
                "appointment_end_time": values.endTime,
                "appointment_riding_style": values.style,
                "appointment_difficulty": values.Difficulty,
                "appointment_group_size": values.Spots
                }
            axios.post('/Admin/Calendar/Create', appointmentData).then(resp => {})
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
                        type="date"
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
                    type="time"
                    />
                </div>
                <br /><br />
                <div className='inputTitles4'>
                    <label className='label'>End Time:</label>
                </div>
                <div className='inputBoxes4'>
                    <input
                    className='input2'
                    type="time"
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
                    <label className='label'>Difficulty:</label>
                </div>
                <div className='inputBoxes6'>
                    <input
                        className='input2'
                    type="text"
                    value={values.Difficulty}
                    onChange={handleDifficultyChange}
                    />
                </div>
                <br /><br />
                <div className='inputTitles6'>
                    <label className='label'>Number of Spots:</label>
                </div>
                <div className='inputBoxes6'>
                    <input
                    className='input2'
                    type="number"
                    min="1"
                    max="4"
                    oninput="validity.valid||(value='');"
                    value={values.Spots}
                    onChange={handleSpotsChange}
                    onKeyDown={(event) => {
                        event.preventDefault();
                    }}
                    />
                </div>
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