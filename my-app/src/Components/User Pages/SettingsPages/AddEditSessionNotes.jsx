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
            <form className="form2">
                <label className='label'>Customer Name:</label>
                <input className='input2'
                    type="text"
                    onChange={handleCustomerNameChange}
                />
                <br /><br />
                <label className='label'>Session Date:</label>
                <input className='input2'
                    type="text"
                    onChange={handleSessionDateChange}
                />
                <br /><br />
                    
                <label style={{ marginTop: '100px'}} className='label'>Session Notes:</label>
                <input
                        style={{height: '375px'}}
                    className='input2'
                    type="text"
                    onChange={handleSessionNotesChange}
                />
                <br /><br />
                    
                <div className='buttonContainer'>
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