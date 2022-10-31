import React, { useState } from 'react';
import Calendar from 'react-calendar';
// import MakeAppointment from './MakeAppointment';
// import 'react-calendar/dist/Calendar.css';
import './Styes.css'

const handleAddAppointment = ({ appointment, setCustomerAppointments, customerAppointments, setHidePill }) => {
    // let tempAppointments = customerAppointments;
    // tempAppointments.push(appointment);
    // setCustomerAppointments(tempAppointments);
    setHidePill(true);

    setCustomerAppointments(customerAppointments => [...customerAppointments, appointment]);
};

const AppointmentExpanded = ({ appointment, setCustomerAppointments, customerAppointments }) => {
    const [showIndividualAppointment, setShowIndividualAppointment] = useState(false);
    const [hidePill, setHidePill] = useState(false);

    return (
         !hidePill && <div className='appointmentPill'>
            <div onClick={() => setShowIndividualAppointment(!showIndividualAppointment)} className={showIndividualAppointment ? 'selectedAppointmentTitle' : 'appointmentTitle'}>
                {appointment.isGroup ? 'Group' : 'Individual'} {appointment.ridingStyle} {appointment.startTime}-{appointment.endTime}
            </div>
            {/* Show appointment information here */}
            {showIndividualAppointment && < div className='appointmentInfo'>
                <div>Date: {appointment.date}</div>
                <div>Spots Left: {appointment.remainingSpots}</div>
                <div onClick={() => handleAddAppointment({ appointment, setCustomerAppointments, customerAppointments, setHidePill})} className='addAppointmentButton'>Add Appointment</div>
            </div>}
        </div>
    );
};
const AppointmentInfo = ({
        appointments,
        setShowAddAppointment,
        showAddAppointment,
        setCustomerAppointments,
        customerAppointments,
    }) => {
    return (
        <div>
            {appointments.map((appointment) => (
            <AppointmentExpanded
                appointment={appointment}
                setShowAddAppointment={setShowAddAppointment}
                showAddAppointment={showAddAppointment}
                customerAppointments={customerAppointments}
                setCustomerAppointments={setCustomerAppointments}
                />
        ))}
        </div>
        );
};

const ReactCalendar = () => {
    const [showAddAppointment, setShowAddAppointment] = useState(false);
    const [trainerName, setTrainerName] = useState();
    const [customerAppointments, setCustomerAppointments] = useState([
        {
                appointmentId: '4',
                date: '10/26/2022',
                startTime: '8am',
                endTime: '10am',
                ridingStyle: 'Western',
                signedUp: false,
                isGroup: true,
                remainingSpots: 8,
            },
            {
                appointmentId: '5',
                date: '10/26/2022',
                startTime: '10am',
                endTime: '11am',
                ridingStyle: 'Western',
                signedUp: false,
                isGroup: false,
                remainingSpots: 1,
            },
            {
                appointmentId: '6',
                date: '10/26/2022',
                startTime: '11am',
                endTime: '2pm',
                ridingStyle: 'Western',
                signedUp: false,
                isGroup: false,
                remainingSpots: 0,
            },
            ]);

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
                    signedUp: false,
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
                    signedUp: false,
                    isGroup: false,
                    remainingSpots: 0,
                },
            ],
        },
        {
            trainer: 'John Doe',
            appointments: [
                {
                    appointmentId: '4',
                    date: '10/26/2022',
                    startTime: '8am',
                    endTime: '10am',
                    ridingStyle: 'Western',
                    signedUp: false,
                    isGroup: true,
                    remainingSpots: 8,
                },
                {
                    appointmentId: '5',
                    date: '10/26/2022',
                    startTime: '10am',
                    endTime: '11am',
                    ridingStyle: 'Western',
                    signedUp: false,
                    isGroup: false,
                    remainingSpots: 1,
                },
                {
                    appointmentId: '6',
                    date: '10/26/2022',
                    startTime: '11am',
                    endTime: '2pm',
                    ridingStyle: 'Western',
                    signedUp: false,
                    isGroup: false,
                    remainingSpots: 0,
                },
            ],
        },
        {
            trainer: 'John Doe',
            appointments: [
                {
                    appointmentId: '7',
                    date: '10/26/2022',
                    startTime: '8am',
                    endTime: '10am',
                    ridingStyle: 'Western',
                    signedUp: false,
                    isGroup: true,
                    remainingSpots: 8,
                },
                {
                    appointmentId: '9',
                    date: '10/26/2022',
                    startTime: '10am',
                    endTime: '11am',
                    ridingStyle: 'Western',
                    signedUp: false,
                    isGroup: false,
                    remainingSpots: 1,
                },
                {
                    appointmentId: '10',
                    date: '10/26/2022',
                    startTime: '11am',
                    endTime: '2pm',
                    ridingStyle: 'Western',
                    signedUp: false,

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
        <div style={{width: '100%', height: '400px'}}> Sign up for an Appointment!
        <br></br>
            {events.map((appointment) => (
                <div style={{ float: 'left' }} >
                    <div className='trainerPill'>{appointment.trainer}</div>
                    {!appointment.signedUp && <AppointmentInfo
                        appointments={appointment.appointments}
                        setShowAddAppointment={setShowAddAppointment}
                        showAddAppointment={showAddAppointment}
                        setTrainerName={setTrainerName}
                        customerAppointments={customerAppointments}
                        setCustomerAppointments={setCustomerAppointments}
                    />}
                </div>
            ))}
        </div>);
    
    return (
        <div style={{ paddingTop: '300px' }}>
            <Calendar
                style={{ marginTop: '10px' }}
                onClickDay={handleGetAppointments}
                onChange={onChange}
            />
            {outputDatePills}
            <br></br>
            {customerAppointments &&
                < div className='pillScroller'> My Appointments
                <br></br>
                    {customerAppointments.map((appointment) => (
                        <div className='customerAppointmentPill' style={{ float: 'left' }}>
                            <div>{appointment.date}</div>
                            <div>{appointment.startTime}-{appointment.endTime}</div>
                            <div>{appointment.ridingStyle}</div>
                            <div>{appointment.isGroup}</div>
                        </div>
                        ))}
                </div>}

      </div>
  );
}

export default ReactCalendar;