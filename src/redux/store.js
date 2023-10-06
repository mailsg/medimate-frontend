import { configureStore } from '@reduxjs/toolkit';
import DoctorSlice from './doctorSlice';

const store = configureStore({
  reducer: {
    Doctors: DoctorSlice,
  },
});

export default store;
