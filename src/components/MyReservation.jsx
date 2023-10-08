import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../css/MyAppointments.module.css';

function MyAppointments() {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/v1/appointments',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: localStorage.getItem('token'),
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          // Assuming that the data returned has a structure like { appointments: [...] }
          dispatch(setReservations(data.appointments));
        } else {
          setError('Error occurred while listing appointments');
        }
      } catch (error) {
        setError('Error occurred while processing your request!');
      }
    };

    fetchAppointments();
  }, [dispatch]);

  return (
    <div>
      <h1 className={styles.heading}>My Reservations</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <table className={styles.myAppointments}>
          {' '}
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.doctorName}</td>
                <td>{reservation.appointmentDate}</td>
                <td>{reservation.appointmentTime}</td>
                <td>
                  {reservation.duration}
                  {' '}
                  minutes
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyAppointments;
