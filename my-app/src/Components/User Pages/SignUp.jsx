import React, { useState } from 'react';
import './styles.css'

const SignUp = ({setSignedIn, setwpage}) => {
    /**
     * Reference for Forms logic
     * https://www.freecodecamp.org/news/beginner-react-project-build-basic-forms-using-react-hooks/
     * */ 
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
        if (values.password && values.email && values) {
            setSignedIn(true);
            setwpage('Calendar')

            // Send Information to backend here

            // Remove the below comment later
            console.log('Successful Sign Up!')
        }
    };
    const handleCancel = (event) => {
        event.preventDefault();

        setwpage('About Us')
        // Remove the below comment later
        console.log('Canceling Sign up!')
    }
            
    return (
        <form onSubmit={handleSubmit}>
            <label>First Name:</label>
            <input
            type="text"
            onChange={handleFirstNameInputChange}
            />

            <label>Last Name:</label>
            <input
            type="text"
            onChange={handlePasswordInputChange}
            />

            <label>Email Address:</label>
            <input
            type="text"
            onChange={handleEmailInputChange}
            />

            <label>Phone Number:</label>
            <input
            type="text"
            onChange={handlePhoneNumberInputChange}
            />

            <label>Password:</label>
            <input
            type="text"
            onChange={handlePasswordInputChange}
            />

            <input type="submit" value="Sign Up" />
            <input type="button" value="Cancel" onClick={handleCancel} />
            <span onClick={() => setwpage('Log In')}>Log In</span>
            <span onClick={() => setwpage('Forgot Password')}>Forgot Password</span>
        </form>
    );
}

export default SignUp;