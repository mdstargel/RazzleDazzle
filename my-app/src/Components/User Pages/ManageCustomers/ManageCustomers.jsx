import React, { useState } from 'react';
import PageTitle from '../PageTitle';
import DeleteCustomers from './DeleteCustomers';
import SetRidingLevel from './SetRidigingLevel';


const ManageCustomers = () => {
    const [selectedTab, setSelectedTab] = useState('Calendar');

    const ChosenPopup = () => {
        let popup;

        if (selectedTab === 'Delete Customers') {
            popup = <DeleteCustomers setSelectedTab={setSelectedTab} />
        } else if (selectedTab === 'Set Riding Level') {
            popup = <SetRidingLevel setSelectedTab={setSelectedTab}/>
        } else {
            popup = null;
        }

        return (popup);
    };

    const tabs = (
        <div style={{marginTop: '200px'}}>
            <div onClick={() => setSelectedTab('Set Riding Level')}>Set Riding Level</div>
            <div onClick={() => setSelectedTab('Delete Customers')}>Delete Customers</div>
        </div>
    );

    return (
        <div>
            <PageTitle name="Manage Customers" />
            {tabs}
            <ChosenPopup />
        </div>
    );
}

export default ManageCustomers;