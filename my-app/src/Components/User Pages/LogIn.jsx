import React, { useState } from 'react';
import './styles.css'
import CancelButton from '../Buttons/CancelButton';
import ConfirmButton from '../Buttons/ConfirmButton';

const LogIn = ({ setSignedIn, setwpage }) => {
    /**
     * Reference for Forms logic
     * https://www.freecodecamp.org/news/beginner-react-project-build-basic-forms-using-react-hooks/
     * */
    const [showError, setShowError] = useState(false);
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    
    const handleEmailInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            email: event.target.value,
        }));
        console.log('email', values.email);
    };

    const handlePasswordInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            password: event.target.value,
        }));
        console.log('password', values.password);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        /**
         * Set bool here to validate with backend that the user is signed in
         */
        if (values.password && values.email) {
            setSignedIn(true);
            setwpage('Calendar')

            // Remove the below comment later
            console.log('Successful Sign In!')
        } else {
            setShowError(true);
        }
        
    };
    const handleCancel = (event) => {
        event.preventDefault();
 
        setwpage('About Us')
        // Remove the below comment later
        console.log('Canceling Log in!')
    }

    return (
        <div className='backGround'>
        <form className='form'>
            <label className='label'>Email Address:</label>
            <input className='input2'
                type="text"
                onChange={handleEmailInputChange}
            />
            <br /><br />

            <label className='label'>Password:</label>
            <input className='input2'
                type="text"
                onChange={handlePasswordInputChange}
            />
            <br /><br />
            {showError && < div style={{color: 'red'}} > Your password or email are incorrect.</div>}
            <div className='buttonContainer'>
                <br /><br />
                <div className='button1'>
                    <CancelButton style={{paddingRight: '20px'}} onClick={handleCancel} />
                    <ConfirmButton buttonText='Confirm' onClick={handleSubmit} />
                </div>
            </div>
            
            <span className='span hyperlink' onClick={() => setwpage('Sign Up')}>Sign Up</span>
            <span className='span2 hyperlink' onClick={() => setwpage('Forgot Password')}>Forgot Password</span>
        </form>
        </div>
    );
}

export default LogIn;