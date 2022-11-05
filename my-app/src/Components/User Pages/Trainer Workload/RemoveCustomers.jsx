import React, { useState } from 'react';
import CancelButton from "../../Buttons/CancelButton";
import ConfirmButton from "../../Buttons/ConfirmButton";

const RemoveCustomers = () => {
    /**
     * Get Information From Database
     */
    const [selectedTrainerId, setSelectedTrainerId] = useState();

    const [Trainers, setTrainers] = useState([{
        id: 1,
        FirstName: 'John',
        LastName: 'Doe',
        Style: 'Western',
        Experience: '1',
        isSelected: false,
        AssignedCustomerIds: [1, 2, 3],
    },
    {
        id: 2,
        FirstName: 'Jane',
        LastName: 'Doe',
        Style: 'English',
        Experience: '2',
        isSelected: false,
        AssignedCustomerIds: [],
    },
    {
        id: 3,
        FirstName: 'James',
        LastName: 'Doe',
        Style: 'Show',
        Experience: '3',
        isSelected: false,
        AssignedCustomerIds: [],
    },]);

    const [Customers, setCustomers] = useState([{
        id: 1,
        FirstName: 'John',
        LastName: 'Doe',
        Style: 'Western',
        Experience: 'Advanced',
        isSelected: false,
        PreferredTrainer: 1,
    },
    {
        id: 2,
        FirstName: 'Jane',
        LastName: 'Doe',
        Style: 'English',
        Experience: 'Beginner',
        isSelected: false,
        PreferredTrainer: 1,
    },
    {
        id: 3,
        FirstName: 'James',
        LastName: 'Doe',
        Style: 'Show',
        Experience: 'Intermediate',
        isSelected: false,
        PreferredTrainer: 1,
        },]);
    
    const removeTrainersTrainees = ( customerID ) => {
        setTrainers([...Trainers].map(object => {
            if (object.AssignedCustomerIds.includes(customerID)) {
                return {
                    ...object,
                    AssignedCustomerIds: object.AssignedCustomerIds.filter(id => id !== customerID),
                }
            } else
            return {...object}
        }))
    }
    const handleRemoveCustomers = () => {
        setCustomers([...Customers].map(object => {
            if (object.isSelected) {
                removeTrainersTrainees(object.id);
                return {
                    ...object,
                    PreferredTrainer: null,
                    isSelected: false,
                }
            } else
            return {...object}
        }))

    }
    
    const handleSetSelectedTrainer = ({ data }) => {
        setSelectedTrainerId( data.id);
        setTrainers([...Trainers].map(object => {
            if(object.id === data.id) {
              return {
                ...object,
                isSelected: true,
              }
            }
            else return {
                ...object,
                isSelected: false,
            };
          }))
    }
    
    const PreferredTrainerFormHeading = (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            alignContent: 'center',
            textAlign: 'center', 
            }}
        >
            <div>Trainer</div>
            <div>Style</div>
            <div>Trainees</div>
        </div>
    )

    const customersFormHeading = (
        <div style={{display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            alignContent: 'center',
            textAlign: 'center', 
            
        }}>
            <div>Customer Name</div>
            <div>Style</div>
            <div>Level</div>
        </div>
    )

    const trainerTable =
        Trainers.map((data) => (
            data.isSelected === true ?
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    alignContent: 'center',
                    textAlign: 'center', 
                }}>
                    <span style={{ backgroundColor: '#FFFF00' }}>{`${data.FirstName} ${data.LastName}`}</span>
                    <span style={{ backgroundColor: '#FFFF00' }}>{data.Style}</span>
                    <span style={{ backgroundColor: '#FFFF00' }}>{data.AssignedCustomerIds.length}</span>
            
                </div> :
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    alignContent: 'center',
                    textAlign: 'center', 
                }}
                    onClick={() => handleSetSelectedTrainer({ data })}>
                    <span >{`${data.FirstName} ${data.LastName}`}</span>
                    <span >{data.Style}</span>
                    <span >{data.AssignedCustomerIds.length}</span>
                </div>
        ))
    
    const handleSetAddCustomer = ({ data }) => {
        setCustomers([...Customers].map(object => {
            if(object.FirstName === data.FirstName && object.LastName === data.LastName) {
              return {
                ...object,
                isSelected: true,
              }
            }
            else return {
                ...object,
                isSelected: false,
            };
          }))
    }
    
    const customersTable =
        Customers.map((data) => (
            data.PreferredTrainer === selectedTrainerId &&
                (data.isSelected === true ?
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        alignContent: 'center',
                        textAlign: 'center', 
                    }}>
                        <span style={{ backgroundColor: '#FFFF00' }}>{`${data.FirstName} ${data.LastName}`}</span>
                        <span style={{ backgroundColor: '#FFFF00' }}>{data.Style}</span>
                        <span style={{ backgroundColor: '#FFFF00' }}>{data.Experience}</span>
                
                    </div> :
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        alignContent: 'center',
                        textAlign: 'center', 
                    }}
                        onClick={() => handleSetAddCustomer({ data })}>
                        <span >{`${data.FirstName} ${data.LastName}`}</span>
                        <span >{data.Style}</span>
                        <span >{data.Experience}</span>
                    </div>)
        ))
    
    return (
        <div>
            {/**
            * Show Trainers Table
            */}
            {PreferredTrainerFormHeading}
            <br />
            {trainerTable}
            <br /><br />
            {/**
             * Show Customers Table
             */}
            {customersFormHeading}
            <br />
            {customersTable}
            <div className='buttonContainer'>
                <br /><br />
                <div className='button1'>
                    <CancelButton />
                    <ConfirmButton buttonText="Remove" onClick={handleRemoveCustomers}/>
                </div>
            </div>
            
        </div>
    );
}

export default RemoveCustomers;