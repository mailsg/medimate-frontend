import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from '../css/reserve-form.module.css';

function ReservationForm() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    doctorName: '',
    appointmentDate: '',
    appointmentTime: '',
    duration: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'http://localhost:3000/api/v1/appointments',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        const data = await response.json();
        dispatch(addAppointment(data)); // Add the newly created appointment to Redux store
        toast.success('Reservation successful!');
      } else {
        toast.error('Reservation failed!');
      }
    } catch (error) {
      toast.error('Error occurred while processing your request!');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={[styles.form, styles['reservation-container']].join(' ')}>
      <h1 className={styles['reserve-form-header']}>Reservation Form</h1>
      <form
        className={[styles.form, styles['reservation-form']].join(' ')}
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <input
            className="form"
            placeholder="Name of Doctor"
            type="text"
            id="doctorName"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form"
            placeholder="Date of Appointment"
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form"
            placeholder="Time of Appointment"
            type="time"
            id="appointmentTime"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form"
            placeholder="Duration"
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles['btn-container']}>
          <NavLink to="/reserve">
            <button type="submit" className={styles['submit-button']}>
              Back
            </button>
          </NavLink>
          <button type="submit" className={styles['submit-button']}>
            Make Reservation
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
