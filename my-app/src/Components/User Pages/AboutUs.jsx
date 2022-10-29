import React from "react";
import './styles.css'
// import MainHorseImage from './Assets/MainHorseImage.png'
import PageTitle from "./PageTitle";
// const MainHorseStyle = {
//     position: 'absolute',
//     marginTop: '300px',
// }

const AboutUs = () => {
    const aboutUsImage = (
        // Trying to get background gray and have horse pic
        // <div className="backGround">
        //     <div className="pic1Border">
        //     </div>
        // </div>
        // Original Joe Line
        // <img className={MainHorseStyle} src={MainHorseImage} alt="Girl on Horse" />

        // Other line I was trying
        // <img url="./Assets/Rae\ Riding\ Lessons\ Logo\ _2_.png" alt="Girl on Horse" />
        <img className="pic1Border" src="./Assets/Rae\ Riding\ Lessons\ Logo\ _2_.png" />
    );
    return (
        <div className="backGround">
            <>

                <PageTitle name="AboutUs" />
                {aboutUsImage}
                <p>Here is some text for you to play with</p>

            </> 
        </div>
        
    );
}

export default AboutUs;