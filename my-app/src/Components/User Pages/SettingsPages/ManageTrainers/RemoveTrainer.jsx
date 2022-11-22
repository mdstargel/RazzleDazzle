import React, { useState } from 'react';
import ConfirmButton from '../../../Buttons/ConfirmButton';
import CancelButton from '../../../Buttons/CancelButton';
import axios from 'axios';

const RemoveTrainer = ({setAvailableTrainers, AvailableTrainers}) => {
    /**
     * Replace following object with information from the backend
     */
    
    const handleSetRemoveTrainer = ({ data }) => {
        setAvailableTrainers([...AvailableTrainers].map(object => {
            if(object.id === data.id) {
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

    const handleCancelRemoveTrainer = (event) => {
        event.preventDefault();

        setAvailableTrainers([...AvailableTrainers].filter(object =>
            object.isPreffered !== true))       
    };

    const handleRemoveTrainer = (event) => {
        event.preventDefault();
        let removedUserIds = [];
        for (let i = 0; i < AvailableTrainers.length; i++) {
            if (AvailableTrainers[i].isPreffered) {
                removedUserIds.push(AvailableTrainers[i].id);
            }
        }
        console.log('Ids to remove', removedUserIds);

        let user_ids = {
            "user_ids": removedUserIds
        }
        axios.post('/Admin/Trainer/Delete', user_ids);

        setAvailableTrainers([...AvailableTrainers].filter(object =>
            object.isPreffered !== true))       
        
        /**
         * Update Database here
         */
    };

    const trainersList = 
        AvailableTrainers.map((data) => (
            data.isPreffered === true ?
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    alignContent: 'center',
                    textAlign: 'center',
                    marginLeft: '40px',
                    marginRight: '40px',                 
                }}>
                    <span style={{ backgroundColor: '#727070' }}>{data.Trainer}</span>
                    <span style={{ backgroundColor: '#727070' }}>{data.Style}</span>
                    <span style={{ backgroundColor: '#727070' }}>{data.Experience}</span>
                
                </div> :
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    alignContent: 'center',
                    textAlign: 'center',
                    borderBottom: '1px solid black', 
                    marginLeft: '40px',
                    marginRight: '40px',
                }}
                    onClick={() => handleSetRemoveTrainer({ data })}>
                    <span style={{ backgroundColor: '#D9D9D9' }}>{data.Trainer}</span>
                    <span style={{ backgroundColor: '#D9D9D9' }}>{data.Style}</span>
                    <span style={{ backgroundColor: '#D9D9D9' }}>{data.Experience}</span>
                
                </div> 
        ) )
            
    const PreferredTrainerFormHeading = (
        <div style={{display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            alignContent: 'center',
            textAlign: 'center',
            fontWeight: 'bold',
            marginLeft: '40px',
            marginRight: '40px',  
            }
        }>
            <div>Trainer</div>
            <div>Style</div>
            <div>Experience</div>
        </div>
    )
    
    return (
        <div>
            {AvailableTrainers.length > 0 ?
                PreferredTrainerFormHeading : <div>No trainers to available to remove</div>}
            <br />
            {trainersList}
            <div className='buttonContainer'>
                <br /><br />
                <div className='button1'>
                    <CancelButton onClick={handleCancelRemoveTrainer} />
                    <ConfirmButton buttonText={'Remove Trainer'} onClick={handleRemoveTrainer} />
                </div>
            </div>
            
        </div>
    );
}

export default RemoveTrainer;