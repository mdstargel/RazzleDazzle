import React from "react";
import './styles.css'

const Banner = ({setwpage, wpage}) => {
    
    const banner = (
        <div className="banner">
            <div className="tab" style={{left: '0px'}}>Logo Here</div>
            <div className="tab services"
                onClick={() => setwpage('Services')}>Services</div>
            <div className="tab aboutus" onClick={() => setwpage('About Us')}>About Us</div>
            <div className="tab news" onClick={() => setwpage('News')}>News</div>
        <div className="loginTab">
            <div className="login" onClick={() => setwpage('Log In')}>Log In</div>
            <div className="signup" onClick={() => setwpage('Sign Up')}>Sign Up</div>
        </div>
        </div>);
    return (
    banner
    );
}

export default Banner;

