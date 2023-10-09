import React from 'react';
import {
  FaAngleRight,
} from 'react-icons/fa';
import { GoGear } from 'react-icons/go';
import { Link } from 'react-router-dom';
import styles from '../css/doctor.module.css';
import image1 from '../assets/doc-details.png';
import icon from '../assets/icon.png';

const Doctor = () => (
  <section className={styles['doctor-details']}>
    <article className={styles.photo}>
      <img className={styles['doctor-img']} src={image1} alt="laura" />
    </article>
    <article className={styles['extreme-right']}>
      <header>
        <h1>Laura Bush</h1>
        <p className={styles['small-fonts']}>A few words description</p>
      </header>
      <div className={styles['attribute-ls']}>
        <div className={[styles.attribute, styles['dark-bg']].join(' ')}>
          <p>Fee per Appointment:</p>
          <p>$145</p>
        </div>
        <div className={[styles.attribute, styles['light-bg']].join(' ')}>
          <p>Specialization:</p>
          <p>Physiotherapy</p>
        </div>
        <div className={[styles.attribute, styles['dark-bg']].join(' ')}>
          <p>Time available:</p>
          <p>8am - 4pm</p>
        </div>
        <div className={[styles.attribute, styles['light-bg']].join(' ')}>
          <p>Duration:</p>
          <p>2 hours</p>
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
      <Link to="/Reservation">
        <button className={styles['reserve-doctor-btn']} type="button">
          <GoGear className={styles['reserve-btn']} />
          Reserve
          <FaAngleRight className={styles['reserve-btn']} />
        </button>
      </Link>
    </article>
  </section>
);

export default Doctor;
