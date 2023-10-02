import React from 'react'
import styles from '../css/doctor.module.css';
import image1 from '../assets/img-1.jpg';

export const Doctor = () => {
  return (
    <section>
      <article>
        <img src={image1} description="laura" />
      </article>
      <article class={styles['extreme-right']}>
      
      </article>
    </section>
  )
}
