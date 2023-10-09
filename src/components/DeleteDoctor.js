import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from 'react-icons/fa';
import { deleteDoctors, getDoctors } from '../redux/doctorSlice';
import styles from '../css/doctors.module.css';

const DeleteDoctor = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(deleteDoctors());
  }, [dispatch]);

  const doctors = useSelector((state) => state.doctor.doctors);
  const navigate = useNavigate();

  const handleDelete = async (docId) => {
    await dispatch(deleteDoctors(docId)).then(() => {
      dispatch(getDoctors());
      navigate('/delete_doctor');
    });
  };

  return (
    <div>
      <h2>Delete doctors you added</h2>
      <div>
        {doctors.map((e) => (
          <div key={e.id}>
            <div>
              <img
                src={e.image}
                alt={e.name}
                crossOrigin="anonymous | use-credentials"
              />
            </div>
            <Link to={`/doctors/${e.id}`} className="link">
              {e.name}
            </Link>
            <p>
              {e.bio.split(' ').slice(0, 15).join(' ')}
              . . .
            </p>
            <div className={styles.socialMedia}>
              <FaFacebookF className={styles['sm-icons']} />
              <FaTwitter className={styles['sm-icons']} />
              <FaLinkedinIn className={styles['sm-icons']} />
              <i className="fa fa-heart" />
            </div>

            <div>
              <button
                type="button"
                onClick={() => handleDelete(e.id)}
              >
                Delete Doctor
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeleteDoctor;
