import React, { useState } from 'react';
import axios from 'axios';

import PageTitle from '../PageTitle';
import DeleteCustomers from './DeleteCustomers';
import SetRidingLevel from './SetRidigingLevel';
import '../../User Pages/styles.css'

const ManageCustomers = () => {
    const [isMounted, setIsMounted] = useState(false);

    if (!isMounted) {
        axios.get('/Admin/Customer').then(resp => {
            console.log('Customers List: ', resp.data)
        })
        setIsMounted(true);
    }


    const [selectedTab, setSelectedTab] = useState('Set Riding Level');

    const ChosenPopup = () => {
        let popup;

        if (selectedTab === 'Delete Customers') {
            popup = <DeleteCustomers setSelectedTab={setSelectedTab} />
        } else {
            popup = <SetRidingLevel setSelectedTab={setSelectedTab}/>
        } 

        return (popup);
    };

    const tabs = (
        <div className='subTitle1'>
            <div
                className={`subLeft2 ${selectedTab === 'Set Riding Level' ? 'activeSubtitle' : ''}`}
                onClick={() => setSelectedTab('Set Riding Level')}
            >Set Riding Level</div>
            <div
                className={`subRight2 ${selectedTab === 'Delete Customers' ? 'activeSubtitle' : ''}`}
                onClick={() => setSelectedTab('Delete Customers')}>Delete Customers</div>
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