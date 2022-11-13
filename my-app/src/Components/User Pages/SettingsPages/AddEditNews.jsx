import React, { useState } from 'react';
import '../styles.css'
import PageTitle from "../PageTitle";
import ConfirmButton from "../../Buttons/ConfirmButton";
import CancelButton from "../../Buttons/CancelButton";

const AddEditNews = ({setwpage}) => {
    /**
     * Needs to be completed
     */
    const [values, setValues] = useState({
        title: '',
        url: '',
        image: '',
        description: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

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
            setMessage('News article uploaded!')
            setError('')
        } else {
            setMessage('')
            setError('Failed upload!');
        }
    };
    return (
        <div className='backGround'>
            <>
            <PageTitle name="Add/Edit News" />
            <div className='form2Alt'>
                <div className='inputTitles1'>
                    <label className='label'>News Title: </label>
                </div>
                <div className='inputBoxes1'>
                    <input className='input2' type="text" value={values.title}
                        onChange={handleTitleChange}></input>
                </div>
                <br/><br />

                <div className='inputTitles2'>
                    <label className='label'>News URL: </label>
                </div>
                <div className='inputBoxes2'>
                    <input className='input2' type="text" value={values.url}
                        onChange={handleURLChange}></input>
                </div>
                <br/><br />

                <div className='inputTitles3'>
                    <label className='label'>News Image URL: </label>
                </div>
                <div className='inputBoxes3'>
                    <input className='input2' type="text" value={values.image}
                        onChange={handleImageChange}></input>
                </div>
                <br/><br />

                <div className='inputTitles4'>
                    <label className='label'>News Description: </label>
                </div>
                <div className='inputBoxes4'>
                    <input className='input2' type="text" value={values.description}
                        onChange={handleDescriptionChange}></input>
                </div>
                <br /><br />

                <div style={{color: 'green'}}>{message}</div>
                <div style={{ color: 'red' }}>{error}</div>
                <div className='buttonContainer'>
                    <br /><br />
                    <div className='button1'>
                        <ConfirmButton buttonText='Submit' onClick={handleUploadNewsArticle}></ConfirmButton>
                        <CancelButton onClick={() => setwpage('Calendar')}></CancelButton>
                    </div>
                </div>
                
            </div>
        </>
        </div>
    );
}

export default AddEditNews;