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
        <>
            <PageTitle name="Add/Edit Session Notes" />
            <form className="form" style={{marginTop: '500px'}}>
                <label>Customer Name:</label>
                <input
                    type="text"
                    onChange={handleCustomerNameChange}
                />
                <label>Session Date:</label>
                <input
                    type="text"
                    onChange={handleSessionDateChange}
                />
                <label>Session Notes:</label>
                <input
                    type="text"
                    onChange={handleSessionNotesChange}
                />
                <CancelButton onClick={handleCancel} />
                <ConfirmButton buttonText='Confirm' onClick={handleSubmit}/>
            </form>
        </>
    );
}

export default AddEditSessionNotes;