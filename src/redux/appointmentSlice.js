import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    appointment_date: '2023-10-03',
    appointment_time: '14:30:00',
    Duration: 30,
    doctor_id: 11,
  },
  {
    appointment_date: '2023-10-03',
    appointment_time: '14:30:00',
    Duration: 30,
    doctor_id: 11,
  },
  {
    appointment_date: '2023-10-03',
    appointment_time: '14:30:00',
    Duration: 30,
    doctor_id: 11,
  },
];

const AppointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {},

});

export default AppointmentSlice.reducer;
