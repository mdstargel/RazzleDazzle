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
    
    const [error, setErrorMessage] = useState('');
    const [passwordChangeMessage, setPasswordChangeMessage] = useState('');

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
            // setwpage('Calendar')

            // Remove the below comment later
            console.log('Successful Password Change!')
            setPasswordChangeMessage('Your password has been changed!')
        } else {
            console.log('Unsuccessful Password Change!')
            setErrorMessage('Unable to change password.')
        }   
    };
    const handleCancel = (event) => {
        event.preventDefault();
 
        setwpage('Calendar')
        // Remove the below comment later
        console.log('Canceling Password Change!')
    }

    return (
        <div className='backGround'>
            <form onSubmit={handleSubmit} className='form'>
            <label className='label2'>Please enter current password:</label>
            <input className='input2'
            type="text"
            onChange={handleFirstPasswordInputChange}
            />
            <br/><br />
            <label className='label2'>Please enter new password:</label>
            <input className='input2'
            type="text"
            onChange={handleSecondPasswordInputChange}
            />
            <br/><br />
            <label className='label2'>Please re-enter new password:</label>
            <input className='input2'
            type="text"
            onChange={handleThirdPasswordInputChange}
            />
            <br /><br />
            <div style={{ color: 'red' }}>{error}</div>
            <div style={{color: 'green'}}>{passwordChangeMessage}</div>
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

export default ChangePassword;