import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('token');
export const getAppointments = createAsyncThunk(
  'get/appointments',
  async () => {
    const response = await axios.get(
      'http://localhost:3000/api/v1/appointments',
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    return response.data;
  },
);

export const deleteAppointmentThunk = createAsyncThunk(
  'deleteAppointment/deleteAppointmentAsync',
  async (appId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `http://localhost:3000/api/v1/appointments/${appId}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      if (response.ok) {
        return appId;
      }
      throw new Error('Failed to delete appointment');
    } catch (error) {
      throw new Error('Error deleting appoitment. Please try again.');
    }
  },
);

const initialState = {
  appointments: [],
  deleteAppointment: false,
};

const AppointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    setReservations: (state, action) => {
      state.reservations = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAppointments.fulfilled, (state, action) => {
        const receivedData = action.payload;
        return { ...state, appointments: receivedData };
      })
      .addCase(deleteAppointmentThunk.fulfilled, (state, action) => {
        state.deleteAppointment = false;
        state.appointments = state.appointments.filter(
          (app) => app.id !== action.payload,
        );
      });
  },
});

export const { setReservations } = AppointmentSlice.actions;
export default AppointmentSlice.reducer;
