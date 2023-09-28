import React, { useState } from 'react';

function Doctors() {
  const doctors = [
    'Doctor 1',
    'Doctor 2',
    'Doctor 3',
    'Doctor 4',
    'Doctor 5',
    'Doctor 6',
    'Doctor 7',
    'Doctor 8',
    'Doctor 9',
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
    backgroundColor: currentIndex === 0 ? 'grey' : '#8DB600',
  };

  const nextButtonStyle = {
    backgroundColor: currentIndex === doctors.length - 1 ? 'grey' : '#8DB600',
  };

  return (
    <div>
      <div>
        <div>{doctors[currentIndex]}</div>
        <div>{doctors[currentIndex + 1]}</div>
        <div>{doctors[currentIndex + 2]}</div>
      </div>

      <button type="button" onClick={prevSlide} style={prevButtonStyle}>&#10094;</button>
      <button type="button" onClick={nextSlide} style={nextButtonStyle}>&#10095;</button>
    </div>
  );
}

export default Doctors;
