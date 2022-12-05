import React, { useState } from 'react';
import '../User Pages/styles.css'
import ConfirmButton from "../Buttons/ConfirmButton";
import CancelButton from "../Buttons/CancelButton";
import axios from 'axios';

const CalendarNotes = ({ appointment, setModifyAppointment, userPermissions }) => {
    const [values, setValues] = useState(appointment);
    const isStaff = userPermissions.isAdmin || userPermissions.isTrainer;
    console.log(appointment);
    console.log('PubicNotes:', appointment.PubicNotes);
    console.log('PrivateNotes:', appointment.PrivateNotes);
    const handlePubicNoteSChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            PubicNotes: event.target.value,
        }));
        console.log('PubicNotes', values.PubicNotes);
    };
    const handlePrivateNoteSChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            PrivateNotes: event.target.value,
        }));
        console.log('PrivateNotes', values.PrivateNotes);
    };

    const handleAddNote = () => {
        if (values.PubicNotes || values.PrivateNotes) {
            let notesData = {
                "appointment_id": appointment.appointmentId,
                "appointment_public_notes": values.PubicNotes,
                "appointment_private_notes": values.PrivateNotes
            }

            axios.post('/Admin/Calendar/Set_Notes', notesData).then(resp => { })
        }
        setModifyAppointment(null)
    };
    
    return(
        <div className="fixedForm">
            <div>{values.date}</div>
            {/* <div>{appointment.Notes}</div> */}
            <div>Public Notes</div>
            <input
                    // className='input2'
                    type="text"
                    value={values.PubicNotes}
                    onChange={isStaff && handlePubicNoteSChange}
            />
            <br/><br/><br/><br/><br/>
            {isStaff &&
                <div> 
                    <div>Private Notes</div>
                    <input
                            // className='input2'
                            type="text"
                            value={values.PrivateNotes}
                            onChange={isStaff && handlePrivateNoteSChange}
                        />
                </div>
            }
            <CancelButton onClick={() => setModifyAppointment(null)}/>
            {isStaff && <ConfirmButton buttonText={'Add'} onClick={handleAddNote}/>}
        </div>
    );
}

export default CalendarNotes;