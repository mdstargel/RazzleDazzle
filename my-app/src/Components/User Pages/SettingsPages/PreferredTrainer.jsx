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
                    alignContent: 'center',
                    textAlign: 'center',                  
                }}>
                    <span style={{ backgroundColor: '#FFFF00' }}>{data.Trainer}</span>
                    <span style={{ backgroundColor: '#FFFF00' }}>{data.Style}</span>
                    <span style={{ backgroundColor: '#FFFF00' }}>{data.Experience}</span>
                
                </div> :
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    alignContent: 'center',
                    textAlign: 'center', 
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
            alignContent: 'center',
            textAlign: 'center',
        
        }}>
            <div>Trainer</div>
            <div>Style</div>
            <div>Experience</div>
        </div>
    )
    
    return (
        <div className='backGround'>
            <>
                <PageTitle name="Preferred Trainer" />
                <div className='form2'>
                    {PreferredTrainerFormHeading}
                    <br />
                    {trainersList}
                    <div className='buttonContainer'>
                        <br /><br />
                        <div className='button1'>
                            <CancelButton />
                            <ConfirmButton buttonText={'Set Trainer'} onClick={handleSetTrainer} />
                        </div>
                    </div>
                    
                </div>
            </>
        </div>
    );
}

export default PreferredTrainer;