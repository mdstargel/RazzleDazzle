import React, { useState } from 'react';
import axios from 'axios';

import CustomerDrop from './CustoemerDrop';
import '../styles.css'
import PageTitle from "../PageTitle";
import CancelButton from "../../Buttons/CancelButton";
import ConfirmButton from "../../Buttons/ConfirmButton";
const NotifyCustomers = ({ setwpage }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [AvailableCustomers, setAvailableCustomers] = useState([]);
    if (!isMounted) {
        axios.get('/Admin/Customer').then(resp => {
            let customers = [];
            for (var i = 0; i < resp.data.length; i++) {
                let name_array = resp.data[i].customer_name.split(" ");
                customers.push({
                    id: resp.data[i].CID,
                    FirstName: name_array[0],
                    LastName: name_array[1],
                    Level: resp.data[i].customer_difficulty
                })
                console.log('Customers List: ', customers);
            }
            setIsMounted(true);
            setAvailableCustomers(customers);
        })
    }
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
        
        // if (values.customerNameId && values.messageToCustomer) {
            /**
             * Validate data with backend and that customer is found
             * Send message to customer
             */
            
            let customerId = [...AvailableCustomers].filter(object => object.isPreffered);
        console.log({"CIDs": [customerId[0].id], "notification": values.messageToCustomer});
        
            axios.post("/Admin/Customer/Notify", {"CIDs": [customerId[0].id], "notification": values.messageToCustomer});

            // Remove the below comment later
            console.log('Customer has been notified!')
        // }
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
                <CustomerDrop AvailableCustomers={AvailableCustomers} setAvailableCustomers={setAvailableCustomers} />

                <br /><br />
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