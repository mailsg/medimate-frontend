import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/v1';

const token = localStorage.getItem('token');

export const getDoctors = createAsyncThunk(
  'get/doctors',
  async () => {
    const response = await axios.get(
      `${baseUrl}/doctors`,
    );
    return response.data;
  },
);

export const AddDoctor = createAsyncThunk(
  'api/AddDoctor',
  async (payload) => {
    const response = await fetch(`${baseUrl}/doctors`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: payload,
    });
    const data = await response.json();
    return data;
  },
);

const initialState = {
  doctors: [],
};

const DoctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getDoctors.fulfilled, (state, action) => {
      state.doctors = action.payload;
    });
  },
});

export default DoctorSlice.reducer;
