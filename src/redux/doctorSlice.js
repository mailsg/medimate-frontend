import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('token');
export const getDoctors = createAsyncThunk(
  'get/doctors',
  async () => {
    const response = await axios.get('http://localhost:3000/api/v1/doctors', {
      headers: {
        Authorization: `${token}`, // Replace with your JWT token
      },
    });
    return response.data;
  },
);

const initialState = {
  doctors: [],
};

const DoctorSlice = createSlice({
  name: 'doctor',
  initialState,
  // reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getDoctors.fulfilled, (state, action) => {
      const receivedData = action.payload;
      return { ...state, doctors: receivedData };
    });
  },
});

export default DoctorSlice.reducer;
