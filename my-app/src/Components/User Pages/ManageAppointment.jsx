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
        <div style={{marginTop: '200px'}}>
            <div onClick={() => setSelectedTab('Add Appointment')}>Add Appointment</div>
            <div onClick={() => setSelectedTab('Remove Appointment')}>Remove Appointment</div>
            <div onClick={() => setSelectedTab('Assign Appointment')}>Assign Appointment</div>
            <div onClick={() => setSelectedTab('Unassign Appointment')}>Unassign Appointment</div>
            <div onClick={() => setSelectedTab('Edit Appointment')}>Edit Appointment</div>
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