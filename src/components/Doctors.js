import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaAngleRight,
  FaAngleLeft,
} from 'react-icons/fa';
import { getDoctors } from '../redux/doctorSlice';
import styles from '../css/doctors.module.css';

const Doctors = () => {
  const doctors = useSelector((state) => state.doctor.doctors);

  const dispatch = useDispatch();

  const getDisplayCount = () => (window.matchMedia('(max-width: 768px)').matches ? 1 : 3);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayCount, setDisplayCount] = useState(getDisplayCount());

  const handleResize = () => {
    setDisplayCount(getDisplayCount());
  };

  useEffect(() => {
    dispatch(getDoctors());
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === doctors.length - displayCount
      ? prevIndex : prevIndex + 1));
  };

  const prevButtonStyle = {
    backgroundColor: currentIndex === 0 ? '#c3b9b9d3' : '#8DB600',
  };

  const nextButtonStyle = {
    backgroundColor:
      currentIndex === doctors.length - displayCount ? '#c3b9b9d3' : '#8DB600',
  };

  const isAuthenticated = localStorage.getItem('token') !== null;
  if (!isAuthenticated) {
    return <h3 className={styles['no-doctors']}>Sign Up or Login to continue...</h3>;
  }

  if (doctors.length !== 0) {
    return (
      <div className={styles['slideshow-container']}>
        <header>
          <h1>AVAILABLE DOCTORS</h1>
          <p className={styles['home-paragraph']}>
            Select from your list of doctors
          </p>
        </header>
        <div className={styles.slides}>
          {doctors
            .slice(currentIndex, currentIndex + displayCount)
            .map((doctor) => (
              <div key={doctor.id}>
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className={styles['doctor-images']}
                />
                <Link to={`/doctors/${doctor.id}`} className={styles['name-link']}>
                  <h2>{doctor.name}</h2>
                </Link>
                <div>
                  <span>
                    Fee:
                    {' '}
                    {doctor.fee_per_appointment}
                  </span>
                  <span>
                    City:
                    {' '}
                    {doctor.location}
                  </span>
                </div>
                <p className={styles['home-paragraph']}>{doctor.specialization.name}</p>
                <div className={styles.socialMedia}>
                  <FaFacebookF className={styles['sm-icons']} />
                  <FaTwitter className={styles['sm-icons']} />
                  <FaLinkedinIn className={styles['sm-icons']} />
                  <i className="fa fa-heart" />
                </div>
              </div>
            ))}
        </div>

        <FaAngleLeft
          onClick={prevSlide}
          className={styles['slide-icon-left']}
          style={prevButtonStyle}
        />
        <FaAngleRight
          onClick={nextSlide}
          className={styles['slide-icon-right']}
          style={nextButtonStyle}
        />
      </div>
    );
  }
  return <h3 className={styles['no-doctors']}>YOU HAVE NOT ADDED ANY DOCTORS YET...</h3>;
};

export default Doctors;
