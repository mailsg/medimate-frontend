import { configureStore } from '@reduxjs/toolkit';
import AppointmentSlice from './appointmentSlice';
import DoctorSlice from './doctorSlice';
import appReducer from './adddoctorSlice';
import deleteDoctorReducer from './deletedoctorSlice';

const store = configureStore({
  reducer: {
    doctor: DoctorSlice,
    appointment: AppointmentSlice,
    app: appReducer,
    deleteDoctor: deleteDoctorReducer,
  },
});

const storedDoctors = JSON.parse(localStorage.getItem('doctors')) || [];
store.dispatch({ type: 'initializeDoctors', payload: storedDoctors });

export default store;
