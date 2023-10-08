import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAppointments } from '../redux/appointmentSlice';
import styles from '../css/MyAppointments.module.css';

function MyAppointments() {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointment.appointments);
  const [error] = useState('');

  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch]);

  return (
    <div>
      <h1 className={styles.heading}>My Reservations</h1>
      {error ? (
        <p>error</p>
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
            {appointments
            && Array.isArray(appointments)
            && appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.doctor.name}</td>
                    <td>{appointment.appointment_date}</td>
                    <td>{appointment.appointment_time}</td>
                    <td>
                      {appointment.duration}
                      {' '}
                      minutes
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No reservations available</td>
                </tr>
              )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyAppointments;
