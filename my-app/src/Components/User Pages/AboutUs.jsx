import React from "react";
import './styles.css'
import MainHorseImage from './Assets/MainHorseImage.png'
import PageTitle from "./PageTitle";
const MainHorseStyle = {
    position: 'absolute',
    marginTop: '300px',
}

const AboutUs = () => {
    const aboutUsImage = (
        <img className={MainHorseStyle} src={MainHorseImage} alt="Girl on Horse" />
    );
    return (
        <>
            <PageTitle name="AboutUs" />
            {aboutUsImage}
            <p>Here is some text for you to play with</p>
        </>
    );
}

export default AboutUs;