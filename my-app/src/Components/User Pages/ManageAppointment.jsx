import React, { useState } from 'react';
import AddAppointment from './SettingsPages/AddAppointment';
import RemoveAppointment from './SettingsPages/RemoveAppointment';
import AssignAppointment from './SettingsPages/AssignAppointment'
import UnassignAppointment from './SettingsPages/UnassignAppointment'
import './styles.css'
import EditAppoitment from './EditAppointment';
import PageTitle from './PageTitle';

const ManageAppointment = () => {
    const [selectedTab, setSelectedTab] = useState('Calendar');

    const ChosenPopup = () => {
        let popup;

        if (selectedTab === 'Add Appointment') {
            popup = <AddAppointment setSelectedTab={setSelectedTab} />
        } else if (selectedTab === 'Remove Appointment') {
            popup = <RemoveAppointment setSelectedTab={setSelectedTab}/>
        } else if (selectedTab === 'Assign Appointment') {
            popup = <AssignAppointment setSelectedTab={setSelectedTab}/>
        } else if (selectedTab === 'Unassign Appointment') {
            popup = <UnassignAppointment setSelectedTab={setSelectedTab} />
        } else if (selectedTab === 'Edit Appointment') {
            popup = <EditAppoitment setSelectedTab={setSelectedTab}/>
        }

        return (popup);
    };

    const tabs = (
        <div className='subTitle1'>
            <div className='subLeft' onClick={() => setSelectedTab('Add Appointment')}>Add Appointment</div>
            <div className='subLeft2' onClick={() => setSelectedTab('Remove Appointment')}>Remove Appointment</div>
            <div className='subCenter' onClick={() => setSelectedTab('Assign Appointment')}>Assign Appointment</div>
            <div className='subRight2' onClick={() => setSelectedTab('Unassign Appointment')}>Unassign Appointment</div>
            <div className='subRight' onClick={() => setSelectedTab('Edit Appointment')}>Edit Appointment</div>
        </div>
    );

    return (
        <div>
            <PageTitle name="Manage Appointments" />
            {tabs}
            <div className='form2'>
                <ChosenPopup />
            </div>
            
        </div>
    );
}

export default ManageAppointment;