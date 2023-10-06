import { createSlice } from '@reduxjs/toolkit';
import image1 from '../assets/img-1.jpg';
import image2 from '../assets/img-2.jpg';
import image3 from '../assets/img-3.jpg';
import image4 from '../assets/img-4.jpg';
import image5 from '../assets/img-5.jpg';
import image6 from '../assets/img-6.jpg';

const initialState = {
  doctors: [
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
      id: 5,
      name: 'Isabella',
      specialization: 'doctor',
      city: 'Buenos Ares',
      bio: "I don't need to know (necessarily) which people were involved.",
      fee_per_appointment: '$580',
      image: image5,
    },
    {
      id: 6,
      name: 'Charles',
      specialization: 'doctor',
      city: 'Buenos Ares',
      bio: "I don't need to know (necessarily) which people were involved.",
      fee_per_appointment: '$580',
      image: image6,
    },
  ],
};

const DoctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {},

});

export default DoctorSlice.reducer;
