import React, { useState } from 'react';
import Calendar from 'react-calendar';
import MakeAppointment from './MakeAppointment';
// import 'react-calendar/dist/Calendar.css';
import './Styes.css'

const AppointmentExpanded = ({
    appointment,
    setAppointmentInformation,
    setShowAddAppointment,
    showAddAppointment,
}) => {
    const handlePillClick = () => {
        console.log('Here we go!')
        setAppointmentInformation(appointment);
        setShowAddAppointment(!showAddAppointment);
        console.log(appointment);
    }
    return (
        <div onClick={handlePillClick}>
            {appointment.isGroup ? 'Group' : 'Individual'} {appointment.ridingStyle} {appointment.startTime}-{appointment.endTime}
        </div>
    );
};
const AppointmentInfo = ({
        appointments,
        setAppointmentInformation,
        setShowAddAppointment,
        showAddAppointment,
        setTrainerName,
    }) => {
    return (
        <div>
            {appointments.map((appointment) => (
            <AppointmentExpanded
                appointment={appointment}
                setAppointmentInformation={setAppointmentInformation}
                setShowAddAppointment={setShowAddAppointment}
                showAddAppointment={showAddAppointment}
            />
        ))}
        </div>
        );
};

const ReactCalendar = () => {
    const [AppointmentInformation, setAppointmentInformation] = useState();
    const [showAddAppointment, setShowAddAppointment] = useState(false);
    const [trainerName, setTrainerName] = useState();
    const [events, setEvents] = useState([
        {
            trainer: 'John Doe',
            appointments: [
                {
                    appointmentId: '1',
                    date: '10/26/2022',
                    startTime: '8am',
                    endTime: '10am',
                    ridingStyle: 'Western',
                    isGroup: true,
                    remainingSpots: 8,
                },
                {
                    appointmentId: '2',
                    date: '10/26/2022',
                    startTime: '10am',
                    endTime: '11am',
                    ridingStyle: 'Western',
                    isGroup: false,
                    remainingSpots: 1,
                },
                {
                    appointmentId: '3',
                    date: '10/26/2022',
                    startTime: '11am',
                    endTime: '2pm',
                    ridingStyle: 'Western',
                    isGroup: false,
                    remainingSpots: 0,
                },
            ],
        },
        {
           trainer: 'John Doe',
            appointments: [
                {
                    date: '10/26/2022',
                    startTime: '8am',
                    endTime: '10am',
                    ridingStyle: 'Western',
                    isGroup: true,
                    remainingSpots: 8,
                },
                {
                    date: '10/26/2022',
                    startTime: '10am',
                    endTime: '11am',
                    ridingStyle: 'Western',
                    isGroup: false,
                    remainingSpots: 1,
                },
                {
                    date: '10/26/2022',
                    startTime: '11am',
                    endTime: '2pm',
                    ridingStyle: 'Western',
                    isGroup: false,
                    remainingSpots: 0,
                },
            ],
        },
        {
            trainer: 'John Doe',
            appointments: [
                {
                    date: '10/26/2022',
                    startTime: '8am',
                    endTime: '10am',
                    ridingStyle: 'Western',
                    isGroup: true,
                    remainingSpots: 8,
                },
                {
                    date: '10/26/2022',
                    startTime: '10am',
                    endTime: '11am',
                    ridingStyle: 'Western',
                    isGroup: false,
                    remainingSpots: 1,
                },
                {
                    date: '10/26/2022',
                    startTime: '11am',
                    endTime: '2pm',
                    ridingStyle: 'Western',
                    isGroup: false,
                    remainingSpots: 0,
                },
            ],
        },
    ]);
    const [value, onChange] = useState(new Date(), 'dd/mm/yyyy');

    const handleGetAppointments = () => {
        // Get value from API and Output it
        console.log(events);
    };
    
    const outputDatePills = (
        events.map((appointment, index) => (
            <div style={{ float: 'left' }}>
                <div >{appointment.trainer}:</div>
                <AppointmentInfo
                    appointments={appointment.appointments}
                    setAppointmentInformation={setAppointmentInformation}
                    setShowAddAppointment={setShowAddAppointment}
                    showAddAppointment={showAddAppointment}
                    setTrainerName={setTrainerName}
                />
            </div>
        )));
  return (
    <div>
          <Calendar
              onClickDay={handleGetAppointments}
              onChange={onChange}
          />
          {outputDatePills}
          {showAddAppointment && <MakeAppointment
              AppointmentInformation={AppointmentInformation}
              trainerName={trainerName}
              setShowAddAppointment={setShowAddAppointment}
          />}
      </div>
  );
}

export default ReactCalendar;