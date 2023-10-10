import React from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { GoGear } from 'react-icons/go';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from '../css/doctor.module.css';
import icon from '../assets/icon.png';
import back from '../assets/back.png';
import convertTime from './utilities/time_converter';

const Doctor = () => {
  const { doctorId } = useParams();
  console.log(doctorId);

  const { doctors } = useSelector((state) => state.doctor);
  const doctorIdInt = parseInt(doctorId, 10);
  const doctor = doctors.find((doctor) => doctorIdInt === doctor.id);
  console.log(doctor);

  if (doctor) {
    return (
      <section className={styles['doctor-details']}>
        <article className={styles.photo}>
          <img
            className={styles['doctor-img']}
            src={doctor.image}
            alt="laura"
          />
        </article>
        <article className={styles['extreme-right']}>
          <header>
            <h1>{doctor.name.toUpperCase()}</h1>
            <p className={styles['small-fonts']}>{doctor.bio}</p>
          </header>
          <div className={styles['attribute-ls']}>
            <div className={[styles.attribute, styles['dark-bg']].join(' ')}>
              <p>Fee per Appointment:</p>
              <p>{doctor.fee_per_appointment}</p>
            </div>
            <div className={[styles.attribute, styles['light-bg']].join(' ')}>
              <p>Specialization:</p>
              <p>{doctor.specialization.name}</p>
            </div>
            <div className={[styles.attribute, styles['dark-bg']].join(' ')}>
              <p>Time available</p>
              <p>
                {convertTime(doctor.time_available_from)}
                <span>{' - '}</span>
                {convertTime(doctor.time_available_to)}
              </p>
            </div>
            <div className={[styles.attribute, styles['light-bg']].join(' ')}>
              <p>City</p>
              <p>{doctor.location}</p>
            </div>
          </div>
          <p className={styles.discount}>
            <strong>5.9% APR</strong>
            Repesentative
          </p>
          <p className={styles['more-doctors']}>DISCOVER MORE DOCTORS</p>
          <div className={styles['icon-container']}>
            <img className={styles.icon} src={icon} alt="laura" />
          </div>
          <Link to="/Reservation" className={styles['reserve-doctor-btn-con']}>
            <button className={styles['reserve-doctor-btn']} type="button">
              <GoGear className={styles['reserve-btn']} />
              Reserve
              <FaAngleRight className={styles['reserve-btn']} />
            </button>
          </Link>
        </article>
        <Link to="/home">
          <div className={styles['back-btn-container']}>
            <img src={back} alt="back button" className={styles['back-home']} />
          </div>
        </Link>
      </section>
    );
  }
  return <div>Loading...</div>;
};

export default Doctor;
