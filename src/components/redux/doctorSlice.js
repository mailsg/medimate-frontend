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
  },
});

export const { addDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
