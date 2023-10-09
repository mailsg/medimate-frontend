import { configureStore } from '@reduxjs/toolkit';
import AppointmentSlice from './appointmentSlice';
import DoctorSlice from './doctorSlice';
import appReducer from './adddoctorSlice';

const store = configureStore({
  reducer: {
    doctor: DoctorSlice,
    appointment: AppointmentSlice,
    app: appReducer,
  },
});

export default store;
