import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteDoctorAsync } from '../redux/deletedoctorSlice';
import styles from '../css/DeleteDoctor.module.css';
import convertTime from './utilities/time_converter';
import { getDoctors } from '../redux/doctorSlice';

const DeleteDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const doctors = useSelector((state) => state.doctor.doctors);

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch, doctors]);
  const [error, setError] = useState(null);

  const handleDeleteDoctor = async (doctorId) => {
    try {
      dispatch(deleteDoctorAsync(doctorId));
      toast.success('Doctor deleted successfully!');
      const updatedDoctors = doctors.filter((doctor) => doctor.id !== doctorId);
      localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
    } catch (err) {
      setError(err.message || 'Error deleting doctor. Please try again.');
    }
    navigate('/delete');
  };

  useEffect(() => {
    const storedDoctors = JSON.parse(localStorage.getItem('doctors'));
    if (storedDoctors) {
      dispatch({ type: 'initializeDoctors', payload: storedDoctors });
    }
  }, [dispatch]);

  return (
    <div className={styles['remove-doc-wrapper']}>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <section>
        <h1 className={styles['delete-header']}>DELETE DOCTORS</h1>
        {doctors.map((doctor) => (
          <div key={doctor.id} className={styles.card}>
            <div className={styles['text-container']}>
              <h2>{doctor.name}</h2>
              <div className={styles['sub-container']}>
                <div>Time:</div>
                <div>
                  {convertTime(doctor.time_available_from)}
                  <span>{' - '}</span>
                  {convertTime(doctor.time_available_to)}
                </div>
              </div>
              <div className={styles['sub-container']}>
                <div>Specialization:</div>
                <div>{doctor.specialization.name}</div>
              </div>
              <div className={styles['sub-container']}>
                <div>City:</div>
                <div>{doctor.location}</div>
              </div>
              <button
                type="button"
                className={styles['delete-button']}
                onClick={() => handleDeleteDoctor(doctor.id)}
              >
                Delete
              </button>
            </div>
            <img src={doctor.image} alt={doctor.name} className={styles.img} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default DeleteDoctor;
