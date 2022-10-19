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
            <div>
                <label>News Title</label>
                <input></input>
                <label>News URL</label>
                <input></input>
                <label>News Image</label>
                <input></input>
                <label>News Description</label>
                <input></input>
                <ConfirmButton buttonText='Submit'></ConfirmButton>
                <CancelButton></CancelButton>
            </div>
        </>
    );
}

export default AddEditNews;