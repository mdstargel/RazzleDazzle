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

function App() {
  const [wpage, setwpage] = useState('About Us')
  const [signedIn, setSignedIn] = useState(false)
  
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
    } else if (wpage === 'Forgot Password') {
      chosenpage = <ForgotPassword setSignedIn={setSignedIn} setwpage={setwpage} />
    }
    else {
      chosenpage = <AboutUs/>
    }
    return (chosenpage);
  };

  const webpage = (
    <div>
      <Banner setwpage={setwpage} wpage={wpage} signedIn={signedIn} />
      <ChosenWebpage />
    </div>
  );
  return (
    webpage
  );
}


export default App;
