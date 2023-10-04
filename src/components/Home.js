import React from 'react';
import Doctors from './Doctors';
import Header from './Header';
import styles from '../css/reserve.module.css';

export const Home = () => (
  <section className={styles.home}>
    <div className={styles['first-child']}>
      <Header />
    </div>
    <div className={styles['sec-child']}>
      <Doctors />
    </div>
  </section>
);
export default Home;
