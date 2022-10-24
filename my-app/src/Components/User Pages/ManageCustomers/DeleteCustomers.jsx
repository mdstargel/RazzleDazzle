import React, { useState } from 'react';
import ConfirmButton from '../../Buttons/ConfirmButton';
import CancelButton from '../../Buttons/CancelButton';

const DeleteCustomer = () => {
    /**
     * Replace following object with information from the backend
     */
    const [AvailableCustomers, setAvailableCustomers] = useState([{
        Customer: 'John Doe',
        Style: 'Western',
        Level: 'Beginner',
        isPreffered: false
    },
    {
        Customer: 'Jane Doe',
        Style: 'English',
        Level: 'Intermediate',
        isPreffered: true

    },
    {
        Customer: 'James Doe',
        Style: 'Show',
        Level: 'Expert',
        isPreffered: false

    },]);
    
    const handleSetDeleteCustomer = ({ data }) => {
        setAvailableCustomers([...AvailableCustomers].map(object => {
            if(object.Customer === data.Customer) {
              return {
                ...object,
                isPreffered: true,
              }
            }
            else return {
                ...object,
            };
          }))
    }

    const handleCancelDeleteCustomer = (event) => {
        event.preventDefault();

        setAvailableCustomers([...AvailableCustomers].filter(object =>
            object.isPreffered !== true))       
    };

    const handleDeleteCustomer = (event) => {
        event.preventDefault();

        setAvailableCustomers([...AvailableCustomers].filter(object =>
            object.isPreffered !== true))       
        
        /**
         * Update Database here
         */
    };

    const CustomersList = 
        AvailableCustomers.map((data) => (
            data.isPreffered === true ?
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',                   
                }}>
                    <span style={{ backgroundColor: '#FFFF00' }}>{data.Customer}</span>
                    <span style={{ backgroundColor: '#FFFF00' }}>{data.Style}</span>
                    <span style={{ backgroundColor: '#FFFF00' }}>{data.Level}</span>
                
                </div> :
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                }}
                    onClick={() => handleSetDeleteCustomer({ data })}>
                    <span >{data.Customer}</span>
                    <span >{data.Style}</span>
                    <span >{data.Level}</span>
                
                </div>

        ))
            
    const PreferredCustomerFormHeading = (
        <div style={{display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            marginTop: '300px'
            }
        }>
            <div>Customer</div>
            <div>Style</div>
            <div>Level</div>
        </div>
    )
    
    return (
        <div>
            {PreferredCustomerFormHeading}
            {CustomersList}
            <CancelButton onClick={handleCancelDeleteCustomer} />
            <ConfirmButton buttonText={'Delete'} onClick={handleDeleteCustomer} />
        </div>
    );
}

export default DeleteCustomer;