import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

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
import TrainerWorkload from './Components/User Pages/Trainer Workload/TrainerWorkload';
import HorseWatermark from './Components/User Pages/Assets/FINALWATERMARK.jpg';
import Help from './Components/Help/Help.jsx';
import Footer from './Components/Banner/Footer';

function App() {
  const [isMounted, setIsMounted] = useState(false);
  const [wpage, setwpage] = useState('About Us')
  const [signedIn, setSignedIn] = useState(false)
  /**
   * Backend needs to assign this
   */
  const [newsArticles, setNewsArticles] = useState([
    {
      id: 1,
      title: 'Title 1',
      url: 'website1',
      image: 'https://images.pexels.com/photos/9944455/pexels-photo-9944455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Sed odio morbi quis commodo odio. Enim diam vulputate ut pharetra sit amet. Ut etiam sit amet nisl purus in mollis. Volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris. Nunc mi ipsum faucibus vitae aliquet nec. Ridiculus mus mauris vitae ultricies leo integer. In ornare quam viverra orci sagittis eu volutpat odio facilisis.',
    },
    {
      id: 2,
      title: 'Title 2',
      url: 'website2',
      image: 'https://images.pexels.com/photos/9622112/pexels-photo-9622112.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Sed odio morbi quis commodo odio. Enim diam vulputate ut pharetra sit amet. Ut etiam sit amet nisl purus in mollis. Volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris. Nunc mi ipsum faucibus vitae aliquet nec. Ridiculus mus mauris vitae ultricies leo integer. In ornare quam viverra orci sagittis eu volutpat odio facilisis.',
    },
    {
      id: 3,
      title: 'Title 3',
      url: 'website3',
      image: 'https://images.pexels.com/photos/997474/pexels-photo-997474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Sed odio morbi quis commodo odio. Enim diam vulputate ut pharetra sit amet. Ut etiam sit amet nisl purus in mollis. Volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris. Nunc mi ipsum faucibus vitae aliquet nec. Ridiculus mus mauris vitae ultricies leo integer. In ornare quam viverra orci sagittis eu volutpat odio facilisis.',
    },
    {
      id: 4,
      title: 'Title 4',
      url: 'website4',
      image: 'https://images.pexels.com/photos/7359364/pexels-photo-7359364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Sed odio morbi quis commodo odio. Enim diam vulputate ut pharetra sit amet. Ut etiam sit amet nisl purus in mollis. Volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris. Nunc mi ipsum faucibus vitae aliquet nec. Ridiculus mus mauris vitae ultricies leo integer. In ornare quam viverra orci sagittis eu volutpat odio facilisis.',
    },
    {
      id: 5,
      title: 'Title 5',
      url: 'website5',
      image: 'https://images.pexels.com/photos/12950499/pexels-photo-12950499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Sed odio morbi quis commodo odio. Enim diam vulputate ut pharetra sit amet. Ut etiam sit amet nisl purus in mollis. Volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris. Nunc mi ipsum faucibus vitae aliquet nec. Ridiculus mus mauris vitae ultricies leo integer. In ornare quam viverra orci sagittis eu volutpat odio facilisis.',
    },
  ])

  /**
   * We need backend to validate when the user signs in who they are
   */
  const [userPermissions, setUserPermissions] = useState({
    isAdmin: false,
    isTrainer: false,
    isCustomer: false,
  })
  
  const [UserInfo, setUserInfo] = useState()
  if (!isMounted) {
        axios.get('/Public_News').then(resp => {
          setNewsArticles(resp.data);
            console.log('news teset: ', resp.data);

        })
        setIsMounted(true);
    }
  
  const ChosenWebpage = () => {
    let chosenpage;
    if (wpage === 'News') {
      chosenpage = <News newsArticles={newsArticles} />
    } else if (wpage === 'Services') {
      chosenpage = <Services />
    } else if (wpage === 'Log In') {
      chosenpage = <LogIn setSignedIn={setSignedIn} setwpage={setwpage}
        setUserPermissions={setUserPermissions} userPermissions={userPermissions}
        setUserInfo={setUserInfo} />
    } else if (wpage === 'Sign Up') {
      chosenpage = <SignUp setSignedIn={setSignedIn} setwpage={setwpage}
        setUserPermissions={setUserPermissions}
        setUserInfo={setUserInfo} />
    } else if (wpage === 'Calendar') {
      chosenpage = <Calendar userPermissions={userPermissions} />
    } else if (wpage === 'Edit Personal Information') {
      chosenpage = <EditPersonalInformation setwpage={setwpage} UserInfo={UserInfo} setUserInfo={setUserInfo} />
    } else if (wpage === 'Change Password') {
      chosenpage = <ChangePassword setwpage={setwpage} UserInfo={UserInfo} />
    }else if (wpage === 'Manage Notifications') {
      chosenpage = <ManageNotifications setwpage={setwpage} />
    }else if (wpage === 'View Session Notes') {
      chosenpage = <ViewSessionNotes />
    }else if (wpage === 'Add/Edit News') {
      chosenpage = <AddEditNews setSignedIn={setSignedIn} setwpage={setwpage} setNewsArticles={setNewsArticles}/>
    }else if (wpage === 'Notify Customers') {
      chosenpage = <NotifyCustomers setwpage={setwpage} />
    } else if (wpage === 'Manage Appointments') {
      chosenpage = <ManageAppointment setwpage={setwpage}/>
    } else if (wpage === 'Delete Account') {
      chosenpage = <DeleteAccount setSignedIn={setSignedIn} setwpage={setwpage} UserInfo={UserInfo} />
    }  else if (wpage === 'Preferred Trainer') {
      chosenpage = <PreferredTrainer setwpage={setwpage} />
    } else if (wpage === 'Add/Edit Session Notes') {
      chosenpage = <AddEditSessionNotes setwpage={setwpage} />
    } else if (wpage === 'Manage Trainers') {
      chosenpage = <ManageTrainers setwpage={setwpage} UserInfo={UserInfo} />
    } else if (wpage === 'Manage Customers') {
      chosenpage = <ManageCustomers setwpage={setwpage} />
    } else if (wpage === 'Edit Trainer Workload') {
      chosenpage = <TrainerWorkload setwpage={setwpage}/>
    } else if (wpage === 'Forgot Password') {
      chosenpage = <ForgotPassword setwpage={setwpage}/>
    }
    else {
      chosenpage = <AboutUs/>
    }
    return (chosenpage);
    // return (<TrainerWorkload></TrainerWorkload>)
  };


  /**
   * Sets background to be a certain color
   */
  document.body.style = 'background: #D0D0D0;';
  
  // document.body.style = 'backgroundImage: `url(${HorseWatermark})`';
  // 'backgroundImage: url("./Components/User Pages/Assets/FINALWATERMARK.jpg")';
  // backgroundImage:"url(/UpmostlyLogo.png)"
  // Or with CSS
  // document.body.classList.add('background-red');
  const webpage = (
    <div>
      <img src={HorseWatermark} className='watermarkBack' alt="Horse Watermark" />
      <Banner setwpage={setwpage} wpage={wpage} signedIn={signedIn} userPermissions={userPermissions} setSignedIn={setSignedIn} />
      <Help wpage={wpage} userPermissions={userPermissions} />
      <ChosenWebpage />
      {/* <Footer /> */}
    </div>
  );
  return (
  webpage
  );
}


export default App;
