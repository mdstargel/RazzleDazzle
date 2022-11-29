import React, { useState } from 'react';
import axios from 'axios';

import '../styles.css'
import PageTitle from "../PageTitle";
import CancelButton from '../../Buttons/CancelButton';
import ConfirmButton from '../../Buttons/ConfirmButton';

const ManageNotifications = ({setwpage, UserInfo, setUserInfo}) => {
    /**
     * Need database to set these notification settings
     */
    const [textOn, setTextOn] = useState(UserInfo.TextNotifications ? true : false);
    const [successfulChangeMessage, setSuccessfulChangeMessage] = useState('');
    const handleChangeNotificationSettings = () => {
        
        const postData = {
            "user_id": UserInfo.id,
            "user_phone_notifications": textOn ? 1 : 0
        }

        console.log('is Text on?', textOn);
        console.log('postData', postData);
        axios.post('/Customer/Set_Phone_Notifications', postData).then();

        let new_user = {
            type: UserInfo.type,
            id: UserInfo.id,
            FirstName: UserInfo.FirstName,
            LastName: UserInfo.LastName,
            Email: UserInfo.Email,
            Address: UserInfo.Address,
            phone: UserInfo.phone,
            TextNotifications: textOn
        }
        setUserInfo(new_user);

        setSuccessfulChangeMessage('Your preferences have been changed!')
    }

    return (
        <div className='backGround'>
            <>
        <PageTitle name="Manage Notifications" />
            <div className='form2Alt'>
                    <div className='labelCentered'>Please accept or deny text notifications below:</div><br />
                    <div>
                        <div style={{marginTop: '30px', marginLeft: 'calc(50% - 35px)', fontWeight: 'bold'}}>Text: </div>
                        <div
                            className='radioButton'
                            style={textOn === false ?
                                { backgroundColor: '#D9D9D9' } :
                                { backgroundColor: '#0C1526'}}
                            onClick={() => setTextOn(!textOn)}>
                            </div>
                    </div>
                <div className='label' style={{color: 'green'}}>{successfulChangeMessage}</div>
                <div className='buttonContainer'>
                    <br /><br />
                    <div className='button1'>
                        <CancelButton onClick={() => setwpage('Calendar')} />
                        <ConfirmButton buttonText='Confirm' onClick={handleChangeNotificationSettings}/>
                    </div>
                </div>
                
            </div>
        </>
        </div>
        
    );
}

export default ManageNotifications;