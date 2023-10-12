import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAppointmentThunk, getAppointments } from '../redux/appointmentSlice';
import styles from '../css/DeleteDoctor.module.css';
import convertTime from './utilities/time_converter';

function MyAppointments() {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointment.appointments);
  const [error] = useState('');

  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch, appointments]);

  const handleDeleteApp = (appId) => {
    dispatch(deleteAppointmentThunk(appId));
    console.log(appId);
  };

  return (
    <div className={styles['remove-doc-wrapper']}>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <section>
        <h1 className={styles['delete-header']}>APPOINTMENTS</h1>
        {appointments.map((appointment) => (
          <div key={appointment.id} className={styles.card}>
            <div className={styles['text-container']}>
              <h2>{appointment.doctor.name}</h2>
              <div className={styles['sub-container']}>
                <div>Date:</div>
                <div>
                  {appointment.appointment_date}
                </div>
              </div>
              <div className={styles['sub-container']}>
                <div>Time:</div>
                <div>{convertTime(appointment.appointment_time)}</div>
              </div>
              <div className={styles['sub-container']}>
                <div>Location:</div>
                <div>{appointment.location}</div>
              </div>
              <button
                type="button"
                className={styles['delete-button']}
                onClick={() => handleDeleteApp(appointment.id)}
              >
                Cancel
              </button>
            </div>
            <img src={appointment.doctor.image} alt={appointment.duration} className={styles.img} />
          </div>
        ))}
      </section>
    </div>
  );
}

export default MyAppointments;
