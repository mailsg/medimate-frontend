import React from 'react';
import {
  FaAngleRight,
} from 'react-icons/fa';
import { GoGear } from 'react-icons/go';
import styles from '../css/doctor.module.css';
import image1 from '../assets/doc-details.png';

export const Doctor = () => (
  <section>
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
          <p>Fee per Appointment</p>
          <p>$145</p>
        </div>
        <div className={[styles.attribute, styles['light-bg']].join(' ')}>
          <p>Specialization</p>
          <p>Physiotherapy</p>
        </div>
        <div className={[styles.attribute, styles['dark-bg']].join(' ')}>
          <p>Time available</p>
          <p>8am - 4pm</p>
        </div>
        <div className={[styles.attribute, styles['light-bg']].join(' ')}>
          <p>Duration</p>
          <p>2 hours</p>
        </div>
      </div>
      <p className={styles.discount}>
        <strong>5.9% APR</strong>
        Repesentative
      </p>
      <p className={styles['small-fonts']}>DISCOVER MORE DOCTORS</p>
      {/* <img src={image1} alt="laura" /> */}
      <button type="button">
        <GoGear />
        Reserve
        <FaAngleRight />
      </button>
    </article>
  </section>
);

export default Doctor;
