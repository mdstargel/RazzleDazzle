import React from 'react';
const footerStyling = {
    position: 'fixed',
    bottom: '0px',
    marginTop: '100px',
    // top: '90vh',
    backgroundColor: '#0C1526',
    width: '100%',
    height: '89px',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '0',
    
    // position: 'relative',
	// marginTop: '-99px',
	// height: '99px',
    // width: '100%',
	// clear: 'both',
    // backgroundColor: '#0C1526',
    // color: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
    
}

const Footer = ({ customerAppointments }) => {
    return (
        <div>
            <div style={footerStyling}>
                <div className='footerCenter'>Rae's Riding Lessons</div>
                <div className='footerCenter'>Phone Number: (123) 456 - 7890</div>
                <div className='footerCenter'>raeridinglessons01@gmail.com</div>
            </div>
        </div>
        

        
    );
}

export default Footer;