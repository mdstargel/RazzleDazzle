import React, { useState } from 'react';
import '../styles.css'
import PageTitle from "../PageTitle";
import CancelButton from "../../Buttons/CancelButton";
import ConfirmButton from "../../Buttons/ConfirmButton";

const EditPersonalInformation = ({setwpage}) => {
    /**
     * Sample data, need database information to prepopulate form instead
     */
     const [values, setValues] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'jdoe@gmail.com',
        phone: '(800) 444-5555',
        address: '253 Horserace Rd. Bighorse, MT 12345',
     });
    const [message, setMessage] = useState('');
    
    const handleFirstNameInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            firstName: event.target.value,
        }));
        console.log('firstName', values.firstName);
    };

    const handleLastNameInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            lastName: event.target.value,
        }));
        console.log('lastName', values.lastName);
    };

    const handleEmailInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            email: event.target.value,
        }));
        console.log('email', values.email);
    };

     const handlePhoneInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            phone: event.target.value,
        }));
        console.log('phone', values.phone);
    };

    const handleAddressInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            address: event.target.value,
        }));
        console.log('address', values.address);
    };

    const handleCancel = (event) => {
        event.preventDefault();
 
        setwpage('Calendar')
        // Remove the below comment later
        console.log('Canceling Personal Information Changes!')
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (values.firstName && values.lastName && values.email && values.phone && values.address) {
            // Need to validate that information is different and is valid in order to change
            console.log('firstName', values.firstName);
            console.log('lastName', values.lastName);
            console.log('email', values.email);
            console.log('phone', values.phone);
            console.log('address', values.address);
            setMessage('Information changed successfully!')
            // Remove the below comment later
            console.log('Successful personal info change!')
        } else {
            setMessage('Information changed unsuccessfully!')
            console.log('Unsuccessful personal info Change!')
        }
    };

    return (
        <div className='backGround'>
            <PageTitle name="Edit Personal Information" />
            <form className='form2'>
                <label className='label'>First Name:</label>
                <input className='input2'
                type="text"
                value={values.firstName}
                onChange={handleFirstNameInputChange}
                />
                <br/><br />
                <label className='label'>Last Name:</label>
                <input className='input2'
                type="text"
                value={values.lastName}
                onChange={handleLastNameInputChange}
                />
                <br/><br />
                <label className='label'>Email Address:</label>
                <input className='input2'
                    type="text"
                    value={values.email}
                    onChange={handleEmailInputChange}
                />
                <br/><br />
                <label className='label'>Phone Number:</label>
                <input className='input2'
                    type="text"
                    value={values.phone}
                    onChange={handlePhoneInputChange}
                />
                <br /><br />
                <label className='label'>Address:</label>
                <input className='input2'
                    type="text"
                    value={values.address}
                    onChange={handleAddressInputChange}
                />
                <br /><br />
                <div style={message !== 'Information changed successfully!' ? {color: 'green'}: {color: 'green'}}>{message}</div>
                    <div className='buttonContainer'>
                        <br /><br />
                        <div className='button1'>
                            <CancelButton type="button" value="Cancel" onClick={handleCancel}/>
                            <ConfirmButton buttonText='Change' type="submit" value="Change" onClick={handleSubmit}/>
                        </div>
                    </div>
                </form>
        </div>
    );
}

export default EditPersonalInformation;