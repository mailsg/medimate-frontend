import React, { useState } from 'react';
import '../css/adddoctor.css'; // Import the CSS file

const AddDoctor = ({ onAddDoctor }) => {
  const [doctorInfo, setDoctorInfo] = useState({
    name: '',
    specialization: '',
    city: '',
    bio: '',
    fee_per_appointment: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorInfo({ ...doctorInfo, [name]: value });
  };

  const handleAddDoctor = () => {
    // Validate input and perform any necessary checks

    // Add the new doctor to the doctors array
    onAddDoctor(doctorInfo);

    // Clear the form
    setDoctorInfo({
      name: '',
      specialization: '',
      city: '',
      bio: '',
      fee_per_appointment: '',
    });
  };

  return (
    <div className="add-doctor-container">
      <div className="add-doctor-form">
        <h2>Add Doctor</h2>
        <form>
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            name="name"
            value={doctorInfo.name}
            onChange={handleChange}
            className="add-doctor-input"
          />
          <button
            type="button"
            onClick={handleAddDoctor}
            className="add-doctor-button"
          >
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
