import React, { useState } from 'react';
import './styles.css'

const LogIn = ({setSignedIn, setwpage}) => {
    /**
     * Reference for Forms logic
     * https://www.freecodecamp.org/news/beginner-react-project-build-basic-forms-using-react-hooks/
     * */ 
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
        }
    };
    const handleCancel = (event) => {
        event.preventDefault();
 
        setwpage('About Us')
        // Remove the below comment later
        console.log('Canceling Log in!')
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Email Address:</label>
            <input
            type="text"
            onChange={handleEmailInputChange}
            />

            <label>Password:</label>
            <input
            type="text"
            onChange={handlePasswordInputChange}
            />

            <input type="submit" value="Log In" />
            <input type="button" value="Cancel" onClick={handleCancel}/>
        </form>
    );
}

export default LogIn;