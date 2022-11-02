import React, { useState } from 'react';
import './styles.css'
import PageTitle from "./PageTitle";
// import ReactCalendar from "./Calendar/ReactCalendar";
import AvailableAppointments from './AvailableAppointments';
import MyCalendarView from './MyCalendarView';

const Calendar = ({userPermissions}) => {
    const [selectedTab, setSelectedTab] = useState('Calendar');
   const [events, setEvents] = useState([
      {
         trainerNames: 'John Doe',
         appointmentId: '1',
         date: '11/03/2022',
         startTime: '8am',
         endTime: '10am',
         ridingStyle: 'Western',
         ridingLevel: 'Beginner',
         isGroup: true,
         signedUp: false,
         remainingSpots: 8,
         hasTrainee: true,
      }
   ])

    /**
     * Dummy Data
     */
   //   const [events, setEvents] = useState([
   //       {
   //          trainerNames: 'John Doe',
   //          appointmentId: '1',
   //          date: '11/01/2022',
   //          startTime: '8am',
   //          endTime: '10am',
   //          ridingStyle: 'Western',
   //          ridingLevel: 'Beginner',
   //          isGroup: true,
   //          signedUp: false,
   //          remainingSpots: 8,
   //          hasTrainee: true,
   //       },
   //       {
   //          trainerNames: 'James Doe',
   //          appointmentId: '2',
   //          date: '11/03/2022',
   //          startTime: '8am',
   //          endTime: '10am',
   //          ridingStyle: 'Western',
   //          ridingLevel: 'Beginner',
   //          isGroup: false,
   //          signedUp: false,
   //          remainingSpots: 1,
   //          hasTrainee: true,

   //       },
   //       {
   //          trainerNames: 'Jane Doe',
   //          appointmentId: '3',
   //          date: '11/03/2022',
   //          startTime: '8am',
   //          endTime: '10am',
   //          ridingStyle: 'Western',
   //          ridingLevel: 'Beginner',
   //          isGroup: false,
   //          signedUp: false,
   //          remainingSpots: 1,
   //          hasTrainee: true,

   //       },
   //       {
   //          trainerNames: 'John Doe',
   //          appointmentId: '4',
   //          date: '10/31/2022',
   //          startTime: '8am',
   //          endTime: '10am',
   //          ridingStyle: 'Western',
   //          ridingLevel: 'Beginner',
   //          isGroup: true,
   //          signedUp: false,
   //          remainingSpots: 8,
   //          hasTrainee: true,

   //       },
   //       {
   //          trainerNames: 'Jane Doe',
   //          appointmentId: '5',
   //          date: '10/31/2022',
   //          startTime: '8am',
   //          endTime: '10am',
   //          ridingStyle: 'Western',
   //          ridingLevel: 'Beginner',
   //          isGroup: true,
   //          signedUp: false,
   //          remainingSpots: 8,
   //          hasTrainee: false,
   //       },
   //       {
   //          trainerNames: 'James Doe',
   //          appointmentId: '6',
   //          date: '11/02/2022',
   //          startTime: '8am',
   //          endTime: '10am',
   //          ridingStyle: 'Western',
   //          ridingLevel: 'Beginner',
   //          isGroup: true,
   //          signedUp: false,
   //           remainingSpots: 8,
   //          hasTrainee: false,
   //       },
   //       {
   //          trainerNames: 'John Doe',
   //          appointmentId: '7',
   //          date: '10/02/2022',
   //          startTime: '8am',
   //          endTime: '10am',
   //          ridingStyle: 'Western',
   //          ridingLevel: 'Beginner',
   //          isGroup: true,
   //          signedUp: false,
   //           remainingSpots: 8,
   //          hasTrainee: false,
   //       },
   //       {
   //          trainerNames: 'Jane Doe',
   //          appointmentId: '8',
   //          date: '10/26/2022',
   //          startTime: '8am',
   //          endTime: '10am',
   //          ridingStyle: 'Western',
   //          ridingLevel: 'Beginner',
   //          isGroup: true,
   //          signedUp: false,
   //           remainingSpots: 8,
   //          hasTrainee: false,
   //       },
   //       {
   //          trainerNames: 'John Doe',
   //          appointmentId: '9',
   //          date: '10/26/2022',
   //          startTime: '8am',
   //          endTime: '10am',
   //          ridingStyle: 'Western',
   //          ridingLevel: 'Beginner',
   //          isGroup: true,
   //          signedUp: true,
   //           remainingSpots: 8,
   //          hasTrainee: false,
   //       },
   //       {
   //          trainerNames: 'John Doe',
   //          appointmentId: '10',
   //          date: '10/26/2022',
   //          startTime: '8am',
   //          endTime: '10am',
   //          ridingStyle: 'Western',
   //          ridingLevel: 'Beginner',
   //          isGroup: true,
   //          signedUp: false,
   //           remainingSpots: 8,
   //          hasTrainee: false,
   //       },
   //       {
   //          trainerNames: 'John Doe',
   //          appointmentId: '11',
   //          date: '11/02/2022',
   //          startTime: '8am',
   //          endTime: '10am',
   //          ridingStyle: 'Western',
   //          ridingLevel: 'Beginner',
   //          isGroup: true,
   //          signedUp: true,
   //           remainingSpots: 8,
   //          hasTrainee: true,
   //       },
   //       {
   //          trainerNames: 'John Doe',
   //          appointmentId: '12',
   //          date: '10/26/2022',
   //          startTime: '8am',
   //          endTime: '10am',
   //          ridingStyle: 'Western',
   //          ridingLevel: 'Beginner',
   //          isGroup: true,
   //          signedUp: true,
   //           remainingSpots: 8,
   //          hasTrainee: true,
   //       },
   //       {
   //          trainerNames: 'John Doe',
   //          appointmentId: '13',
   //          date: '10/26/2022',
   //          startTime: '8am',
   //          endTime: '10am',
   //          ridingStyle: 'Western',
   //          ridingLevel: 'Beginner',
   //          isGroup: true,
   //          signedUp: true,
   //           remainingSpots: 8,
   //          hasTrainee: true,
   //       },
   //       {
   //          trainerNames: 'John Doe',
   //          appointmentId: '14',
   //          date: '11/02/2022',
   //          startTime: '8am',
   //          endTime: '10am',
   //          ridingStyle: 'Western',
   //          ridingLevel: 'Beginner',
   //          isGroup: true,
   //          signedUp: false,
   //           remainingSpots: 8,
   //          hasTrainee: true,
   //       },
   //       {
   //          trainerNames: 'John Doe',
   //          appointmentId: '15',
   //          date: '10/26/2022',
   //          startTime: '8am',
   //          endTime: '10am',
   //          ridingStyle: 'Western',
   //          ridingLevel: 'Beginner',
   //          isGroup: true,
   //          signedUp: false,
   //           remainingSpots: 8,
   //          hasTrainee: true,
   //       },
   //       {
   //          trainerNames: 'John Doe',
   //          appointmentId: '16',
   //          date: '10/26/2022',
   //          startTime: '8am',
   //          endTime: '10am',
   //          ridingStyle: 'Western',
   //          ridingLevel: 'Beginner',
   //          isGroup: true,
   //          signedUp: false,
   //           remainingSpots: 0,
   //          hasTrainee: false,
   //       },
         
   //   ]);
    
    // Schedule My Calendar View
    let myAppointments = [];
    if (userPermissions.isCustomer === true) {
        myAppointments = events.filter(appointment => appointment.signedUp);
    } else if (userPermissions.isTrainer === true) {
        myAppointments = events.filter(appointment => appointment.hasTrainee)
    } else {
        myAppointments = events.filter(appointment => appointment.hasTrainee)
    }

    const ChosenPopup = () => {
        let popup;

        if (selectedTab === 'Available Appointments') {
            popup = <AvailableAppointments setSelectedTab={setSelectedTab}/>;
        } else {
            popup = <MyCalendarView setSelectedTab={setSelectedTab} UserSchdeule={myAppointments} userPermissions={userPermissions} />;
        }
        return (popup);
    };

    const tabs = (
        <div className='subTitle1'>
            <div className='subLeft2' onClick={() => setSelectedTab('Available Appointments')}>Available Appointments</div>
            <div className='subRight2' onClick={() => setSelectedTab('My Calendar View')}>My Calendar View</div>
            <hr className="titleunderline2"></hr>
        </div>
    );

    return ( 
    <div className="backGround"> 
            <PageTitle name="Calendar" />
            {tabs}
            <ChosenPopup />
            {/* <ReactCalendar /> */}
    </div>
    );
}

export default Calendar;