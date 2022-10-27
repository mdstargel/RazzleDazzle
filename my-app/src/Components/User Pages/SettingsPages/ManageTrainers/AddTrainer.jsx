import React, { useState } from 'react';
import CancelButton from "../../../Buttons/CancelButton";
import ConfirmButton from "../../../Buttons/ConfirmButton";

const AddTrainer = () => {
    const [adminOn, setAdminOn] = useState(false);
    const [trainerOn, setTrainerOn] = useState(false);

     const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
    });
    
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
    
    const handleAddressInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            address: event.target.value,
        }));
        console.log('address', values.address);
    };  

    const handleAddTrainer = () => {
        /**
         * Configure database to recieve trainer information
        */
        if (values.firstName && values.lastName && values.email && values.address && (trainerOn || adminOn)) {
            console.log('Successful Addition of Trainer!')
                setValues((values) => ({
                ...values,
                firstName: '',
                lastName: '',
                email: '',
                address: '',
        }));
        } else {
            console.log('Unsuccessful Addition of Trainer!')

        }
    }; 

    const handleCancelAddTrainer = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            firstName: '',
            lastName: '',
            email: '',
            address: '',
        }));
        console.log('address', values.address);
    };  

    return (
        <div>
            <label>First Name:</label>
            <input
                type="text"
                onChange={handleFirstNameInputChange}
                value={values.firstName}
            />
            <br/>
            <label>Last Name:</label>
            <input
                type="text"
                onChange={handleLastNameInputChange}
                value={values.lastName}
            />
            <br/>
            <label>Email Address:</label>
            <input
                type="text"
                onChange={handleEmailInputChange}
                value={values.email}
            />
            <br/>
            <label>Address:</label>
            <input
                type="text"
                onChange={handleAddressInputChange}
                value={values.address}
            />
            <br/>
            <label>Trainer Permissions:</label>
            <div onClick={() => setTrainerOn(!trainerOn)}>Trainer: {trainerOn ? 'True' : 'False'}</div>
            <div onClick={() => setAdminOn(!adminOn)}>Admin: {adminOn ? 'True' : 'False'}</div>
            <br/>

            <CancelButton onClick={handleCancelAddTrainer}/>
            <ConfirmButton onClick={handleAddTrainer} buttonText="Add" />
        </div>
    );
}

export default AddTrainer;