import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setReservations } from '../redux/appointmentSlice';
import styles from '../css/reserve-form.module.css';

function ReservationForm() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    appointmentDate: '',
    appointmentTime: '',
    duration: '',
    doctorId: '', // Selected doctor ID
    doctorName: '', // User-entered doctor name
  });

  const [doctors, setDoctors] = useState([]); // Store available doctors

  useEffect(() => {
    // Fetch available doctors and populate the dropdown
    fetch('http://localhost:3000/api/v1/doctors', {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data); // Update the available doctors list
      })
      .catch((error) => console.error('Error fetching doctors:', error));
  }, []);

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
        dispatch(setReservations(data.reservations));
        toast.success('Reservation successful!');
      } else {
        toast.error('Reservation failed!');
      }
    } catch (error) {
      toast.error('Error occurred while processing your request!');
    }
  };

  // const handleDoctorNameChange = (e) => {
  //   const { value } = e.target;
  //   setFormData({ ...formData, doctorName: value });
  // };

  const handleDoctorSelectChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, doctorId: value });
  };

  return (
    <div className={[styles.form, styles['reservation-container']].join(' ')}>
      <h1 className={styles['reserve-form-header']}>Reservation Form</h1>
      <form
        className={[styles.form, styles['reservation-form']].join(' ')}
        onSubmit={handleSubmit}
      >
        {/* <div className="form-group">
          <input
            className="form"
            placeholder="Name of Doctor"
            type="text"
            id="doctorName"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleDoctorNameChange}
            required
          />
        </div> */}
        <div className="form-group">
          <select
            className="form"
            id="doctorId"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleDoctorSelectChange}
            required
          >
            <option value="">Select a Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <input
            className="form"
            placeholder="Date of Appointment"
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form"
            placeholder="Duration (in minutes)"
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            required
          />
        </div>
        <div className={styles['btn-container']}>
          <NavLink to="/r">
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
