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
        <div className='backGround'>
            <>
            <PageTitle name="Notify Customers" />
            <form className="form2Alt">
                <div className='inputTitles1Alt'>
                    <label className='label2'>Customer Name/ID:</label>
                </div>
                <div className='inputBoxes1Alt'>
                    <input className='input2'
                        type="text"
                        onChange={handleCustomerNameIdChange}
                    />
                </div>
                <br/><br />

                <div className='inputTitles2Alt'>
                    <label className='label2'>Message to Customer:</label>
                </div>
                <div className='inputBoxes2Alt'>
                    <input className='input2'
                        type="text"
                        onChange={handleMessageToCustomerChange}
                    />
                </div>
                <br/><br />
                 
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

export default NotifyCustomers;