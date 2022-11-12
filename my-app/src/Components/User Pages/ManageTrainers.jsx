import React, { useState } from 'react';
import PageTitle from './PageTitle';
import AccessTrainer from './SettingsPages/ManageTrainers/AccessTrainer';
import AddTrainer from './SettingsPages/ManageTrainers/AddTrainer';
import RemoveTrainer from './SettingsPages/ManageTrainers/RemoveTrainer';

const ManageAppointment = () => {
    const [selectedTab, setSelectedTab] = useState('Add Trainer');

    const ChosenPopup = () => {
        let popup;

        if (selectedTab === 'Access Trainer') {
            popup = <AccessTrainer setSelectedTab={setSelectedTab} />
        }  else if (selectedTab === 'Remove Trainer') {
            popup = <RemoveTrainer setSelectedTab={setSelectedTab}/>
        }  else  {
            popup = <AddTrainer setSelectedTab={setSelectedTab}/>
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