import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
// import { addDoctor } from './redux/doctorSlice';
import styles from '../css/AddDoctor.module.css';

const AddDoctor = () => {
  // const dispatch = useDispatch();
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

      if (response.ok) {
        // const data = await response.json();
        // dispatch(addDoctor(data));
        // setDoctorInfo({
        //   name: '',
        //   time_available_from: '',
        //   time_available_to: '',
        //   bio: '',
        //   fee_per_appointment: '',
        //   specialization_id: '',
        //   image: '',
        //   location: '',
        // });
        toast.success('Doctor added successfully!', {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate('/Reserve');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to add doctor to the database');
      }
    } catch (error) {
      setError('Error adding doctor. Please try again.');
    }
  };

  return (
    <div className={styles.addDoctorContainer}>
      <ToastContainer />
      <h2 className={styles.heading}>Add Doctor</h2>
      <div className={styles.addDoctorForm}>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <form>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={doctorInfo.name}
            onChange={handleChange}
            className={styles.addDoctorInput}
          />
          <label htmlFor="time_available_from">Available From</label>
          <input
            type="text"
            name="time_available_from"
            value={doctorInfo.time_available_from}
            onChange={handleChange}
            className={styles.addDoctorInput}
          />

          <label htmlFor="time_available_to">Available To</label>
          <input
            type="text"
            name="time_available_to"
            value={doctorInfo.time_available_to}
            onChange={handleChange}
            className={styles.addDoctorInput}
          />

          <label htmlFor="bio">Bio</label>
          <textarea
            name="bio"
            value={doctorInfo.bio}
            onChange={handleChange}
            className={styles.addDoctorInput}
          />

          <label htmlFor="fee_per_appointment">Fee per Appointment</label>
          <input
            type="text"
            name="fee_per_appointment"
            value={doctorInfo.fee_per_appointment}
            onChange={handleChange}
            className={styles.addDoctorInput}
          />

          <label htmlFor="specialization_id">Specialization ID</label>
          <input
            type="text"
            name="specialization_id"
            value={doctorInfo.specialization_id}
            onChange={handleChange}
            className={styles.addDoctorInput}
          />

          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            name="image"
            value={doctorInfo.image}
            onChange={handleChange}
            className={styles.addDoctorInput}
          />

          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            value={doctorInfo.location}
            onChange={handleChange}
            className={styles.addDoctorInput}
          />
          <button
            type="submit"
            onClick={handleAddDoctor}
            className={styles.addDoctorButton}
          >
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
