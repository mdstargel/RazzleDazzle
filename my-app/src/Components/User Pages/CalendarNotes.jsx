import React, { useState } from 'react';
import '../User Pages/styles.css'
import ConfirmButton from "../Buttons/ConfirmButton";
import CancelButton from "../Buttons/CancelButton";

const CalendarNotes = ({ appointment, setModifyAppointment, userPermissions}) => {
    const [values, setValues] = useState(appointment);
    const isStaff = userPermissions.isAdmin || userPermissions.isTrainer;
    
     const handlePublicNoteSChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            PublicNotes: event.target.value,
        }));
        console.log('PublicNotes', values.PublicNotes);
    };
    const handlePrivateNoteSChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            PrivateNotes: event.target.value,
        }));
        console.log('PrivateNotes', values.PrivateNotes);
    };

    return(
        <div className="fixedForm">
            <div>{values.date}</div>
            {/* <div>{appointment.Notes}</div> */}
            <div>Public Notes</div>
            <input
                    // className='input2'
                    type="text"
                    value={values.PublicNotes}
                    onChange={isStaff && handlePublicNoteSChange}
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
        </div>
    );
}

export default CalendarNotes;