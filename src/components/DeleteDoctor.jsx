import React, { useEffect, useState } from 'react';
import '../css/deletedoctors.css';

const DeleteDoctor = ({ onDeleteDoctor }) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch the list of doctors from your API here
    // Replace 'API_URL' with the actual API endpoint
    fetch('API_URL')
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error('Error fetching doctors: ', error));
  }, []);

  const handleDelete = (doctorId) => {
    // Make a DELETE request to your API to delete the doctor
    // Replace 'API_URL' with the actual API endpoint
    fetch(`API_URL/${doctorId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        // Update the list of doctors in the state after deletion
        setDoctors(doctors.filter((doctor) => doctor.id !== doctorId));
      })
      .catch((error) => console.error('Error deleting doctor: ', error));
  };

  return (
    <div className="delete-doctor-container">
      {' '}
      {/* Apply a container class */}
      <h2 className="delete-doctor-heading">Delete Doctor</h2>
      {' '}
      {/* Apply a heading class */}
      <ul className="delete-doctor-list">
        {' '}
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            {doctor.name}
            <button
              type="button"
              className="delete-doctor-button"
              onClick={() => onDeleteDoctor(doctor.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteDoctor;
