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
import ManageAppointment from './Components/User Pages/ManageAppointment'
import AddEditNews from './Components/User Pages/SettingsPages/AddEditNews';
import ManageTrainers from './Components/User Pages/ManageTrainers';
import ManageCustomers from './Components/User Pages/ManageCustomers/ManageCustomers';
function App() {
  const [wpage, setwpage] = useState('About Us')
  const [signedIn, setSignedIn] = useState(false)
  /**
   * Backend needs to assign this
   */
  const [newsArticles, setNewsArticles] = useState([
    {
      title: 'title1',
      url: 'website1',
      image: 'image1',
      description: 'description1',
    },
    {
      title: 'title2',
      url: 'website2',
      image: 'image2',
      description: 'description2',
    },
  ])

  /**
   * We need backend to validate when the user signs in who they are
   */
  const [userPermissions, setUserPermissions] = useState({
    isAdmin: true,
    isTrainer: false,
    isCustomer: false,
  })
  
  const ChosenWebpage = () => {
    let chosenpage;
    if(wpage === 'News') {
      chosenpage = <News newsArticles={newsArticles} />
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
      chosenpage = <AddEditNews setSignedIn={setSignedIn} setwpage={setwpage} />
    }else if (wpage === 'Notify Customers') {
      chosenpage = <NotifyCustomers setwpage={setwpage} />
    }else if (wpage === 'Manage Customers') {
      chosenpage = <ForgotPassword setSignedIn={setSignedIn} setwpage={setwpage} />
    } else if (wpage === 'Manage Appointments') {
      chosenpage = <ManageAppointment setwpage={setwpage}/>
    } else if (wpage === 'Delete Account') {
      chosenpage = <DeleteAccount setSignedIn={setSignedIn} setwpage={setwpage} />
    }  else if (wpage === 'Preferred Trainer') {
      chosenpage = <PreferredTrainer setwpage={setwpage} />
    } else if (wpage === 'Add/Edit Session Notes') {
      chosenpage = <AddEditSessionNotes setwpage={setwpage} />
    } else if (wpage === 'Manage Trainers') {
      chosenpage = <ManageTrainers setwpage={setwpage} />
    } else if (wpage === 'Manage Trainers') {
      chosenpage = <ManageCustomers setwpage={setwpage} />
    }
    else {
      chosenpage = <AboutUs/>
    }
    // return (chosenpage);
    return (<ManageCustomers setwpage={setwpage} />);
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
