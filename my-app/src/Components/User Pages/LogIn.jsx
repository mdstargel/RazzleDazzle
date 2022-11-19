import React, { useState } from 'react';
import axios from 'axios';

import './styles.css'
import CancelButton from '../Buttons/CancelButton';
import ConfirmButton from '../Buttons/ConfirmButton';

const LogIn = ({ setSignedIn, setwpage, setUserPermissions, userPermissions }) => {
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
            // Send Log in information
            axios.post('/Login', {
                login_email: values.email,
                login_password: values.password,
            })
            .then(function (response) {
                console.log(response.data[0]);
                setUserPermissions({
                    isAdmin: response.data.type === 3,
                    isTrainer: response.data.type === 2,
                    isCustomer: response.data.type === 1,
                })
                console.log(userPermissions.isAdmin || userPermissions.isTrainer || userPermissions.isCustomer)
                if (userPermissions.isAdmin || userPermissions.isTrainer || userPermissions.isCustomer) {
                    let userType;
                    console.log('Admin: ', userPermissions.isAdmin)
                    if (userPermissions.isCustomer) {
                        userType = '/Customer';
                    } else if (userPermissions.isTrainer) {
                        userType = '/Trainer';
                    } else if (userPermissions.isAdmin) {
                        userType = '/Admin';
                    }
                    console.log('User Post Call', userType)
                    axios.post(userType, {
                        user_id: response.data.ID,
                    }).then(function (resp) { 
                        console.log('User Personal Info:', resp.data)
                        setSignedIn(true);
                        setwpage('Calendar')
                    })
                    
                }
            })
            .catch(function (error) {
                console.log(error);
            });

        
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
            <div className='inputTitles1'>
                <label className='label'>Email Address:</label>
            </div>
            <div className='inputBoxes1'>
                <input className='input2'
                    type="text"
                    onChange={handleEmailInputChange}
                />
            </div>
            <br /><br />    
            
            <div className='inputTitles2'>
                <label className='label'>Password:</label>
            </div>
            <div className='inputBoxes2'>
                <input className='input2'
                    type="text"
                    onChange={handlePasswordInputChange}
                />
            </div>
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