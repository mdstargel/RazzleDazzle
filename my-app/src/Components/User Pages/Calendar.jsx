import React from "react";
import './styles.css'
import PageTitle from "./PageTitle";
import ReactCalendar from "./Calendar/ReactCalendar";

const Calendar = () => {
    return ( 
    <div className="backGround"> 
            <PageTitle name="Calendar" />
            <ReactCalendar></ReactCalendar>
    </div>
    );
}

export default Calendar;