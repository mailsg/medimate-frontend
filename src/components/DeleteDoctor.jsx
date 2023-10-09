// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
// import { deleteDoctors, getDoctors } from '../redux/doctorSlice';
// import styles from '../css/doctors.module.css';

// const DeleteDoctor = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(deleteDoctors());
//   });
//   const doctors = useSelector((state) => state.doctor.doctors);
//   const navigate = useNavigate();

//   const handleDelete = async (docId) => {
//     await dispatch(deleteDoctors(docId)).then(() => {
//       console.log(docId);
//       dispatch(getDoctors());
//       navigate('/');
//     });
//   };

//   return (
//     <div>
//       <h2>Delete doctors you added</h2>
//       <div>
//         {doctors.map((e) => (
//           <div key={e.id}>
//             <div>
//               <img
//                 src={e.image}
//                 alt={e.name}
//                 crossOrigin="anonymous | use-credentials"
//               />
//             </div>
//             <Link to={`/doctors/${e.id}`} className="link">
//               {e.name}
//             </Link>
//             <p>
//               {e.bio.split(' ').slice(0, 15).join(' ')}
//               . . .
//             </p>
//             <div className={styles.socialMedia}>
//               <FaFacebookF className={styles['sm-icons']} />
//               <FaTwitter className={styles['sm-icons']} />
//               <FaLinkedinIn className={styles['sm-icons']} />
//               <i className="fa fa-heart" />
//             </div>

//             <div>
//               <button type="button" onClick={() => handleDelete(e.id)}>
//                 Delete Doctor
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DeleteDoctor;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteDoctorAsync } from '../redux/deletedoctorSlice';
import styles from '../css/DeleteDoctor.module.css';

const DeleteDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const doctors = useSelector((state) => state.doctor.doctors);
  const [error, setError] = useState(null);

  const handleDeleteDoctor = async (doctorId) => {
    try {
      await dispatch(deleteDoctorAsync(doctorId));
      toast.success('Doctor deleted successfully!');
      const updatedDoctors = doctors.filter((doctor) => doctor.id !== doctorId);
      localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
    } catch (err) {
      setError(err.message || 'Error deleting doctor. Please try again.');
    }
    navigate('/');
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