import { configureStore } from '@reduxjs/toolkit';
import AppointmentSlice from './appointmentSlice';
import DoctorSlice from './doctorSlice';

const store = configureStore({
  reducer: {
    doctor: DoctorSlice,
    appointment: AppointmentSlice,
  },
});

export default store;
