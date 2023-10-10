import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/reserve.module.css';

const Reserve = () => (
  <section className={styles.container}>
    <article>
      <h1 className={styles['reserve-header']}>BOOK AN APPOINTMENT WITH OUR DOCTORS</h1>
      <div className={styles.thematic} />
      <p className={styles['reserve-body']}>
        Tell us about a time when you used the working agreements (or the roles)
        that you set up at the beginning of the project,
        and how they helped you work better as a team.
      </p>
      <div className={styles['booking-btns']}>
        <Link to="/Reservation">
          <button type="button">Book now</button>
        </Link>

      </div>
    </article>
  </section>
);

export default Reserve;
