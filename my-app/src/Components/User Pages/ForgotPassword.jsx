import React, { useState } from 'react';
import './styles.css'

const ForgotPassword = ({ setSignedIn, setwpage }) => {
    /**
     * Reference for Forms logic
     * https://www.freecodecamp.org/news/beginner-react-project-build-basic-forms-using-react-hooks/
     * */

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
        if (values.confirmationCode && (values.firstPassword === values.secondPassword)) {
            setSentCode(true)
            setSignedIn(true)
            setwpage('Calendar')

            // Remove the below comment later
            console.log('Forgot Password: Changed password!')
        }
    };

    const handleCancel = (event) => {
        event.preventDefault();
 
        setwpage('About Us')
        // Remove the below comment later
        console.log('Canceling Forgot Password!')
    }

    const sendCodeForm = (
        <form onSubmit={handleSendCode}>
            <label>Email Address:</label>
            <input
                type="text"
                onChange={handleEmailInputChange}
            />

            <input type="submit" value="Send" />
            <input type="button" value="Cancel" onClick={handleCancel} />
        </form>
    )

    const forgotPasswordForm = (
        <form onSubmit={handleChangePassword}>
            <label>Confirmation Code:</label>
            <input
                type="text"
                onChange={handleConfirmationCodeInputChange}
                placeholder=''
            />

            <label>New Password:</label>
            <input
                type="text"
                placeholder=''
                onChange={handleFirstPasswordInputChange}
            />

            <label>Re-enter Password:</label>
            <input
                type="text"
                onChange={handleSecondPasswordInputChange}
            />


            <input type="submit" value="Change" />
            <input type="button" value="Cancel" onClick={handleCancel} />
        </form>
    )

    let form = sentCode ? forgotPasswordForm : sendCodeForm;

    return (
        form
    );
}

export default ForgotPassword;