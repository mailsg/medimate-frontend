import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('token');
export const getAppointments = createAsyncThunk('get/appointments', async () => {
  const response = await axios.get('http://localhost:3000/api/v1/appointments', {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response.data;
});

const initialState = {
  appointments: [],
};

const AppointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
  //   setReservations: (state, action) => {
  //     state.reservations = action.payload;
  //   },
  },
  extraReducers: (builder) => {
    builder.addCase(getAppointments.fulfilled, (state, action) => {
      const receivedData = action.payload;
      return { ...state, appointments: receivedData };
    });
  },
});

export default AppointmentSlice.reducer;
