import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteDoctorAsync = createAsyncThunk(
  'deleteDoctor/deleteDoctorAsync',
  async (doctorId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `http://localhost:3000/api/v1/doctors/${doctorId}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      if (response.ok) {
        return doctorId;
      }
      throw new Error('Failed to delete doctor');
    } catch (error) {
      throw new Error('Error deleting doctor. Please try again.');
    }
  },
);

const initialState = {
  deletingDoctor: false,
  error: null,
};

const deleteDoctorSlice = createSlice({
  name: 'deleteDoctor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteDoctorAsync.pending, (state) => {
        state.deletingDoctor = true;
        state.error = null;
      })
      .addCase(deleteDoctorAsync.fulfilled, (state, action) => {
        state.deletingDoctor = false;
        state.doctors = state.doctors.filter(
          (doctor) => doctor.id !== action.payload,
        );
      })
      .addCase(deleteDoctorAsync.rejected, (state, action) => {
        state.deletingDoctor = false;
        state.error = action.error.message;
      });
  },
});

export default deleteDoctorSlice.reducer;
