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
        <div className='subTitle1'>
            <div className='subLeft2' onClick={() => setSelectedTab('Set Riding Level')}>Set Riding Level</div>
            <div className='subRight2' onClick={() => setSelectedTab('Delete Customers')}>Delete Customers</div>
            <hr className="titleunderline2"></hr>
        </div>
    );

    return (
        <div className='backGround'>
            <PageTitle name="Manage Customers" />
            {tabs}
            <div className='form2'>
                <ChosenPopup />
            </div>
            
        </div>
    );
}

export default ManageCustomers;