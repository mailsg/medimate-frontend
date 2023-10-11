import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  addDoctorAsync,
  fetchSpecializationsAsync,
} from '../redux/adddoctorSlice';
import styles from '../css/reserve-form.module.css';

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
    <div className={styles['reservation-container']}>
      <h1 className={styles['reserve-form-header']}>Add Doctor</h1>
      <div className={styles.addDoctorForm}>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <form className={styles['add-doctor-form']}>
          <div className={[styles['flex-item'], styles.flex1].join(' ')}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={doctorInfo.name}
              onChange={handleChange}
              className={styles.addDoctorInput}
            />
            <input
              type="text"
              placeholder="Available from"
              name="time_available_from"
              value={doctorInfo.time_available_from}
              onChange={handleChange}
              className={styles.addDoctorInput}
            />
            <input
              type="text"
              placeholder="Available to"
              name="time_available_to"
              value={doctorInfo.time_available_to}
              onChange={handleChange}
              className={styles.addDoctorInput}
            />
            <textarea
              placeholder="Short bio..."
              name="bio"
              value={doctorInfo.bio}
              onChange={handleChange}
              className={styles.addDoctorInput}
            />
          </div>
          <div className={styles['flex-item']}>
            <input
              type="text"
              placeholder="Fee per appointment"
              name="fee_per_appointment"
              value={doctorInfo.fee_per_appointment}
              onChange={handleChange}
              className={styles.addDoctorInput}
            />
            <select
              placeholder="Specialization"
              name="specialization_id"
              value={doctorInfo.specialization_id}
              onChange={handleChange}
              className={styles['select-elm']}
            >
              <option value="">Select Specialization</option>
              {specializations.map((spec) => (
                <option key={spec.id} value={spec.id}>
                  {spec.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Image URL"
              name="image"
              value={doctorInfo.image}
              onChange={handleChange}
              className={styles.addDoctorInput}
            />
            <input
              type="text"
              placeholder="City"
              name="location"
              value={doctorInfo.location}
              onChange={handleChange}
              className={styles.addDoctorInput}
            />
            <button
              type="button"
              onClick={handleAddDoctor}
              className={styles['submit-button']}
            >
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
