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
        <div className='subTitle1'>
            <div className='subLeft2' onClick={() => setSelectedTab('Add Customers')}>Add Customers</div>
            <div className='subRight2' onClick={() => setSelectedTab('Remove Customers')}>Remove Customers</div>
            <hr className="titleunderline2"></hr>
        </div>
    );

    return (
        <div className='backGround'>
            <PageTitle name="Manage Appointments" />
            {tabs}
            <div className='form2'>
                <ChosenPopup />
            </div>
            
        </div>
    );
}

export default ManageAppointment;