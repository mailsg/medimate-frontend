import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  specializations: [],
  addingDoctor: false,
  error: null,
};

export const fetchSpecializationsAsync = createAsyncThunk(
  'specializations/fetchSpecializationsAsync',
  async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      const response = await axios.get(
        'http://localhost:3000/api/v1/specializations',
        {
          headers: {
            Authorization: token, // Include the token in the request headers
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch specializations');
    }
  },
);

export const addDoctorAsync = createAsyncThunk(
  'addDoctor/addDoctorAsync',
  async (doctorInfo) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/v1/doctors',
        doctorInfo,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to add doctor');
    }
  },
);

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecializationsAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchSpecializationsAsync.fulfilled, (state, action) => {
        state.specializations = action.payload;
      })
      .addCase(fetchSpecializationsAsync.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch specializations';
      })
      .addCase(addDoctorAsync.pending, (state) => {
        state.addingDoctor = true;
        state.error = null;
      })
      .addCase(addDoctorAsync.fulfilled, (state) => {
        state.addingDoctor = false;
      })
      .addCase(addDoctorAsync.rejected, (state, action) => {
        state.addingDoctor = false;
        state.error = action.error.message;
      });
  },
});

export default appSlice.reducer;
