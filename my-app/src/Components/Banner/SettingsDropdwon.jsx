import React from "react";
import './styles.css'

const SettingsDropdown = ({ userPermissions, setwpage, setSignedIn, setShowDropdown }) => {
    const handleLogOut = () => {
        setwpage('About Us')
        setSignedIn(false)
    }

    const customerSettings = (
        <div className="dropDownMenu" style={{right: '0px'}}>
            <div className="pad" onClick={() => { setwpage('Edit Personal Information'); setShowDropdown(false) }}>Edit Personal Information</div>
            <hr/>
            <div className="pad" onClick={() => {setwpage('Change Password'); setShowDropdown(false)}}>Change Password</div>
            <hr/>
            <div className="pad" onClick={() => {setwpage('Manage Notifications'); setShowDropdown(false)}}>Manage Notifications</div>
            <hr/>
            {/* <div className="pad" onClick={() => {setwpage('View Session Notes'); setShowDropdown(false)}}>View Session Notes</div>
            <hr/> */}
            <div className="pad" onClick={() => {setwpage('Delete Account'); setShowDropdown(false)}}>Delete Account</div>
            <hr/>
            <div className="pad" onClick={() => { setwpage('Preferred Trainer'); setShowDropdown(false) }}>Preferred Trainer</div>
            <hr/>
            <div className="pad" onClick={handleLogOut}>Log Out</div>
        </div>
    );
    
    const trainerSettings = (
        <div className="dropDownMenu">
            <div className="pad" onClick={() => { setwpage('Edit Personal Information'); setShowDropdown(false) }}>Edit Personal Information</div>
            <hr/>
            <div className="pad" onClick={() => { setwpage('Change Password'); setShowDropdown(false) }}>Change Password</div>
            <hr/>
            <div className="pad" onClick={() => { setwpage('Manage Notifications'); setShowDropdown(false) }}>Manage Notifications</div>
            <hr/>
            <div className="pad" onClick={() => { setwpage('View Session Notes'); setShowDropdown(false) }}>View Session Notes</div>
            <hr/>
            {/* <div className="pad" onClick={() => { setwpage('Add/Edit Session Notes'); setShowDropdown(false) }}>Add/Edit Session Notes</div>
            <hr/> */}
            <div className="pad" onClick={() => { setwpage('Notify Customers'); setShowDropdown(false) }}>Notify Customers</div>
            <hr/>
            <div className="pad" onClick={handleLogOut}>Log Out</div>
        </div>
    );

    const adminSettings = (
        <div className="dropDownMenu" style={{right: '0px'}}>
            <div className="pad" onClick={() => { setwpage('Edit Personal Information'); setShowDropdown(false) }}>Edit Personal Information</div>
            <hr/>
            <div className="pad" onClick={() => { setwpage('Change Password'); setShowDropdown(false) }}>Change Password</div>
            <hr/>
            <div className="pad" onClick={() => { setwpage('Manage Notifications'); setShowDropdown(false) }}>Manage Notifications</div>
            <hr/>
            <div className="pad" onClick={() => { setwpage('View Session Notes'); setShowDropdown(false) }}>View Session Notes</div>
            <hr/>
            <div className="pad" onClick={() => { setwpage('Add/Edit News'); setShowDropdown(false) }}>Add/Edit News</div>
            <hr/>
            <div className="pad" onClick={() => { setwpage('Notify Customers'); setShowDropdown(false) }}>Notify Customers</div>
            <hr/>
            <div className="pad" onClick={() => { setwpage('Manage Customers'); setShowDropdown(false) }}>Manage Customers</div>
            <hr/>
            {/* <div className="pad" onClick={() => { setwpage('Edit Trainer Workload'); setShowDropdown(false) }}>Edit Trainer Workload</div>
            <hr/> */}
            <div className="pad" onClick={() => { setwpage('Manage Trainers'); setShowDropdown(false) }}>Manage Trainers</div>
            <hr/>
            {/* <div className="pad" onClick={() => setwpage('Manage Appointments')}>Manage Appointments</div>
            <hr/> */}
            <div className="pad" onClick={handleLogOut}>Log Out</div>
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