import React, { useState } from 'react';

function Doctors() {
  const doctors = [
    'Doctor image 1',
    'Doctor image 2',
    'Doctor image 3',
    'Doctor image 4',
    'Doctor image 5',
    'Doctor image 6',
    'Doctor image 7',
    'Doctor image 8',
    'Doctor image 9',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === doctors.length - 1
      ? doctors.length - 1 : prevIndex + 1));
  };

  const prevButtonStyle = {
    backgroundColor: currentIndex === 0 ? '#c3b9b9d3' : '#8DB600',
  };

  const nextButtonStyle = {
    backgroundColor: currentIndex === doctors.length - 1 ? '#c3b9b9d3' : '#8DB600',
  };

  return (
    <div className="slideshow-container">
      <h1>AVAILABLE DOCTORS</h1>
      <small>Please select from our list of doctors</small>
      <div className="slides">
        <div className="placeholder first">{doctors[currentIndex]}</div>
        <div className="placeholder second">{doctors[currentIndex + 1]}</div>
        <div className="placeholder third">{doctors[currentIndex + 2]}</div>
      </div>
      <h3>Doctor name</h3>
      <small>hsjsdjvhdsufsdfsddsjgsadgwnssdgd</small>
      <p>Doctor specialties</p>

      <button type="button" className="prev" onClick={prevSlide} style={prevButtonStyle}>&#10094;</button>
      <button type="button" className="next" onClick={nextSlide} style={nextButtonStyle}>&#10095;</button>
    </div>
  );
}

export default Doctors;
