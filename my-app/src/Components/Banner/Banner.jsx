import React, { useState } from 'react';
import './styles.css'
import SettingsDropdown from "./SettingsDropdwon";

const Banner = ({ setwpage, wpage, signedIn, userPermissions, setSignedIn }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const defaultbanner = (
        <div className="banner">
            <div className="tab" style={{ left: '0px' }}>Logo Here</div>
            <div
                className={`tab services ${wpage === "Services" ? 'activetab' : ''}`}
                        onClick={() => setwpage('Services')} >Services</div>
            <div
                className={`tab aboutus ${wpage === "About Us" ? 'activetab' : ''}`}
                onClick={() => setwpage('About Us')}>About Us</div>
            <div
                className={`tab news ${wpage === "News" ? 'activetab' : ''}`}
                onClick={() => setwpage('News')}>News</div>
            <div className="loginTab">
                <div
                    className={`login ${wpage === "Log In" ? 'activetab' : ''}`}
                    onClick={() => setwpage('Log In')}>Log In</div>
                <div
                    className={`signup ${wpage === "Sign Up" ? 'activetab' : ''}`}
                    onClick={() => setwpage('Sign Up')}>Sign Up</div>
            </div>
        </div>
    );
    
    const signInBanner = (
        <div className="banner">
            <div className="tab" style={{left: '0px'}}>Logo Here</div>
            <div className="tab centerTabs">{wpage}</div>
        <div className="loginTab">
                <div
                    className={`login ${wpage === "Log In" ? 'activetab' : ''}`}
                    onClick={() => setwpage('Log In')}>Log In</div>
                <div
                    className={`signup ${wpage === "Sign Up" ? 'activetab' : ''}`}
                    onClick={() => setwpage('Sign Up')}>Sign Up</div>
        </div>
        </div>
    );

    const signedInBanner = (
        <div className="banner">
            <div className="tab" style={{left: '0px'}}>Logo Here</div>
            <div
                className={`tab services ${wpage === "Services" ? 'activetab' : ''}`}
                onClick={() => setwpage('Services')}>Services</div>
            <div
                className={`tab aboutus ${wpage === "About Us" ? 'activetab' : ''}`}
                onClick={() => setwpage('About Us')}>About Us</div>
            <div
                className={`tab news ${wpage === "News" ? 'activetab' : ''}`}
                onClick={() => setwpage('News')}>News</div>
        <div className="loginTab">
                <div
                    className={`login ${wpage === "Calendar" ? 'activetab' : ''}`}
                    onClick={() => setwpage('Calendar')}>Calendar</div>
                <div
                    className={`signup ${showDropdown ? 'activetab' : ''}`}
                    onClick={() => setShowDropdown(!showDropdown)}>Settings</div>
                {showDropdown && <SettingsDropdown userPermissions={userPermissions} setwpage={setwpage} setSignedIn={setSignedIn} setShowDropdown={setShowDropdown} />}
        </div>
    </div>
    );
    
    
    // Logic to set banner here
    let banner;
    if (wpage === 'Log In' || wpage === 'Sign Up') {
        banner = signInBanner;
    } else if (signedIn === true) {
            banner = signedInBanner;
        console.log('Signed In Banner!');
    }
    else {
        banner = defaultbanner;
    }

    return (
        banner
    );
}

export default Banner;

