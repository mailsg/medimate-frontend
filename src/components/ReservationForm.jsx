import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setReservations } from '../redux/appointmentSlice';
import styles from '../css/reserve-form.module.css';

function ReservationForm() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    appointment_date: '',
    appointment_time: '',
    duration: '',
    doctor_id: '',
    location: '',
  });

  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/doctors', {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data);
      })
      .catch((error) => console.error('Error fetching doctors:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.appointment_date
      || !formData.appointment_time
      || !formData.duration
      || !formData.doctor_id
      || !formData.location
    ) {
      toast.warn('Please fill in all fields');
      return;
    }
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
    navigate('/reservations');
  };

  const handleDoctorSelectChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, doctor_id: value });
  };

  return (
    <div className={[styles.form, styles['reservation-container']].join(' ')}>
      <h1 className={styles['reserve-form-header']}>Reservation Form</h1>
      <form
        className={[styles.form, styles['reservation-form']].join(' ')}
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <select
            className={styles['select-elm']}
            id="doctorId"
            name="doctor_id"
            value={formData.doctor_id}
            onChange={handleDoctorSelectChange}
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
            name="appointment_date"
            value={formData.appointment_date}
            onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            className="form"
            placeholder="Time of Appointment"
            type="time"
            id="appointmentTime"
            name="appointment_time"
            value={formData.appointment_time}
            onChange={(e) => setFormData({ ...formData, appointment_time: e.target.value })}
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
          />
        </div>
        <div className="form-group">
          <input
            className="form"
            placeholder="Location"
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>
        <div className={styles['btn-container']}>
          <button type="submit" className={styles['submit-button']}>
            Make Reservation
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
