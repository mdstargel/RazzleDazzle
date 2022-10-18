import React, { useState } from 'react';
import '../styles.css'
import PageTitle from "../PageTitle";
import CancelButton from "../../Buttons/CancelButton";
import ConfirmButton from "../../Buttons/ConfirmButton";
const NotifyCustomers = ({setwpage}) => {
    const [values, setValues] = useState({
        customerNameId: '',
        messageToCustomer: '',
    });

    const handleCustomerNameIdChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            customerNameId: event.target.value,
        }));
        console.log('customerNameId', values.customerNameId);
    };

    const handleMessageToCustomerChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            messageToCustomer: event.target.value,
        }));
        console.log('messageToCustomer', values.messageToCustomer);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (values.customerNameId && values.messageToCustomer) {
            /**
             * Validate data with backend and that customer is found
             * Send message to customer
             */

            // Remove the below comment later
            console.log('Customer has been notified!')
        }
    };

    const handleCancel = (event) => {
        event.preventDefault();
 
        setwpage('Calendar')
        // Remove the below comment later
        console.log('Canceling Notify Customer!')
    };

    return (
        <>
            <PageTitle name="Notify Customers" />
            <form className="form" style={{marginTop: '500px'}}>
                    <label>Customer Name/ID:</label>
                    <input
                        type="text"
                        onChange={handleCustomerNameIdChange}
                    />
                    <label>Message to Customer:</label>
                    <input
                        type="text"
                        onChange={handleMessageToCustomerChange}
                    />
                
                    <CancelButton onClick={handleCancel} />
                    <ConfirmButton buttonText='Confirm' onClick={handleSubmit}/>
            </form>
        </>
    );
}

export default NotifyCustomers;