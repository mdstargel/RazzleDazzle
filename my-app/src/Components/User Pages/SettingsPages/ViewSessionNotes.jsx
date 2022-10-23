import React from "react";
import '../styles.css'
import PageTitle from "../PageTitle";

const ViewSessionNotes = () => {
    // Need to get Session Note Data from API
    const sessionNotesData = [{
        Date: '10/10/2019',
        Note: 'Great Job today!'
    },
    {
        Date: '10/30/2020',
        Note: 'Long time no see!'
    },
    {
        Date: '11/30/2020',
        Note: 'Keep coming back!',
    },
    ];
    
    const sessionNotesList = sessionNotesData.map((data) => (
        <div>
            <span>{data.Date}</span>
            <p>{data.Note}</p>
        </div>
    ));
            
    return (
        <>
            <PageTitle name="View Session Notes" />
            <div style={{ marginTop: '500px' }}>
                {sessionNotesList}
            </div>
        </>
    );
}

export default ViewSessionNotes;