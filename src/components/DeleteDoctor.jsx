import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteDoctorAsync } from '../redux/deletedoctorSlice';
import styles from '../css/DeleteDoctor.module.css';


const DeleteDoctor = () => {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctor.doctors);
  const [error, setError] = useState(null);

  const handleDeleteDoctor = async (doctorId) => {
    try {
      await dispatch(deleteDoctorAsync(doctorId));
      toast.success('Doctor deleted successfully!');

      // Update the list of doctors in localStorage after a doctor is deleted
      const updatedDoctors = doctors.filter((doctor) => doctor.id !== doctorId);
      localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
    } catch (err) {
      setError(err.message || 'Error deleting doctor. Please try again.');
    }
  };

  useEffect(() => {
    // Set the initial list of doctors from localStorage
    const storedDoctors = JSON.parse(localStorage.getItem('doctors'));
    if (storedDoctors) {
      // Initialize the doctors state with data from localStorage
      dispatch({ type: 'initializeDoctors', payload: storedDoctors });
    }
  }, [dispatch]);

  return (
    <div className={styles.deleteDoctorContainer}>
      <h2>Delete Doctor</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <table className={styles.doctorTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Available From</th>
            <th>Available To</th>
            <th>Specialization</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.name}</td>
              <td>{doctor.time_available_from}</td>
              <td>{doctor.time_available_to}</td>
              <td>{doctor.specialization.name}</td>
              <td>
                <button
                  type="button"
                  className={styles.deleteButton}

                  onClick={() => handleDeleteDoctor(doctor.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteDoctor;
