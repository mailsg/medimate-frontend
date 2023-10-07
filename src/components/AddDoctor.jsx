import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addDoctor } from './redux/doctorSlice';
import '../css/adddoctor.css';

const AddDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [doctorInfo, setDoctorInfo] = useState({
    name: '',
    time_available_from: '',
    time_available_to: '',
    bio: '',
    fee_per_appointment: '',
    specialization_id: '',
    image: '',
    location: '',
  });

  const [error, setError] = useState(null);
  const [specializations, setSpecializations] = useState([]); // Initialize as an empty array

  useEffect(() => {
    // Fetch specializations from your API and populate the dropdown
    fetch("http://localhost:3000/api/v1/specializations")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Ensure data is an array before setting it in state
          setSpecializations(data);
        } else {
          console.error("Specializations data is not an array:", data);
        }
      })
      .catch((error) =>
        console.error("Error fetching specializations:", error)
      );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorInfo({ ...doctorInfo, [name]: value });
  };

  const handleAddDoctor = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify(doctorInfo),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to add doctor to the database');
      } else {
        const data = await response.json();
        dispatch(addDoctor(data));
        setDoctorInfo({
          name: '',
          time_available_from: '',
          time_available_to: '',
          bio: '',
          fee_per_appointment: '',
          specialization_id: '',
          image: '',
          location: '',
        });

        // Show a success message using toast
        toast.success('Doctor added successfully!');

        navigate('/');
      }
    } catch (error) {
      setError('Error adding doctor. Please try again.');
    }
  };

  return (
    <div className="add-doctor-container">
      <div className="add-doctor-form">
        <h2>Add Doctor</h2>
        {error && <p className="error-message">{error}</p>}
        <form>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={doctorInfo.name}
            onChange={handleChange}
            className="add-doctor-input"
          />
          <label htmlFor="time_available_from">Available From</label>
          <input
            type="text"
            name="time_available_from"
            value={doctorInfo.time_available_from}
            onChange={handleChange}
            className="add-doctor-input"
          />

          <label htmlFor="time_available_to">Available To</label>
          <input
            type="text"
            name="time_available_to"
            value={doctorInfo.time_available_to}
            onChange={handleChange}
            className="add-doctor-input"
          />

          <label htmlFor="bio">Bio</label>
          <textarea
            name="bio"
            value={doctorInfo.bio}
            onChange={handleChange}
            className="add-doctor-input"
          />

          <label htmlFor="fee_per_appointment">Fee per Appointment</label>
          <input
            type="text"
            name="fee_per_appointment"
            value={doctorInfo.fee_per_appointment}
            onChange={handleChange}
            className="add-doctor-input"
          />

          <label htmlFor="specialization_id">Specialization</label>
          <select
            name="specialization_id"
            value={doctorInfo.specialization_id}
            onChange={handleChange}
            className="add-doctor-input"
          >
            <option value="">Select a specialization</option>
            {specializations.map((specialization) => (
              <option key={specialization.id} value={specialization.id}>
                {specialization.name}
              </option>
            ))}
          </select>

          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            name="image"
            value={doctorInfo.image}
            onChange={handleChange}
            className="add-doctor-input"
          />

          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            value={doctorInfo.location}
            onChange={handleChange}
            className="add-doctor-input"
          />
          <button
            type="submit"
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
