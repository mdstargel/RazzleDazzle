import React, { useState } from 'react';
import '../styles.css'
import PageTitle from "../PageTitle";
import ConfirmButton from "../../Buttons/ConfirmButton";
import CancelButton from "../../Buttons/CancelButton";

const AddEditNews = () => {
    /**
     * Needs to be completed
     */
    const [values, setValues] = useState({
        title: '',
        url: '',
        image: '',
        description: '',
    });

    const handleTitleChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            title: event.target.value,
        }));
        console.log('title', values.title);
    };

    const handleImageChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            image: event.target.value,
        }));
        console.log('image', values.image);
    };

    const handleURLChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            url: event.target.value,
        }));
        console.log('url', values.url);
    };

     const handleDescriptionChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            description: event.target.value,
        }));
        console.log('description', values.description);
    };
    const handleUploadNewsArticle = (event) => {
        event.persist();
        /**
         * Upload the changes
         */
        if (values.title && values.url && values.description && values.image && values.url) {
            console.log('Uploading news article');
        }
    };
    return (
        <>
            <PageTitle name="Add/Edit News" />
            <div style={{marginTop: '200px'}}>
                <label>News Title</label>
                <input type="text" value={values.title}
                    onChange={handleTitleChange}></input>
                <label>News URL</label>
                <input type="text" value={values.url}
                    onChange={handleURLChange}></input>
                <label>News Image</label>
                <input type="text" value={values.image}
                    onChange={handleImageChange}></input>
                <label>News Description</label>
                <input type="text" value={values.description}
                    onChange={handleDescriptionChange}></input>
                <ConfirmButton buttonText='Submit' onClick={handleUploadNewsArticle}></ConfirmButton>
                <CancelButton></CancelButton>
            </div>
        </>
    );
}

export default AddEditNews;