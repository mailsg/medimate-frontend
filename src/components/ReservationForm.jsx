import React, { useState } from 'react';

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

    // Send formData to your backend API to create a new appointment
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful reservation (e.g., update UI)
        // You can add code here to indicate a successful reservation.
      } else {
        // Handle reservation error (e.g., update UI with an error message)
        // You can add code here to display an error message to the user.
      }
    } catch (error) {
      // Handle unexpected errors (e.g., update UI with a generic error message)
      // You can add code here to display a generic error message to the user.
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="reservation-container">
      <h2>Reservation Form</h2>
      <form className="reservation-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="appointmentDate">Date:</label>
          <input
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
      </form>
    </div>
  );
}

export default ReservationForm;
