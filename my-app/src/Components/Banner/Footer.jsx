import React from 'react';
const footerStyling = {
    position: 'fixed',
    bottom: '0',
    backgroundColor: '#0C1526',
    width: '100%',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
}

const Footer = ({ customerAppointments }) => {
    return (
        <div style={footerStyling}>
            <div>Rae's Riding Lessons</div>
            <div>Purple Team</div>
            <div>Put our sample GMAIL here</div>
        </div>
    );
}

export default Footer;