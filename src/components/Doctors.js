import React, { useState, useEffect } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaAngleRight,
  FaAngleLeft,
} from 'react-icons/fa';
import styles from '../css/doctors.module.css';
import image1 from '../assets/img-1.jpg';
import image2 from '../assets/img-2.jpg';
import image3 from '../assets/img-3.jpg';
import image4 from '../assets/img-4.jpg';
import image5 from '../assets/img-5.jpg';
import image6 from '../assets/img-6.jpg';

function Doctors() {
  const doctors = [
    {
      id: 1,
      name: 'Laura',
      specialization: 'Cardiology',
      city: 'Lagos',
      bio: "I don't need to know (necessarily) which people were involved.",
      fee_per_appointment: '$145',
      image: image1,
    },
    {
      id: 2,
      name: 'Condolezza',
      specialization: 'Gynaecologist',
      city: 'New Delhi',
      bio: "I don't need to know (necessarily) which people were involved.",
      fee_per_appointment: '$200',
      image: image2,
    },
    {
      id: 3,
      name: 'Ruth',
      specialization: 'Orthopedics',
      city: 'Johannesburg',
      bio: "I don't need to know (necessarily) which people were involved.",
      fee_per_appointment: '$178',
      image: image3,
    },
    {
      id: 4,
      name: 'Naomi',
      specialization: 'doctor',
      city: 'Buenos Ares',
      bio: "I don't need to know (necessarily) which people were involved.",
      fee_per_appointment: '$580',
      image: image4,
    },
    {
      id: 4,
      name: 'Isabella',
      specialization: 'doctor',
      city: 'Buenos Ares',
      bio: "I don't need to know (necessarily) which people were involved.",
      fee_per_appointment: '$580',
      image: image5,
    },
    {
      id: 4,
      name: 'Charles',
      specialization: 'doctor',
      city: 'Buenos Ares',
      bio: "I don't need to know (necessarily) which people were involved.",
      fee_per_appointment: '$580',
      image: image6,
    },
  ];

  const getDisplayCount = () => (window.matchMedia('(max-width: 768px)').matches ? 1 : 3);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayCount, setDisplayCount] = useState(getDisplayCount());

  const handleResize = () => {
    setDisplayCount(getDisplayCount());
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    backgroundColor: currentIndex === doctors.length - displayCount ? '#c3b9b9d3' : '#8DB600',
  };

  return (
    <div className={styles['slideshow-container']}>
      <header>
        <h1>AVAILABLE DOCTORS</h1>
        <p>Please select from our list of doctors</p>
      </header>
      <div className={styles.slides}>
        {doctors.slice(currentIndex, currentIndex + displayCount).map((doctor) => (
          <div key={doctor.id}>
            <img src={doctor.image} alt={doctor.name} className={styles.doctorImages} />
            <h3>{doctor.name}</h3>
            <div>
              <span>
                Fee:
                {' '}
                {doctor.fee_per_appointment}
              </span>
              <span>
                City:
                {' '}
                {doctor.city}
              </span>
              <span>
                Specialization:
                {' '}
                {doctor.specialization}
              </span>
            </div>
            <p>{doctor.bio}</p>
            <div className={styles.socialMedia}>
              <FaFacebookF className={styles['sm-icons']} />
              <FaTwitter className={styles['sm-icons']} />
              <FaLinkedinIn className={styles['sm-icons']} />
              <i className="fa fa-heart" />
            </div>
          </div>
        ))}
      </div>

      <FaAngleLeft onClick={prevSlide} className={styles['slide-icon-left']} style={prevButtonStyle} />
      <FaAngleRight onClick={nextSlide} className={styles['slide-icon-right']} style={nextButtonStyle} />
    </div>
  );
}

export default Doctors;
