import { createSlice } from '@reduxjs/toolkit';

const doctorSlice = createSlice({
  name: 'doctor',
  initialState: {
    doctors: [],
  },
  reducers: {
    addDoctor: (state, action) => {
      state.doctors.push(action.payload);
    },
    deleteDoctor: (state, action) => {
      const doctorId = action.payload;      
      state.doctors = state.doctors.filter(doctor => doctor.id !== doctorId);
    },
  },
});

export const { addDoctor, deleteDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
