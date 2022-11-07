import React from 'react';
 
const CalendarEditButton = ({ onClick }) => {

    return (
        <input type='button' value='Edit' onClick={onClick} style={{
            backgroundColor: '#0C1526',
            color: 'White',
            marginRight: '3px',
            marginLeft: '-5px',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            borderRadius: '10px',
            textAlign: 'center',
        }}>
        </input>
    );
};

export default CalendarEditButton;