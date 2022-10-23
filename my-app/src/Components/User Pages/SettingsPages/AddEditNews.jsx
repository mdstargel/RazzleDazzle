import React from "react";
import '../styles.css'
import PageTitle from "../PageTitle";
import ConfirmButton from "../../Buttons/ConfirmButton";
import CancelButton from "../../Buttons/CancelButton";

const AddEditNews = () => {
    /**
     * Needs to be completed
     */
    return (
        <>
            <PageTitle name="Add/Edit News" />
            <div style={{marginTop: '200px'}}>
                <label>News Title</label>
                <input type="text"></input>
                <label>News URL</label>
                <input type="text"></input>
                <label>News Image</label>
                <input type="text"></input>
                <label>News Description</label>
                <input type="text"></input>
                <ConfirmButton buttonText='Submit'></ConfirmButton>
                <CancelButton></CancelButton>
            </div>
        </>
    );
}

export default AddEditNews;