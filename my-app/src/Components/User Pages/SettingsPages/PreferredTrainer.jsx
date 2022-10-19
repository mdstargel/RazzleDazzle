import React, { useState } from 'react';
import '../styles.css'
import PageTitle from "../PageTitle";
import ConfirmButton from '../../Buttons/ConfirmButton';
import CancelButton from '../../Buttons/CancelButton';
const PreferredTrainer = () => {
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
    const handleSetPrefferedTrainer = ({ data }) => {
        setAvailableTrainers([...AvailableTrainers].map(object => {
            if(object.Trainer === data.Trainer) {
              return {
                ...object,
                isPreffered: true,
              }
            }
            else return {
                ...object,
                isPreffered: false,
            };
          }))
    }
    const handleSetTrainer = (event) => {
        event.preventDefault();
        // Sending information to Database
        console.log(AvailableTrainers);
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
                    onClick={() => handleSetPrefferedTrainer({ data })}>
                    <span >{data.Trainer}</span>
                    <span >{data.Style}</span>
                    <span >{data.Experience}</span>
                
                </div>

        ))
            
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
        <>
            <PageTitle name="Preferred Trainer" />
            <div>
                {PreferredTrainerFormHeading}
                {trainersList}
                <CancelButton />
                <ConfirmButton buttonText={'Set Trainer'} onClick={handleSetTrainer} />
            </div>
        </>
    );
}

export default PreferredTrainer;