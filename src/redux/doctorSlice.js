import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import image1 from '../assets/img-1.jpg';
import image2 from '../assets/img-2.jpg';

const token = localStorage.getItem('token');
// const baseUrl = 'https://medimate-backend-p22y.onrender.com/api/v1';
const localUrl = 'http://localhost:3000/api/v1';

export const AddDoctor = createAsyncThunk('api/AddDoctor', async (payload) => {
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
  const response = await axios.get(`${localUrl}/doctors`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response.data;
});

export const getDoctor = createAsyncThunk('get/doctor', async (payload) => {
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
    const response = await axios.delete(`${localUrl}/doctors/${payload}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  },
);

const initialState = {
  doctors: [
    {
      id: 1,
      name: 'Dr. laura',
      time_available_from: '12:00',
      time_available_to: '4:00',
      bio: 'fdsfdfjhdsfh,dwfewhrvewcaasfass',
      fee_per_appointment: 23,
      specialization: 'cardio',
      image: image1,
      location: 'lagos',
    },
    {
      id: 2,
      name: 'Dr. Grace',
      time_available_from: '10:00',
      time_available_to: '3:00',
      bio: 'fdsfdfjhdsiuioiphuiuiopihophopihoopokjlj',
      fee_per_appointment: 29,
      specialization: 'physio',
      image: image2,
      location: 'Accra',
    },
  ],
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
