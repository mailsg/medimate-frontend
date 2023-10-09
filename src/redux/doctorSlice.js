import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('token');
const baseUrl = 'https://medimate-backend-p22y.onrender.com/api/v1';
// const localUrl = 'http://localhost:3000/api/v1';

export const AddDoctor = createAsyncThunk(
  'api/AddDoctor',
  async (payload) => {
    const response = await fetch(`${baseUrl}/doctors`, {
      method: 'POST',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
      body: payload,
    });
    const data = await response.json();
    return data;
  },
);

export const getDoctors = createAsyncThunk(
  'get/doctors',
  async () => {
    const response = await axios.get(`${baseUrl}/doctors`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  },
);

export const deleteDoctors = createAsyncThunk(
  'doctors/Deletedoctors',
  async (payload) => {
    const response = await axios.delete(`${baseUrl}/doctors/${payload}`);
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
