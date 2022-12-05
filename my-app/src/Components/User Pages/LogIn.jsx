import React, { useState } from 'react';
import axios from 'axios';

import './styles.css'
import CancelButton from '../Buttons/CancelButton';
import ConfirmButton from '../Buttons/ConfirmButton';


const async = require('async');

const LogIn = ({ setSignedIn, setwpage, setUserPermissions, userPermissions, setUserInfo }) => {
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        /**
         * Set bool here to validate with backend that the user is signed in
         */
        if (values.password && values.email) {
            // Send Log in information
            await axios.post('/Login', {
                "login_email": values.email,
                "login_password": values.password,
            })
            .then(async function (response) {
                // console.log(response.data[0]);
                setUserPermissions({
                    isAdmin: response.data[0].type === 3,
                    isTrainer: response.data[0].type === 2,
                    isCustomer: response.data[0].type === 1
                });

                let type = response.data[0].type;
                if ( type <= 3 && type >= 1) {
                    let userType;
                    let userID = { "user_id": response.data[0].ID }
                    // console.log('Admin: ', userPermissions.isAdmin)
                    console.log(response.data[0].ID);
                    if (type === 1) {
                        userType = '/Customer';
                    } else if (type === 2) {
                        userType = '/Trainer';
                    } else if (type === 3) {
                        userType = '/Admin';
                    }
                    // console.log('User Post Call', userType)
                    axios.post(userType, userID).then(function (resp) { 
                        let new_user;
                        
                        if (type === 1) {
                            let name_array;
                            try {
                                name_array = resp.data.customer_name.split(" ");
                            } catch {
                                name_array = [
                                    resp.data.customer_name,
                                    ""
                                ]
                            }
                            console.log('User ID:', resp.data);

                            new_user = {
                                type: userType,
                                id: resp.data.CID,
                                FirstName: name_array[0],
                                LastName: name_array[1],
                                Email: resp.data.customer_email_address,
                                Address: resp.data.customer_address,
                                phone: resp.data.customer_phone_number === 1 ? true : false,
                                TextNotifications: resp.data.Customer_Phone_Notifications
                            };
                        } else {
                            let name_array;
                            try {
                                name_array = resp.data.customer_name.split(" ");
                            } catch {
                                name_array = [
                                    resp.data.customer_name,
                                    ""
                                ]
                            }

                            new_user = {
                                type: userType,
                                id: resp.data.TID,
                                FirstName: name_array[0],
                                LastName: name_array[1],
                                Style: resp.data.trainer_riding_style,
                                Email: resp.data.trainer_email_address,
                                Address: resp.data.trainer_address,
                                phone: resp.data.trainer_phone_number
                            };
                        }
    
                        setSignedIn(true);
                        setwpage('Calendar');
                        setUserInfo(new_user);
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