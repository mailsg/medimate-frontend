import React from 'react';
import { NavLink } from 'react-router-dom';

const Reserve = () => (
  <section className="container">
    <article>
      <h1>BOOK AN APPOINTMENT WITH OUR DOCTORS</h1>
      <div className="thematic" />
      <p>
        Tell us about a time when you used the working agreements (or the roles)
        that you set up at the beginning of the project, and how they helped you
        work better as a team.
      </p>
      <div className="booking-btns">
        <select>
          <option>London</option>
          <option>Mumbai</option>
        </select>
        <NavLink to="/Reservation">
          <button type="button">Book now</button>
        </NavLink>
      </div>
    </article>
  </section>
);

export default Reserve;
