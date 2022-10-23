import React, { useState } from 'react';
import './styles.css'
import SettingsDropdown from "./SettingsDropdwon";

const Banner = ({ setwpage, wpage, signedIn, userPermissions, setSignedIn }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const defaultbanner = (
        <div className="banner">
            <div className="tab" style={{left: '0px'}}>Logo Here</div>
                <div className='centerTabs'>
                    <div className="tab services"
                        onClick={() => setwpage('Services')}>Services</div>
                    <div className="tab aboutus" onClick={() => setwpage('About Us')}>About Us</div>
                    <div className="tab news" onClick={() => setwpage('News')}>News</div>
                </div>
        <div className="loginTab">
            <div className="login" onClick={() => setwpage('Log In')}>Log In</div>
            <div className="signup" onClick={() => setwpage('Sign Up')}>Sign Up</div>
        </div>
        </div>
    );
    
    const signInBanner = (
        <div className="banner">
            <div className="tab" style={{left: '0px'}}>Logo Here</div>
            <div className="tab centeredtab">{wpage}</div>
        <div className="loginTab">
            <div className="login" onClick={() => setwpage('Log In')}>Log In</div>
            <div className="signup" onClick={() => setwpage('Sign Up')}>Sign Up</div>
        </div>
        </div>
    );

    const signedInBanner = (
        <div className="banner">
            <div className="tab" style={{left: '0px'}}>Logo Here</div>
            <div className="tab services"
                onClick={() => setwpage('Services')}>Services</div>
            <div className="tab aboutus" onClick={() => setwpage('About Us')}>About Us</div>
            <div className="tab news" onClick={() => setwpage('News')}>News</div>
        <div className="loginTab">
            <div className="login" onClick={() => setwpage('Calendar')}>Calendar</div>
            <div className="signup" onClick={() => setShowDropdown(!showDropdown)}>Settings</div>
            {showDropdown && <SettingsDropdown userPermissions={userPermissions} setwpage={setwpage} setSignedIn={setSignedIn} />}
        </div>
    </div>
    );
    
    const changePasswordBanner = (
        <div className="banner">
            <div className="tab" style={{ left: '0px' }}>Logo Here</div>
            <div className="tab centeredtab">{wpage}</div>
            <div className="loginTab">
                <div className="login" onClick={() => setwpage('Log In')}>Log In</div>
                <div className="signup" onClick={() => setShowDropdown(!showDropdown)}>Settings</div>
                {showDropdown && <SettingsDropdown userPermissions={userPermissions} setwpage={setwpage} setSignedIn={setSignedIn} />}
            </div>
        </div>
    );
    // Logic to set banner here
    let banner;
    if (wpage === 'Log In' || wpage === 'Sign Up') {
        banner = signInBanner;
    } else if (signedIn === true) {
        (wpage === 'Change Password') ?
            banner = changePasswordBanner: banner = signedInBanner;
        console.log('Signed In Banner!')
    }
    else {
        banner = defaultbanner;
    }

    return (
        banner
    );
}

export default Banner;

