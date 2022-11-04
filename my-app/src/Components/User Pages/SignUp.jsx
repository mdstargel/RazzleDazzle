import React, { useState } from 'react';
import CancelButton from '../Buttons/CancelButton';
import ConfirmButton from '../Buttons/ConfirmButton';
import './styles.css'

const SignUp = ({setSignedIn, setwpage}) => {
    /**
     * Reference for Forms logic
     * https://www.freecodecamp.org/news/beginner-react-project-build-basic-forms-using-react-hooks/
     * */
    const [signUpError, setSignUpError ] = useState(false);
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
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

    const handlePhoneNumberInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            phone: event.target.value,
        }));
        console.log('phone', values.phone);
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
        if (values.password && values.email &&
            values.phone && values.password && values.firstName && values.lastName) {
            
            setSignedIn(true);
            setwpage('Calendar')

            // Send Information to backend here

            // Remove the below comment later
            console.log('Successful Sign Up!')
        } else {
            setSignUpError(true);
        }
    };
    const handleCancel = (event) => {
        event.preventDefault();

        setwpage('About Us')
        // Remove the below comment later
        console.log('Canceling Sign up!')
    }
    const error = (
        <div style={{color: 'red'}}>*</div>
    );
    return (
        <div className='backGround'>
            <form className='form'>
                <div className='inputTitles1'>
                    <label className='label'>{!values.firstName && error}First Name:</label>
                </div>
                <div className='inputBoxes1'>
                    <input
                    className='input2'
                    type="text"
                    onChange={handleFirstNameInputChange}
                    />
                </div>
                <br /><br />


                <div className='inputTitles2'>
                    <label className='label'>{!values.lastName && error}Last Name:</label>
                </div>
                <div className='inputBoxes2'>
                    <input
                    type="text"
                    onChange={handleLastNameInputChange}
                    className='input2'  
                    />
                </div>
                <br /><br />


                <div className='inputTitles3'>
                    <label className='label'>{!values.email && error}Email Address:</label>
                </div>
                <div className='inputBoxes3'>
                    <input
                    type="text"
                    onChange={handleEmailInputChange}
                    className='input2'
                    />
                </div>
                <br /><br />
            
                <div className='inputTitles4'>
                    <label className='label'>{!values.phone && error}Phone Number:</label>
                </div>
                <div className='inputBoxes4'>
                    <input
                    type="text"
                    onChange={handlePhoneNumberInputChange}
                    className='input2'
                    />
                </div>
                <br/><br />
             
                <div className='inputTitles5'>
                    <label className='label'>{!values.password && error}Password:</label>
                </div>
                <dir className='inputBoxes5'>
                    <input
                    type="text"
                    onChange={handlePasswordInputChange}
                    className='input2'
                    />
                </dir>
                <br/><br />

            {signUpError &&
                <div style={{fontWeight: 'bold'}}>
                    Please fill in all fields with a {error}
                </div>
            }
            <div className='buttonContainer'>
                <br /><br />
                <div className='button1'>
                    <ConfirmButton buttonText='Sign Up' type="button" value="Sign Up" onClick={handleSubmit}/>
                    <CancelButton type="button" value="Cancel" onClick={handleCancel} />
                </div>
            </div>
            
            
            <span className='span hyperlink' onClick={() => setwpage('Log In')}>Log In</span>
            <span className='span2 hyperlink' onClick={() => setwpage('Forgot Password')}>Forgot Password</span>
        </form>
        </div>
    );
}

export default SignUp;