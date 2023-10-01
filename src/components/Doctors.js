import React, { useState, useEffect } from 'react';
import styles from '../css/doctors.module.css';
import image1 from '../assets/img-1.jpg';
import image2 from '../assets/img-2.jpg';
import image3 from '../assets/img-3.jpg';
import image4 from '../assets/img-4.jpg';

function Doctors() {
  const doctors = [
    {
      id: 1,
      name: 'Charles',
      specialization: 'Cardiology',
      city: 'Lagos',
      bio: "I don't need to know (necessarily) which people were involved.",
      fee_per_appointment: '$145',
      image: image1,
    },
    {
      id: 2,
      name: 'Sandeep',
      specialization: 'Gynaecologist',
      city: 'New Delhi',
      bio: "I don't need to know (necessarily) which people were involved.",
      fee_per_appointment: '$200',
      image: image2,
    },
    {
      id: 3,
      name: 'Emmauel',
      specialization: 'Orthopedics',
      city: 'Johannesburg',
      bio: "I don't need to know (necessarily) which people were involved.",
      fee_per_appointment: '$178',
      image: image3,
    },
    {
      id: 4,
      name: 'Ariel',
      specialization: 'doctor',
      city: 'Buenos Ares',
      bio: "I don't need to know (necessarily) which people were involved.",
      fee_per_appointment: '$580',
      image: image4,
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
    <div className={styles.slideshowContainer}>
      <h1>AVAILABLE DOCTORS</h1>
      <small>Please select from our list of doctors</small>
      <div className={styles.slides}>
        {doctors.slice(currentIndex, currentIndex + displayCount).map((doctor) => (
          <div key={doctor.id}>
            <img src={doctor.image} alt={doctor.name} />
            <h3>{doctor.name}</h3>
            <div>
              <p>
                City:
                {' '}
                {doctor.city}
              </p>
              <p>
                Specialization:
                {' '}
                {doctor.specialization}
              </p>
              <p>
                Fee:
                {' '}
                {doctor.fee_per_appointment}
              </p>
            </div>
            <p>{doctor.bio}</p>
          </div>
        ))}
      </div>

      <button type="button" className={styles.prev} onClick={prevSlide} style={prevButtonStyle}>&#10094;</button>
      <button type="button" className={styles.next} onClick={nextSlide} style={nextButtonStyle}>&#10095;</button>
    </div>
  );
}

export default Doctors;
