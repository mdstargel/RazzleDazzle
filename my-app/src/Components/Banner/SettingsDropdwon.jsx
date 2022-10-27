import React from "react";
import './styles.css'

const SettingsDropdown = ({ userPermissions, setwpage, setSignedIn }) => {
    const handleLogOut = () => {
        setwpage('About Us')
        setSignedIn(false)
    }

    const customerSettings = (
        <div className="dropDownMenu" style={{right: '0px'}}>
            <div className="pad" onClick={() => setwpage('Edit Personal Information')}>Edit Personal Information</div>
            <hr/>
            <div className="pad" onClick={() => setwpage('Change Password')}>Change Password</div>
            <hr/>
            <div className="pad" onClick={() => setwpage('Manage Notifications')}>Manage Notifications</div>
            <hr/>
            <div className="pad" onClick={() => setwpage('View Session Notes')}>View Session Notes</div>
            <hr/>
            <div className="pad" onClick={() => setwpage('Delete Account')}>Delete Account</div>
            <hr/>
            <div className="pad" onClick={() => setwpage('Preferred Trainer')}>Preferred Trainer</div>
            <hr/>
            <div className="pad" onClick={handleLogOut}>Log Out</div>
        </div>
    );
    
    const trainerSettings = (
        <div className="dropDownMenu">
            <div className="pad" onClick={() => setwpage('Edit Personal Information')}>Edit Personal Information</div>
            <hr/>
            <div className="pad" onClick={() => setwpage('Change Password')}>Change Password</div>
            <hr/>
            <div className="pad" onClick={() => setwpage('Manage Notifications')}>Manage Notifications</div>
            <hr/>
            <div className="pad" onClick={() => setwpage('View Session Notes')}>View Session Notes</div>
            <hr/>
            <div className="pad" onClick={() => setwpage('Add/Edit Session Notes')}>Add/Edit Session Notes</div>
            <hr/>
            <div className="pad" onClick={() => setwpage('Notify Customers')}>Notify Customers</div>
            <hr/>
            <div className="pad" onClick={handleLogOut}>Log Out</div>
        </div>
    );

    const adminSettings = (
        <div className="dropDownMenu" style={{right: '0px'}}>
            <div className="pad" onClick={() => setwpage('Edit Personal Information')}>Edit Personal Information</div>
            <hr/>
            <div className="pad" onClick={() => setwpage('Change Password')}>Change Password</div>
            <hr/>
            <div className="pad" onClick={() => setwpage('Manage Notifications')}>Manage Notifications</div>
            <hr/>
            <div className="pad" onClick={() => setwpage('View Session Notes')}>View Session Notes</div>
            <hr/>
            <div className="pad" onClick={() => setwpage('Add/Edit News')}>Add/Edit News</div>
            <hr/>
            <div className="pad" onClick={() => setwpage('Notify Customers')}>Notify Customers</div>
            <hr/>
            <div className="pad" onClick={() => setwpage('Manage Customers')}>Manage Customers</div>
            <hr/>
            <div className="pad" onClick={() => setwpage('Edit Trainer Workload')}>Edit Trainer Workload</div>
            <hr/>
            <div className="pad" onClick={() => setwpage('Manage Trainers')}>Manage Trainers</div>
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