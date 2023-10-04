import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/reserve.module.css';

export const Reserve = () => (
  <section className={styles.container}>
    <article>
      <h1>BOOK AN APPOINTMENT WITH OUR DOCTORS</h1>
      <div className={styles.thematic} />
      <p>
        Tell us about a time when you used the working agreements (or the roles)
        that you set up at the beginning of the project,
        and how they helped you work better as a team.
      </p>
      <div className={styles['booking-btns']}>
        <select>
          <option>London</option>
          <option>Mumbai</option>
        </select>

        <Link to="/Reservation">
          <button type="button">Book now</button>
        </Link>

      </div>
    </article>
  </section>
);

export default Reserve;
