import React, { useEffect, useState } from 'react';

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/v1/appointments',
        );
        if (response.ok) {
          const data = await response.json();
          setAppointments(data.appointments);
        } else {
          setError('Error occurred while listing appointments');
        }
      } catch (error) {
        setError('Error occurred while processing your request!');
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h1>My Reservations</h1>
      {' '}
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {appointments.map(
            (
              appointment,
            ) => (
              <li key={appointment.id}>
                Doctor:
                {' '}
                {appointment.doctorName}
                <br />
                Date:
                {' '}
                {appointment.appointmentDate}
                <br />
                Time:
                {' '}
                {appointment.appointmentTime}
                <br />
                Duration:
                {' '}
                {appointment.duration}
                {' '}
                minutes
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
}

export default MyAppointments;
