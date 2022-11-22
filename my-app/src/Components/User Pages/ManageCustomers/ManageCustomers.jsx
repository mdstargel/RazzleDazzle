import React, { useState } from 'react';
import axios from 'axios';

import PageTitle from '../PageTitle';
import DeleteCustomers from './DeleteCustomers';
import SetRidingLevel from './SetRidigingLevel';
import '../../User Pages/styles.css'

const ManageCustomers = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [AvailableCustomers, setAvailableCustomers] = useState([]);
    if (!isMounted) {
        axios.get('/Admin/Customer').then(resp => {
            let customers = [];
            for (var i = 0; i < resp.data.length; i++) {
                let name_array = resp.data[i].customer_name.split(" ");
                customers.push({
                    id: resp.data[i].CID,
                    FirstName: name_array[0],
                    LastName: name_array[1],
                    Level: resp.data[i].customer_difficulty
                })
                console.log('Customers List: ', customers);
            }
            setIsMounted(true);
            setAvailableCustomers(customers);
        })
    }



    const [selectedTab, setSelectedTab] = useState('Set Riding Level');

    const ChosenPopup = () => {
        let popup;

        if (selectedTab === 'Delete Customers') {
            popup = <DeleteCustomers setSelectedTab={setSelectedTab} AvailableCustomers={AvailableCustomers}
                setAvailableCustomers={setAvailableCustomers} />
        } else {
            popup = <SetRidingLevel setSelectedTab={setSelectedTab} AvailableCustomers={AvailableCustomers}
                setAvailableCustomers={setAvailableCustomers}/>
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