import React, { useState } from 'react';
import axios from 'axios';

import PageTitle from './PageTitle';
import AccessTrainer from './SettingsPages/ManageTrainers/AccessTrainer';
import AddTrainer from './SettingsPages/ManageTrainers/AddTrainer';
import RemoveTrainer from './SettingsPages/ManageTrainers/RemoveTrainer';

const ManageAppointment = ({UserInfo}) => {
    const [isMounted, setIsMounted] = useState(false);
    const [AvailableTrainers, setAvailableTrainers] = useState([])

    if (!isMounted) {
        let user_id = {
            "user_id": UserInfo.id
        }
        axios.post('/Admin/Trainer', user_id).then(resp => {
            let trainers = [];
            for (var i = 0; i < resp.data.length; i++) {
                try {
                    let name_array = resp.data.customer_name.split(" ");
                } catch {
                    let name_array = [
                        resp.data.customer_name,
                        ""
                    ]
                }
                trainers.push({
                id: resp.data[i].TID,
                FirstName: name_array[0],
                LastName: name_array[1],
                Style: resp.data[i].trainer_riding_style,
                Email: resp.data[i].trainer_email_address,
                Address: resp.data[i].trainer_address,
                isAdmin: resp.data[i].trainer_administrator
            })
            }
            // console.log(trainers);
            setAvailableTrainers(trainers);
        })
        setIsMounted(true);
    }

    const [selectedTab, setSelectedTab] = useState('Add Trainer');

    const ChosenPopup = () => {
        let popup;

        if (selectedTab === 'Access Trainer') {
            popup = <AccessTrainer setSelectedTab={setSelectedTab}
                setAvailableTrainers={setAvailableTrainers} AvailableTrainers={AvailableTrainers} />
        }  else if (selectedTab === 'Remove Trainer') {
            popup = <RemoveTrainer setSelectedTab={setSelectedTab} setAvailableTrainers={setAvailableTrainers} AvailableTrainers={AvailableTrainers}/>
        }  else  {
            popup = <AddTrainer setSelectedTab={setSelectedTab} setAvailableTrainers={setAvailableTrainers} />
        }

        return (popup);
    };

    const tabs = (
        <div className='subTitle1'>
            <div
                className={`subLeft ${selectedTab === 'Add Trainer' ? 'activeSubtitle' : ''}`}
                onClick={() => setSelectedTab('Add Trainer')}>Add Trainer</div>
            <div
                className={`subCenter ${selectedTab === 'Access Trainer' ? 'activeSubtitle' : ''}`}
                onClick={() => setSelectedTab('Access Trainer')}>Access Trainer</div>
            <div
                className={`subRight ${selectedTab === 'Remove Trainer' ? 'activeSubtitle' : ''}`}
                // className='subRight'
                onClick={() => setSelectedTab('Remove Trainer')}>Remove Trainer</div>
            <hr className="titleunderline2"></hr>
        </div>
    );

    return (
        <div className='backGround'>
            <PageTitle name="Manage Trainers" />
            {tabs}
            <div className='form2'>
                <ChosenPopup/>
            </div>
        </div>
    );
}

export default ManageAppointment;