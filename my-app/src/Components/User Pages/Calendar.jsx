import React from "react";
import './styles.css'
import PageTitle from "./PageTitle";
import ReactCalendar from "./CalendarPlugin/ReactCalendar";

const Calendar = () => {
    return ( 
    <div> 
        <PageTitle name="Calendar"/>
        <ReactCalendar></ReactCalendar>
    </div>
    );
}

export default Calendar;