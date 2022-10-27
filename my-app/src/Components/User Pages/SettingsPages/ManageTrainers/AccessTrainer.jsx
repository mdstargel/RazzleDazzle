import React, { useState } from 'react';
import ConfirmButton from '../../../Buttons/ConfirmButton';
import CancelButton from '../../../Buttons/CancelButton';
const AccessTrainer = () => {
    /**
     * Need API to get Trainer names, styles, and personal information
     */
    /**
     * Replace following object with information from the backend
     */
    const [AvailableTrainers, setAvailableTrainers] = useState([{
        id: '1',
        FirstName: 'John',
        LastName: 'Doe',
        Style: 'Western',
        Email: 'johnDoe@gmail.com',
        Address: '1234 Address',
        Experience: '1',
        isPreffered: false,
        isAdmin: false,
        isTrainer: true,
    },
    {
        id: '2',
        FirstName: 'Jane',
        LastName: 'Doe',
        Style: 'English',
        Email: 'janeDoe@gmail.com',
        Address: '1234 Address',
        Experience: '2',
        isPreffered: true,
        isAdmin: true,
        isTrainer: true,
    },
    {
        id: '3',
        FirstName: 'James',
        LastName: 'Doe',
        Email: 'jamesDoe@gmail.com',
        Address: '1234 Address',
        Style: 'Show',
        Experience: '3',
        isPreffered: false,
        isAdmin: false,
        isTrainer: true,
    },]);
    
    const [trainerInfoUpdateMessage, setTrainerInfoUpdateMessage] = useState('');
    const [showEditTrainer, setShowEditTrainer] = useState(false);

    const handleSetPrefferedTrainer = ({ data }) => {
        setAvailableTrainers([...AvailableTrainers].map(object => {
            // Need a Trainer ID for these
            if (object.id === data.id) {
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
    const handleEditTrainer = ({ data }) => {
        /**
         * Send Information to Database
         */
        const updatedTrainerInfo = [...AvailableTrainers].map(object => {
            // Need a Trainer ID for these
            if (object.isPreffered) {
                return {
                    ...object,
                }
            }
        });
        console.log(updatedTrainerInfo);
        setTrainerInfoUpdateMessage('Trainer Information has been updated!');
    };

    const handleSetIsTrainer = ({data}) => {
        setAvailableTrainers([...AvailableTrainers].map(object => {
            // Need a Trainer ID for these
            if (object.id === data.id) {
                return {
                    ...object,
                    isTrainer: !data.isTrainer,
                }
            }
            else return {
                ...object,
            };
        }))
    }

    const handleSetIsAdmin = ({data}) => {
        setAvailableTrainers([...AvailableTrainers].map(object => {
            // Need a Trainer ID for these
            if (object.id === data.id) {
                return {
                    ...object,
                    isAdmin: !data.isAdmin,
                }
            }
            else return {
                ...object,
            };
        }))
    }

    const handleFirstNameInputChange = (event) => {
        event.persist();
        setAvailableTrainers([...AvailableTrainers].map(object => {
            // Need a Trainer ID for these
            if (object.isPreffered) {
                return {
                    ...object,
                    FirstName: event.target.value,
                }
            }
            else return {
                ...object,
        };
        }))
    }
    const handleLastNameInputChange = (event) => {
        event.persist();
        setAvailableTrainers([...AvailableTrainers].map(object => {
            // Need a Trainer ID for these
            if (object.isPreffered) {
                return {
                    ...object,
                    LastName: event.target.value,
                }
            }
            else return {
                ...object,
        };
        }))
    }

    const handleEmailInputChange = (event) => {
        event.persist();
        setAvailableTrainers([...AvailableTrainers].map(object => {
            // Need a Trainer ID for these
            if (object.isPreffered) {
                return {
                    ...object,
                    Email: event.target.value,
                }
            }
            else return {
                ...object,
        };
        }))
    }

    const handleAddressInputChange = (event) => {
        event.persist();
        setAvailableTrainers([...AvailableTrainers].map(object => {
            // Need a Trainer ID for these
            if (object.isPreffered) {
                return {
                    ...object,
                    Address: event.target.value,
                }
            }
            else return {
                ...object,
        };
        }))
    }

    const trainersList =
        AvailableTrainers.map((data) => (
            data.isPreffered === true ?
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',                   
                }}>
                    <span style={{ backgroundColor: '#FFFF00' }}>{`${data.FirstName} ${data.LastName}` }</span>
                    <span style={{ backgroundColor: '#FFFF00' }}>{data.Style}</span>
                    <span style={{ backgroundColor: '#FFFF00' }}>{data.Experience}</span>
                </div>
                :
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                }}
                    onClick={() => handleSetPrefferedTrainer({ data })}>
                    <span >{`${data.FirstName} ${data.LastName}` }</span>
                    <span >{data.Style}</span>
                    <span >{data.Experience}</span>
                </div>

        ))
    
    const editChosenTrainer =
        AvailableTrainers.map((data) => (
            data.isPreffered === true &&
            <div>
                <label>First Name:</label>
                <input
                    type="text"
                    onChange={handleFirstNameInputChange}
                    value={data.FirstName}
                />
                <label>Last Name:</label>
                <input
                    type="text"
                    onChange={handleLastNameInputChange}
                    value={data.LastName}
                />
                <label>Email Address:</label>
                <input
                    type="text"
                    onChange={handleEmailInputChange}
                    value={data.Email}
                />
                <label>Address:</label>
                <input
                    type="text"
                    onChange={handleAddressInputChange}
                    value={data.Address}
                />
                <label>Trainer Permissions:</label>
                    <div
                        onClick={() => handleSetIsTrainer({data})}
                    >
                        Trainer: {data.isTrainer ? 'True' : 'False'}
                    </div>
                    {data.isTrainer && <div
                        onClick={() => handleSetIsAdmin({ data })}
                    >
                        Admin: {data.isAdmin ? 'True' : 'False'}
                    </div> }
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
        <div>
            {!showEditTrainer ?
                PreferredTrainerFormHeading && trainersList
                : editChosenTrainer}
            <div style={{color: 'green'}}>{trainerInfoUpdateMessage}</div>
            <CancelButton onClick={() => setShowEditTrainer(false)}/>
            <ConfirmButton buttonText={showEditTrainer ? 'Change' : 'Edit'} onClick={showEditTrainer ? handleEditTrainer : () => setShowEditTrainer(true)} />
        </div>
    );
}

export default AccessTrainer;