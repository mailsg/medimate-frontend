import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function ReservationForm() {
  const [formData, setFormData] = useState({
    appointmentDate: '',
    appointmentTime: '',
    duration: '',
    userId: '',
    doctorId: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        return <p>Reservation successful!</p>;
      }
      return <p>Reservation failed!</p>;
    } catch (error) {
      return <p>Error occured while processing your request!</p>;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="reservation-container form">
      <h2>Reservation Form</h2>
      <form className="reservation-form form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="doctorName">Doctor's Name:</label>
          <input
            className="form"
            type="text"
            id="doctorName"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="appointmentDate">Date:</label>
          <input
            className="form"
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="appointmentTime">Time:</label>
          <input
            className="form"
            type="time"
            id="appointmentTime"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration (in minutes):</label>
          <input
            className="form"
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Make Reservation
        </button>
        <NavLink to="/">
          <button type="submit" className="submit-button">
            Back
          </button>
        </NavLink>
      </form>
    </div>
  );
}

export default ReservationForm;
