import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define an initial state
const initialState = {
  addingDoctor: false, // Indicates if a doctor is being added
  error: null, // Stores any error that occurs during the operation
};

// Create an async thunk action for adding a doctor
export const addDoctorAsync = createAsyncThunk(
  'addDoctor',
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

// Create a slice for the "add doctor" operation
const addDoctorSlice = createSlice({
  name: 'addDoctor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addDoctorAsync.pending, (state) => {
        state.addingDoctor = true;
        state.error = null;
      })
      .addCase(addDoctorAsync.fulfilled, (state) => {
        state.addingDoctor = false;
        state.error = null;
      })
      .addCase(addDoctorAsync.rejected, (state, action) => {
        state.addingDoctor = false;
        state.error = action.error.message;
      });
  },
});

export default addDoctorSlice.reducer;
