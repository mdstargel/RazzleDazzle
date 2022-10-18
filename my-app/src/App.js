import './App.css';
import React, { useState } from 'react';

import Banner from './Components/Banner/Banner'
import AboutUs from './Components/User Pages/AboutUs';
import Services from './Components/User Pages/Services';
import News from './Components/User Pages/News';
import LogIn from './Components/User Pages/LogIn';
import SignUp from './Components/User Pages/SignUp';
import Calendar from './Components/User Pages/Calendar';
import ForgotPassword from './Components/User Pages/ForgotPassword';
import ChangePassword from './Components/User Pages/SettingsPages/ChangePassword';
import ManageNotifications from './Components/User Pages/SettingsPages/ManageNotifications';
import ViewSessionNotes from './Components/User Pages/SettingsPages/ViewSessionNotes';
import DeleteAccount from './Components/User Pages/SettingsPages/DeleteAccount';
import PreferredTrainer from './Components/User Pages/SettingsPages/PreferredTrainer';
import AddEditSessionNotes from './Components/User Pages/SettingsPages/AddEditSessionNotes';
import NotifyCustomers from './Components/User Pages/SettingsPages/NotifyCustomers';
import EditPersonalInformation from './Components/User Pages/SettingsPages/EditPersonalInformation';

function App() {
  const [wpage, setwpage] = useState('About Us')
  const [signedIn, setSignedIn] = useState(false)

  /**
   * We need backend to validate when the user signs in who they are
   */
  const [userPermissions, setUserPermissions] = useState({
    isAdmin: false,
    isTrainer: false,
    isCustomer: true,
  })
  
  const ChosenWebpage = () => {
    let chosenpage;
    if(wpage === 'News') {
      chosenpage = <News/>
    } else if (wpage === 'Services') {
      chosenpage = <Services/>
    } else if (wpage === 'Log In') {
      chosenpage = <LogIn setSignedIn={setSignedIn} setwpage={setwpage} />
    } else if (wpage === 'Sign Up') {
      chosenpage = <SignUp setSignedIn={setSignedIn} setwpage={setwpage} />
    } else if (wpage === 'Calendar') {
      chosenpage = <Calendar/>
    } else if (wpage === 'Edit Personal Information') {
      chosenpage = <EditPersonalInformation setwpage={setwpage} />
    } else if (wpage === 'Change Password') {
      chosenpage = <ChangePassword setwpage={setwpage}/>
    }else if (wpage === 'Manage Notifications') {
      chosenpage = <ManageNotifications setwpage={setwpage} />
    }else if (wpage === 'View Session Notes') {
      chosenpage = <ViewSessionNotes />
    }else if (wpage === 'Add/Edit News') {
      chosenpage = <ForgotPassword setSignedIn={setSignedIn} setwpage={setwpage} />
    }else if (wpage === 'Notify Customers') {
      chosenpage = <NotifyCustomers setwpage={setwpage} />
    }else if (wpage === 'Manage Customers') {
      chosenpage = <ForgotPassword setSignedIn={setSignedIn} setwpage={setwpage} />
    }else if (wpage === 'Add Appointment') {
      chosenpage = <ForgotPassword setSignedIn={setSignedIn} setwpage={setwpage} />
    }else if (wpage === 'Remove Appointment') {
      chosenpage = <ForgotPassword setSignedIn={setSignedIn} setwpage={setwpage} />
    } else if (wpage === 'Assign Appointment') {
      chosenpage = <ForgotPassword setSignedIn={setSignedIn} setwpage={setwpage} />
    } else if (wpage === 'Unassign Appointment') {
      chosenpage = <ForgotPassword setSignedIn={setSignedIn} setwpage={setwpage} />
    } else if (wpage === 'Edit Appointment') {
      chosenpage = <ForgotPassword setSignedIn={setSignedIn} setwpage={setwpage} />
    } else if (wpage === 'Delete Account') {
      chosenpage = <DeleteAccount setSignedIn={setSignedIn} setwpage={setwpage} />
    }  else if (wpage === 'Preferred Trainer') {
      chosenpage = <PreferredTrainer setwpage={setwpage} />
    } else if (wpage === 'Add/Edit Session Notes') {
      chosenpage = <AddEditSessionNotes setwpage={setwpage} />
    } else {
      chosenpage = <AboutUs/>
    }
    return (chosenpage);
  };

  const webpage = (
    <div>
      <Banner setwpage={setwpage} wpage={wpage} signedIn={signedIn} userPermissions={userPermissions} setSignedIn={setSignedIn}/>
      <ChosenWebpage />
    </div>
  );
  return (
    webpage
  );
}


export default App;
