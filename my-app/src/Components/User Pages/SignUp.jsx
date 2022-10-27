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
        <form className='form'>
            <label>{!values.firstName && error}First Name:</label>
            <input
            type="text"
            onChange={handleFirstNameInputChange}
            />
            <br />
            
            <label>{!values.lastName && error}Last Name:</label>
            <input
            type="text"
            onChange={handleLastNameInputChange}
            />
            <br /> 
            
            <label>{!values.email && error}Email Address:</label>
            <input
            type="text"
            onChange={handleEmailInputChange}
            />
            <br />
            
            <label>{!values.phone && error}Phone Number:</label>
            <input
            type="text"
            onChange={handlePhoneNumberInputChange}
            />
            <br/>

            <label>{!values.password && error}Password:</label>
            <input
            type="text"
            onChange={handlePasswordInputChange}
            />
            <br/>
            {signUpError &&
                <div style={{fontWeight: 'bold'}}>
                    Please fill in all fields with a {error}
                </div>
            }
            <ConfirmButton buttonText='Sign Up' type="button" value="Sign Up" onClick={handleSubmit}/>
            <CancelButton type="button" value="Cancel" onClick={handleCancel} />
            
            <span onClick={() => setwpage('Log In')}>Log In</span>
            <span onClick={() => setwpage('Forgot Password')}>Forgot Password</span>
        </form>
    );
}

export default SignUp;