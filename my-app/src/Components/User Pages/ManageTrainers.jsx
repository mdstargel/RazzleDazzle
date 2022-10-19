import React, { useState } from 'react';
import PageTitle from './PageTitle';
import AccessTrainer from './SettingsPages/ManageTrainers/AccessTrainer';
import AddTrainer from './SettingsPages/ManageTrainers/AddTrainer';
import RemoveTrainer from './SettingsPages/ManageTrainers/RemoveTrainer';

const ManageAppointment = () => {
    const [selectedTab, setSelectedTab] = useState('Calendar');

    const ChosenPopup = () => {
        let popup;

        if (selectedTab === 'Access Trainer') {
            popup = <AccessTrainer setSelectedTab={setSelectedTab} />
        } else if (selectedTab === 'Add Trainer') {
            popup = <AddTrainer setSelectedTab={setSelectedTab}/>
        } else if (selectedTab === 'Remove Trainer') {
            popup = <RemoveTrainer setSelectedTab={setSelectedTab}/>
        } 

        return (popup);
    };

    const tabs = (
        <div style={{marginTop: '200px'}}>
            <div onClick={() => setSelectedTab('Access Trainer')}>Add Trainer</div>
            <div onClick={() => setSelectedTab('Add Trainer')}>Remove Appointment</div>
            <div onClick={() => setSelectedTab('Remove Trainer')}>Remove Trainer</div>
        </div>
    );

    return (
        <div>
            <PageTitle name="Manage Trainers" />
            {tabs}
            <ChosenPopup />
        </div>
    );
}

export default ManageAppointment;