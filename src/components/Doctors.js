import React, { useState } from 'react';

function Doctors() {
  const doctors = [
    {
      name: 'Charles',
      specialization: 'Cardiology',
      city: 'Lagos',
      bio: "I don't need to know (necessarily) which people were involved. If so, how did you approach solving the conflict? If not, what measures did you put in place to prevent conflicts?",
      fee_per_appointment: '$145',
      image: 'Image 99',
    },
    {
      name: 'Sandeep',
      specialization: 'Gynaecologist',
      city: 'New Delhi',
      bio: "I don't need to know (necessarily) which people were involved. If so, how did you approach solving the conflict? If not, what measures did you put in place to prevent conflicts?",
      fee_per_appointment: '$200',
      image: 'Image 78',
    },
    {
      name: 'Emmauel',
      specialization: 'Orthopedics',
      city: 'Johannesburg',
      bio: "I don't need to know (necessarily) which people were involved. If so, how did you approach solving the conflict? If not, what measures did you put in place to prevent conflicts?",
      fee_per_appointment: '$178',
      image: 'Image 24',
    },
    {
      name: 'Ariel',
      specialization: 'doctor',
      city: 'Buenos Ares',
      bio: "I don't need to know (necessarily) which people were involved. If so, how did you approach solving the conflict? If not, what measures did you put in place to prevent conflicts?",
      fee_per_appointment: '$580',
      image: 'Image 17',
    },
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
        <div>
          <div className="placeholder first">{doctors[currentIndex].image}</div>
          <h3>{doctors[currentIndex].name}</h3>
          <div>
            <p>
              City:
              {doctors[currentIndex].city}
            </p>
            <p>
              specialization:
              {doctors[currentIndex].specialization}
            </p>
            <p>
              Fee:
              {doctors[currentIndex].fee_per_appointment}
            </p>
          </div>
          <p>{doctors[currentIndex].bio}</p>
        </div>
        <div className="second">
          <div className="placeholder">{doctors[currentIndex + 1].image}</div>
          <h3>{doctors[currentIndex + 1].name}</h3>
          <div>
            <p>
              City:
              {doctors[currentIndex + 1].city}
            </p>
            <p>
              specialization:
              {doctors[currentIndex + 1].specialization}
            </p>
            <p>
              Fee:
              {doctors[currentIndex + 1].fee_per_appointment}
            </p>
          </div>
          <p>{doctors[currentIndex + 1].bio}</p>
        </div>
        <div className="third">
          <div className="placeholder">{doctors[currentIndex + 2].image}</div>
          <h3>{doctors[currentIndex + 2].name}</h3>
          <div>
            <p>
              City:
              {doctors[currentIndex + 2].city}
            </p>
            <p>
              specialization:
              {doctors[currentIndex + 2].specialization}
            </p>
            <p>
              Fee:
              {doctors[currentIndex + 2].fee_per_appointment}
            </p>
          </div>
          <p>{doctors[currentIndex + 2].bio}</p>
        </div>
      </div>

      <button type="button" className="prev" onClick={prevSlide} style={prevButtonStyle}>&#10094;</button>
      <button type="button" className="next" onClick={nextSlide} style={nextButtonStyle}>&#10095;</button>
    </div>
  );
}

export default Doctors;
