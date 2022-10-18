import React, { useState } from 'react';
import CancelButton from '../../Buttons/CancelButton';
import ConfirmButton from '../../Buttons/ConfirmButton';
import '../styles.css'

const ChangePassword = ({setSignedIn, setwpage}) => {
    /**
     * Reference for Forms logic
     * https://www.freecodecamp.org/news/beginner-react-project-build-basic-forms-using-react-hooks/
     * */ 
    const [values, setValues] = useState({
        firstPassword: '',
        secondPassword: '',
        thirdPassword: '',
    });
    
    const handleFirstPasswordInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            firstPassword: event.target.value,
        }));
        console.log('firstPassword', values.firstPassword);
    };

    const handleSecondPasswordInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            secondPassword: event.target.value,
        }));
        console.log('secondPassword', values.secondPassword);
    };

    const handleThirdPasswordInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            thirdPassword: event.target.value,
        }));
        console.log('thirdPassword', values.thirdPassword);
    };
   

    const handleSubmit = (event) => {
        event.preventDefault();

        if (values.firstPassword && (values.secondPassword === values.thirdPassword)) {
            // Need to validate that change password actually changes the password with backend
            setwpage('Calendar')

            // Remove the below comment later
            console.log('Successful Password Change!')
        } else {
            console.log('Unsuccessful Password Change!')
        }
    };
    const handleCancel = (event) => {
        event.preventDefault();
 
        setwpage('Calendar')
        // Remove the below comment later
        console.log('Canceling Password Change!')
    }

    return (
        <form onSubmit={handleSubmit} className='form'>
            <label>Please enter current password:</label>
            <input
            type="text"
            onChange={handleFirstPasswordInputChange}
            />

            <label>Please enter new password:</label>
            <input
            type="text"
            onChange={handleSecondPasswordInputChange}
            />

            <label>Please re-enter new password:</label>
            <input
            type="text"
            onChange={handleThirdPasswordInputChange}
            />

            <CancelButton type="button" value="Cancel" onClick={handleCancel}/>
            <ConfirmButton buttonText='Change' type="submit" value="Change" onClick={handleSubmit}/>
        </form>
    );
}

export default ChangePassword;