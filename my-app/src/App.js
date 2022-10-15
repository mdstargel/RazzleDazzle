import './App.css';
import React, { useState } from 'react';

import Banner from './Components/Banner/Banner'
import AboutUs from './Components/User Pages/AboutUs';
import Services from './Components/User Pages/Services';
import News from './Components/User Pages/News';
import LogIn from './Components/User Pages/LogIn';
import SignUp from './Components/User Pages/SignUp';

function App() {
  const [wpage, setwpage] = useState('About Us')


  const ChosenWebpage = () => {
    let chosenpage;
    if(wpage === 'News') {
      chosenpage = <News/>
    } else if (wpage === 'Services') {
      chosenpage = <Services/>
    } else if (wpage === 'Log In') {
      chosenpage = <LogIn/>
    } else if (wpage === 'Sign Up') {
      chosenpage = <SignUp/>
    }
    else {
      chosenpage = <AboutUs/>
    }
    return (chosenpage);
  };

  const webpage = (
    <div>
      <Banner setwpage={setwpage} wpage={wpage} />
      <ChosenWebpage />
    </div>
  );
  return (
    webpage
  );
}


export default App;
