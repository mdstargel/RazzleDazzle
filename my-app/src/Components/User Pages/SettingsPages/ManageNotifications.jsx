import React, { useState } from 'react';
import '../styles.css'
import PageTitle from "../PageTitle";
import CancelButton from '../../Buttons/CancelButton';
import ConfirmButton from '../../Buttons/ConfirmButton';

const ManageNotifications = ({setwpage}) => {
    /**
     * Need database to set these notification settings
     */
    const [textOn, setTextOn] = useState(false);
    const [successfulChangeMessage, setSuccessfulChangeMessage] = useState('');
    const handleChangeNotificationSettings = () => {
        
        // This should update the database with the preferred notification settings
        console.log('This should information changing Notification Settings!');
        console.log('Text:', textOn ? 'True' : 'False')
        setSuccessfulChangeMessage('Your preferences have been changed!')
    };

    return (
        <>
        <PageTitle name="Manage Notifications" />
            <div style={{marginTop: '300px'}}>
                <div>Please select your notification preferences below:</div>
                <div onClick={() => setTextOn(!textOn)}>Text: {textOn ? 'True' : 'False'}</div>
                <div style={{color: 'green'}}>{successfulChangeMessage}</div>
                <CancelButton onClick={() => setwpage('Calendar')} />
                <ConfirmButton buttonText='Confirm' onClick={handleChangeNotificationSettings}/>
            </div>
        </>
    );
}

export default ManageNotifications;