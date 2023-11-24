import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// const baseUrl = 'https://medimate-backend-p22y.onrender.com/api/v1';
const localUrl = 'http://localhost:3000/api/v1';

export const AddDoctor = createAsyncThunk('api/AddDoctor', async (payload) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${localUrl}/doctors`, {
    method: 'POST',
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
    body: payload,
  });
  const data = await response.json();
  return data;
});

export const getDoctors = createAsyncThunk('get/doctors', async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${localUrl}/doctors`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response.data;
});

export const getDoctor = createAsyncThunk('get/doctor', async (payload) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${localUrl}/doctors/${payload}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response.data;
});

export const deleteDoctors = createAsyncThunk(
  'doctors/Deletedoctors',
  async (payload) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${localUrl}/doctors/${payload}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  },
);

const initialState = {
  doctors: [],
  doctor: '',
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
    builder.addCase(getDoctor.fulfilled, (state, action) => {
      // const receivedData = action.payload;
      // return { ...state, doctor: receivedData };
      state.doctor = action.payload;
    });
    builder.addCase(deleteDoctors.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.doctors = action.payload;
    });
  },
});

export default DoctorSlice.reducer;
