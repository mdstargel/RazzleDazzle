import React from "react";
import './styles.css'

const SettingsDropdown = ({userPermissions, setwpage, setSignedIn}) => {
    const customerSettings = (
        <div>
            <div onClick={() => setwpage('Edit Personal Information')}>Edit Personal Information</div>
            <div onClick={() => setwpage('Change Password')}>Change Password</div>
            <div onClick={() => setwpage('Manage Notifications')}>Manage Notifications</div>
            <div onClick={() => setwpage('View Session Notes')}>View Session Notes</div>
            <div onClick={() => setwpage('Delete Account')}>Delete Account</div>
            <div onClick={() => setwpage('Preferred Trainer')}>Preferred Trainer</div>
            <div onClick={() => setSignedIn(false)}>Log Out</div>
        </div>
    );
    
    const trainerSettings = (
        <div>
            <div onClick={() => setwpage('Edit Personal Information')}>Edit Personal Information</div>
            <div onClick={() => setwpage('Change Password')}>Change Password</div>
            <div onClick={() => setwpage('Manage Notifications')}>Manage Notifications</div>
            <div onClick={() => setwpage('View Session Notes')}>View Session Notes</div>
            <div onClick={() => setwpage('Add/Edit Session Notes')}>Add/Edit Session Notes</div>
            <div onClick={() => setwpage('Notify Customers')}>Notify Customers</div>
            <div onClick={() => setSignedIn(false)}>Log Out</div>
        </div>
    );

    const adminSettings = (
        <div>
            <div onClick={() => setwpage('Edit Personal Information')}>Edit Personal Information</div>
            <div onClick={() => setwpage('Change Password')}>Change Password</div>
            <div onClick={() => setwpage('Manage Notifications')}>Manage Notifications</div>
            <div onClick={() => setwpage('View Session Notes')}>View Session Notes</div>
            <div onClick={() => setwpage('Add/Edit News')}>Add/Edit News</div>
            <div onClick={() => setwpage('Notify Customers')}>Notify Customers</div>
            <div onClick={() => setwpage('Manage Customers')}>Manage Customers</div>
            <div onClick={() => setwpage('Edit Trainer Workload')}>Edit Trainer Workload</div>
            <div onClick={() => setwpage('Manage Trainers')}>Manage Trainers</div>
            <div onClick={() => setwpage('Add Appointment')}>Add Appointment</div>
            <div onClick={() => setwpage('Assign Appointment')}>Assign Appointment</div>
            <div onClick={() => setwpage('Unassign Appointment')}>Unassign Appointment</div>
            <div onClick={() => setwpage('Edit Appointment')}>Edit Appointment</div>
            <div onClick={() => setSignedIn(false)}>Log Out</div>
        </div>
    );

    /**
     * Need information from Backend to validate user permissions
     */
    let settingsToDisplay;
    if (userPermissions.isCustomer) {
        settingsToDisplay = customerSettings
    } else if (userPermissions.isTrainer) {
        settingsToDisplay = trainerSettings
    } else {
        settingsToDisplay = adminSettings
    }
  
    return (<div
        style={{ marginTop: '1000px', color: 'black', marginLeft: '1400px'}
        }>
            {settingsToDisplay}
        </div>);
}

export default SettingsDropdown;