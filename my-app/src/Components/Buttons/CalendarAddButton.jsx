import React from 'react';
 
const CalendarAddButton = ({ onClick }) => {
    return (
        <input type='button' value='Add' onClick={onClick} style={{
            backgroundColor: '#0C1526',
            color: 'White',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            borderRadius: '10px',
            textAlign: 'center',
        }}>
        </input>
    );
};

export default CalendarAddButton;