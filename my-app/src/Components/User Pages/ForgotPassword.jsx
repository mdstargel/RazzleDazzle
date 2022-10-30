import React, { useState } from 'react';
import './styles.css'
import CancelButton from '../Buttons/CancelButton';
import ConfirmButton from '../Buttons/ConfirmButton';

const ForgotPassword = ({ setSignedIn, setwpage }) => {
    /**
     * Reference for Forms logic
     * https://www.freecodecamp.org/news/beginner-react-project-build-basic-forms-using-react-hooks/
     * */
    const [passwordError, setPasswordError] = useState(''); 
    const [values, setValues] = useState({
        email: '',
        firstPassword: '',
        secondPassword: '',
        confirmationCode: '',
    });

    const [sentCode, setSentCode] = useState(false);
    
    const handleEmailInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            email: event.target.value,
        }));
        console.log('email', values.email);
    };

    const handleConfirmationCodeInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            confirmationCode: event.target.value,
        }));
        console.log('confirmationCode', values.confirmationCode);
    };

    const handleFirstPasswordInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            firstPassword: event.target.value,
        }));
        console.log('secondPassword', values.firstPassword);
    };

    const handleSecondPasswordInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            secondPassword: event.target.value,
        }));
        console.log('secondPassword', values.secondPassword);
    };

    const handleSendCode = (event) => {
        event.preventDefault();
        /**
         * Set bool here to validate with backend that code has been sent
         */
        if (values.email) {
            setSentCode(true)
            // Remove the below comment later
            console.log('Code has been sent!')
        }
    };

    const handleChangePassword = (event) => {
        event.preventDefault();

        /**
         * confirm code matches one sent to email, and send new password to backend
         */
        console.log('valuse: ',values);
        if (values.confirmationCode && (values.firstPassword === values.secondPassword)) {
            setSentCode(true);
            setSignedIn(true);
            setwpage('Calendar')

            // Remove the below comment later
            console.log('Forgot Password: Changed password!')
        } else {
            setPasswordError('Passwords do not match.')
        }
    };

    const handleCancel = (event) => {
        event.preventDefault();
 
        setwpage('About Us')
        // Remove the below comment later
        console.log('Canceling Forgot Password!')
    }

    const sendCodeForm = (
        <form className='form'>
            <label className='label'>Email Address:</label>
            <input
                type="text"
                onChange={handleEmailInputChange}
            />
            <br />
            <CancelButton onClick={handleCancel} />
            <ConfirmButton buttonText='Send' onClick={handleSendCode} />
            {/* <input type="submit" value="Send" />
            <input type="button" value="Cancel" onClick={handleSendCode} /> */}
            <span className='span' onClick={() => setwpage('Log In')}>Log In</span>
            <span className='span2' onClick={() => setwpage('Sign Up')}>Sign Up</span>
        </form>
    )

    const forgotPasswordForm = (
        <form className='form'>
            <label className='label'>Confirmation Code:</label>
            <input
                type="text"
                onChange={handleConfirmationCodeInputChange}
            />
            <br />
            
            <label className='label'>New Password:</label>
            <input
                type="text"
                onChange={handleFirstPasswordInputChange}
            />
            <br />

            <label className='label'>Re-enter Password:</label>
            <input
                type="text"
                onChange={handleSecondPasswordInputChange}
            />
            <br/>
            <div style={{color: 'red'}}>{passwordError}</div>
            <ConfirmButton buttonText={'Change'} onClick={handleChangePassword} />
            <CancelButton onClick={handleCancel} />
            
            <div style={{ color: 'green' }}>Please Check Your Email for a Comfirmation Code</div>
        </form>
    )

    let form = sentCode ? forgotPasswordForm : sendCodeForm;

    return (
        // Can't do it here yet, blanks everything out
        // <div className='backGround'>
        //     form
        // </div>

        form
        
    );
}

export default ForgotPassword;