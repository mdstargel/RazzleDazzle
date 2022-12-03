import React, { useState } from 'react';
import axios from 'axios';

import './styles.css'
import './Calendar/Styes.css'
import PageTitle from "./PageTitle";
import ReactCalendar from 'react-calendar';
import AvailableAppointments from './AvailableAppointments';
import MyCalendarView from './MyCalendarView';
import AdminCalendarView from './AdminCalendarView';
import AddAppointment from './SettingsPages/AddAppointment';
// Bobby's comment merge conflict

function Convert_Appointment(appointment) {
    var date_array = appointment.appointment_date.split("-");
    var new_date = date_array[1] + "/" + date_array[2].slice(0, 2) + "/" + date_array[0];

    var new_start_time = appointment.appointment_start_time + "";
    var new_end_time = appointment.appointment_end_time + "";

    var start_time_array = new_start_time.split(":");
    var end_time_array = new_end_time.split(":");
    var start_time = start_time_array[0] + ":" + start_time_array[1];
    var end_time = end_time_array[0] + ":" + end_time_array[1];


    var group = true;
    var trainee = true;
    if (appointment.appointment_group == 0) group = false;
    if (appointment.appointment_TID_2 == 5) trainee = false;

    var reserved = true;
    if (appointment.appointment_reserved == false ||
        appointment.appointment_reserved == undefined) reserved = false;

    var new_appointment = {
        appointmentId: appointment.AID,
        date: new_date,
        startTime: start_time,
        endTime: end_time,
        ridingStyle: appointment.appointment_riding_style,
        ridingLevel: appointment.appointment_difficulty,
        isGroup: group,
        signedUp: reserved,
        remainingSpots: appointment.appointment_group_size,
        hasTrainee: trainee,
        PubicNotes: appointment.appointment_public_notes,
      PrivateNotes: appointment.appointment_private_notes,
        trainerNames: appointment.appointment_trainer_name
    }

    return new_appointment;
}

const Calendar = ({ userPermissions, UserInfo }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [dayEvents, setDayEvents] = useState();
  const [events, setEvents] = useState([
    {
      trainerNames: 'John Doe',
      appointmentId: '1',
      date: '10/29/2022',
      startTime: '8am',
      endTime: '10am',
      ridingStyle: 'Western',
      ridingLevel: 'Beginner',
      isGroup: true,
      signedUp: false,
      remainingSpots: 8,
      hasTrainee: true,
      lessonType: 'Group',
      PublicNotes: 'Great job Today',
      PrivateNotes: 'Jeremy stop hitting on me!',
    },
    {
      trainerNames: 'Jane Doe',
      appointmentId: '2',
      date: '10/30/2022',
      startTime: '8am',
      endTime: '10am',
      ridingStyle: 'Western',
      ridingLevel: 'Beginner',
      isGroup: true,
      signedUp: false,
      remainingSpots: 8,
      hasTrainee: true,
      lessonType: 'Group',
      PublicNotes: 'Great job Today',
      PrivateNotes: 'Jeremy stop hitting on me!',
    },
    {
      trainerNames: 'James Doe',
      appointmentId: '3',
      date: '10/31/2022',
      startTime: '8am',
      endTime: '10am',
      ridingStyle: 'Western',
      ridingLevel: 'Beginner',
      isGroup: true,
      signedUp: false,
      remainingSpots: 8,
      hasTrainee: true,
      lessonType: 'Group',
      PublicNotes: 'Great job Today',
      PrivateNotes: 'Jeremy stop hitting on me!',
    },
    {
      trainerNames: 'John Doe',
      appointmentId: '4',
      date: '11/01/2022',
      startTime: '8am',
      endTime: '10am',
      ridingStyle: 'Western',
      ridingLevel: 'Beginner',
      isGroup: true,
      signedUp: true,
      remainingSpots: 8,
      hasTrainee: true,
      lessonType: 'Group',
      PublicNotes: 'Great job Today',
      PrivateNotes: 'Jeremy stop hitting on me!',
    },
    {
      trainerNames: 'John Doe',
      appointmentId: '5',
      date: '11/02/2022',
      startTime: '8am',
      endTime: '10am',
      ridingStyle: 'Western',
      ridingLevel: 'Beginner',
      isGroup: true,
      signedUp: true,
      remainingSpots: 8,
      hasTrainee: true,
      lessonType: 'Group',
      PublicNotes: 'Great job Today',
      PrivateNotes: 'Jeremy stop hitting on me!', 
    },
    {
      trainerNames: 'John Doe',
      appointmentId: '6',
      date: '11/03/2022',
      startTime: '8am',
      endTime: '10am',
      ridingStyle: 'Western',
      ridingLevel: 'Beginner',
      isGroup: true,
      signedUp: true,
      remainingSpots: 8,
      hasTrainee: true,
      lessonType: 'Group',
      PublicNotes: 'Great job Today',
      PrivateNotes: 'Jeremy stop hitting on me!',
    },
    {
      trainerNames: 'John Doe',
      appointmentId: '7',
      date: '11/04/2022',
      startTime: '8am',
      endTime: '10am',
      ridingStyle: 'Western',
      ridingLevel: 'Beginner',
      isGroup: true,
      signedUp: false,
      remainingSpots: 8,
      hasTrainee: true,
      lessonType: 'Group',
      PublicNotes: 'Great job Today',
      PrivateNotes: 'Jeremy stop hitting on me!',
    }
  ])
  const [selectedDate, setSelectedDate] = useState(new Date());
  console.log(selectedDate);

  const changeDate = (e) => {
    setSelectedDate(e)
  

    setEvents([]);


    const dayPost = { "user_ID": UserInfo.id, "date": e };
    axios.post(UserInfo.type + '/Calendar/Day', dayPost).then(resp => {
      let calendarConvertedForDay = [];
      for (var i = 0; i < resp.data.length; i++) {
        calendarConvertedForDay.push(Convert_Appointment(resp.data[i]));
      }
      console.log('calendarConvertedForDay:', calendarConvertedForDay);
      setEvents(calendarConvertedForDay);
    })
  }
  
  if (!isMounted) {
      // Customer/Trainer userID
    const dayPost = { "user_ID": UserInfo.id, "date": selectedDate };
    axios.post(UserInfo.type + '/Calendar/Day', dayPost).then(resp => {
      let calendarConvertedForDay = [];
      for (var i = 0; i < resp.data.length; i++) {
        calendarConvertedForDay.push(Convert_Appointment(resp.data[i]));
      }
      console.log('calendarConvertedForDay:', calendarConvertedForDay);
      setEvents(calendarConvertedForDay);
    })
      setIsMounted(true);
    }
  const [selectedTab, setSelectedTab] = useState('Available Appointments');
  const [showAddAppointment, setShowAddAppointment] = useState();
  
  const handleDateChange = () => {
    const dayPost = { "user_ID": UserInfo.id, "date": selectedDate };
    axios.post(UserInfo.type + '/Calendar/Day', dayPost).then(resp => {
      let calendarConvertedForDay = [];
      for (var i = 0; i < resp.data.length; i++) {
        calendarConvertedForDay.push(Convert_Appointment(resp.data[i]));
      }
      console.log('calendarConvertedForDay:', calendarConvertedForDay);
      setEvents(calendarConvertedForDay);
    })}
  function handleCancel() {
    setShowAddAppointment();
  }

  /**
   * Schedule My Calendar View week view
   */
  let myAppointments = [];
  if (userPermissions.isCustomer === true) {
    myAppointments = events.filter(appointment => appointment.signedUp);
  } else if (userPermissions.isTrainer === true) {
    myAppointments = events.filter(appointment => appointment.hasTrainee)
  } else {
    myAppointments = events.filter(appointment => appointment.hasTrainee)
  }

  /**
   * List out all available appointments
   */
  let availableAppointments = events.filter(appointment => (!appointment.signedUp && appointment.remainingSpots > 0))

  const ChosenPopup = () => {
    let popup;

    if (selectedTab === 'Available Appointments') {
      popup = <AvailableAppointments setSelectedTab={setSelectedTab} availableAppointments={availableAppointments} userPermissions={userPermissions} />;
    } else {
      userPermissions.isAdmin ?
        popup = <AdminCalendarView setSelectedTab={setSelectedTab} UserSchdeule={myAppointments} userPermissions={userPermissions} />
        : popup = <MyCalendarView setSelectedTab={setSelectedTab} UserSchdeule={myAppointments} userPermissions={userPermissions} />;
    }
    return (popup);
  };

  const tabs = (
    <div className='subTitle1'>
      <div
        className={`subLeft3 ${selectedTab === 'Available Appointments' ? 'activeSubtitle' : ''}`}
        onClick={() => setSelectedTab('Available Appointments')}>Available Appointments</div>
      <div
        className={`subRight3 ${selectedTab === 'My Calendar View' ? 'activeSubtitle' : ''}`}
        onClick={() => setSelectedTab('My Calendar View')}>My Calendar</div>
      <hr className="titleunderline2"></hr>
    </div>
  );

  return (
    <div className="backGround">
      <PageTitle name="Calendar" />
      {tabs}
      <ReactCalendar value={selectedDate} onClickDay={() => setIsMounted(false)} onChange={changeDate}/>
      {showAddAppointment}
      {!userPermissions.isCustomer ? <div
          className='makeAppointment'
          onClick={() => setShowAddAppointment(<AddAppointment setShowAddAppointment={setShowAddAppointment}></AddAppointment>)}>
          Make Appointment
    </div> : <div><br/><br/><br/><br/><br/></div>}
            <ChosenPopup />
    </div>
    );
}

export default Calendar;