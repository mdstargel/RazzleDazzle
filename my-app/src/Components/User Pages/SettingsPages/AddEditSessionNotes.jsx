import React, { useState } from 'react';
import '../styles.css'
import PageTitle from "../PageTitle";
import CancelButton from '../../Buttons/CancelButton';
import ConfirmButton from '../../Buttons/ConfirmButton';

const AddEditSessionNotes = ({setwpage}) => {
    const [values, setValues] = useState({
        customerName: '',
        sessionDate: '',
        sessionNotes: '',
    });

    const handleCustomerNameChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            customerName: event.target.value,
        }));
        console.log('customerName', values.customerName);
    };

    const handleSessionDateChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            sessionDate: event.target.value,
        }));
        console.log('sessionDate', values.sessionDate);
    };

    const handleSessionNotesChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            sessionNotes: event.target.value,
        }));
        console.log('sessionNotes', values.sessionNotes);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (values.customerName && values.sessionDate && values.sessionNotes) {
            /**
             * Set backend here with updated data
             */
            // Remove the below comment later
            console.log('Notes have been added!')
        }
    };
    const handleCancel = (event) => {
        event.preventDefault();
 
        setwpage('Calendar')
        // Remove the below comment later
        console.log('Canceling Session Notes!')
    }

    return (
        <div className='backGround'>
            <>
            <PageTitle name="Add/Edit Session Notes" />
            <form className="form2Alt">
                <div className='inputTitles1'>
                    <label className='label'>Customer Name:</label>
                </div>
                <div className='inputBoxes1'>
                    <input className='input2'
                        type="text"
                        onChange={handleCustomerNameChange}
                    />
                </div>
                <br /><br />
                
                <div className='inputTitles2'>
                    <label className='label'>Session Date:</label>
                </div>
                <div className='inputBoxes2'>
                    <input className='input2'
                        type="text"
                        onChange={handleSessionDateChange}
                    />
                </div>
                <br /><br />
                
                <div className='inputTitles3'>
                    <label className='label'>Session Notes:</label>
                </div>
                <div className='inputBoxSessionNotes'>
                    <textarea maxLength="500"
                        className='inputSessionNote'
                        type="text"
                        onChange={handleSessionNotesChange}
                    />
                </div>
                <br/><br/>
                    
                <div className='buttonContainer3'>
                    <br /><br />
                    <div className='button1'>
                        <CancelButton onClick={handleCancel} />
                        <ConfirmButton buttonText='Confirm' onClick={handleSubmit}/>
                    </div>
                </div>
                
            </form>
        </>
        </div>
       
    );
}

export default AddEditSessionNotes;