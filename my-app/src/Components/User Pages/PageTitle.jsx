import React from "react";
import './styles.css'

const PageTitle = ({name}) => {
    return(
        <div>
            <div className="title">{name}</div>
            <hr className="titleunderline"></hr>
        </div>
    );
}

export default PageTitle;