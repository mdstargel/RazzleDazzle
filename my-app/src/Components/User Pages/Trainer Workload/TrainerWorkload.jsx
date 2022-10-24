import React, { useState } from 'react';
import PageTitle from '../PageTitle';
import AddCustomres from './AddCustomer';
import RemoveCustomers from './RemoveCustomers';

const ManageAppointment = () => {
    const [selectedTab, setSelectedTab] = useState('Calendar');

    const ChosenPopup = () => {
        let popup;

        if (selectedTab === 'Add Customers') {
            popup = <AddCustomres setSelectedTab={setSelectedTab} />
        } else if (selectedTab === 'Remove Customers') {
            popup = <RemoveCustomers setSelectedTab={setSelectedTab} />
        } else {
            popup = null;
        }

        return (popup);
    };

    const tabs = (
        <div style={{marginTop: '200px'}}>
            <div onClick={() => setSelectedTab('Add Customers')}>Add Customers</div>
            <div onClick={() => setSelectedTab('Remove Customers')}>Remove Customers</div>
        </div>
    );

    return (
        <div>
            <PageTitle name="Manage Appointments" />
            {tabs}
            <ChosenPopup />
        </div>
    );
}

export default ManageAppointment;