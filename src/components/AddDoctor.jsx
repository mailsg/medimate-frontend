import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import {
  addDoctorAsync,
  fetchSpecializationsAsync,
} from '../redux/adddoctorSlice';
import styles from '../css/AddDoctor.module.css';

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
  useEffect(() => {
    dispatch(fetchSpecializationsAsync());
  }, [dispatch]);

  const specializations = useSelector((state) => state.app.specializations);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorInfo({ ...doctorInfo, [name]: value });
  };

  const handleAddDoctor = async () => {
    try {
      await dispatch(addDoctorAsync(doctorInfo));
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

      toast.success('Doctor added successfully!', {
        position: toast.POSITION.TOP_CENTER,
      });

      navigate('/');
    } catch (err) {
      setError(err.message || 'Error adding doctor. Please try again.');
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

          <label htmlFor="specialization_id">Specialization</label>
          <select
            name="specialization_id"
            value={doctorInfo.specialization_id}
            onChange={handleChange}
            className={styles.addDoctorInput}
          >
            <option value="">Select Specialization</option>
            {specializations.map((spec) => (
              <option key={spec.id} value={spec.id}>
                {spec.name}
              </option>
            ))}
          </select>
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
            type="button"
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
