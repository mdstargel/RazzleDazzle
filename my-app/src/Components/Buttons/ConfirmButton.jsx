import React from 'react';
 
const ConfirmButton = ({buttonText, onClick}) => {
    return (
        <input type='button' value={buttonText} onClick={onClick} style={{
            backgroundColor: '#0C1526',
            color: 'White',
            width: '140px',
            height: '45px',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            borderRadius: '10px',
            textAlign: 'center',
        }}>
        </input>
    );
};

export default ConfirmButton;