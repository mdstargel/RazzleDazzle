import React, { useState } from 'react';
import ConfirmButton from '../../../Buttons/ConfirmButton';
import CancelButton from '../../../Buttons/CancelButton';

const RemoveTrainer = () => {
    /**
     * Replace following object with information from the backend
     */
    const [AvailableTrainers, setAvailableTrainers] = useState([{
        Trainer: 'John Doe',
        Style: 'Western',
        Experience: '1',
        isPreffered: false
    },
    {
        Trainer: 'Jane Doe',
        Style: 'English',
        Experience: '2',
        isPreffered: true

    },
    {
        Trainer: 'James Doe',
        Style: 'Show',
        Experience: '3',
        isPreffered: false

    },]);
    
    const handleSetRemoveTrainer = ({ data }) => {
        setAvailableTrainers([...AvailableTrainers].map(object => {
            if(object.Trainer === data.Trainer) {
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
                }}>
                    <span style={{ backgroundColor: '#FFFF00' }}>{data.Trainer}</span>
                    <span style={{ backgroundColor: '#FFFF00' }}>{data.Style}</span>
                    <span style={{ backgroundColor: '#FFFF00' }}>{data.Experience}</span>
                
                </div> :
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                }}
                    onClick={() => handleSetRemoveTrainer({ data })}>
                    <span >{data.Trainer}</span>
                    <span >{data.Style}</span>
                    <span >{data.Experience}</span>
                
                </div> 
        ) )
            
    const PreferredTrainerFormHeading = (
        <div style={{display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            marginTop: '300px'
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
            {trainersList}
            <CancelButton onClick={handleCancelRemoveTrainer} />
            <ConfirmButton buttonText={'Remove Trainer'} onClick={handleRemoveTrainer} />
        </div>
    );
}

export default RemoveTrainer;