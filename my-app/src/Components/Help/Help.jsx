import React from 'react';

const Help = ({ wpage, userPermissions }) => {
    // const baseOfAnotherHost = 'https://google.com'
    // // can also work with relative urls like 'doc/sign/' or '/doc/sign'
    let relativeOrAbsoluteURL = 'https://www.google.com'
    
    /**
     * Input Conditionals Here to get
     */
    if (userPermissions.isAdmin) {
        relativeOrAbsoluteURL = 'https://www.youtube.com'
    } else if (userPermissions.isTrainer) {
        relativeOrAbsoluteURL = 'https://www.linkedin.com'
    } else {
        relativeOrAbsoluteURL = 'https://www.instagram.com'
    }


    const absoulteUrl = new URL(relativeOrAbsoluteURL).href

    // To-do: Add help Icon later
    return (
        <a href={absoulteUrl} target={'_blank'} rel="noopener noreferrer external">
            Help
        </a>
    );
}

export default Help;

