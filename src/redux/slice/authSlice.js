// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Thunk action for user registration
export const registerUser = (userData) => async () => {
  try {
    // Make a POST request to your Rails backend registration endpoint
    const response = await axios.post('http://localhost:3000/users/', userData);

    // Handle successful registration
    console.log('Registration success:', response.data);

    // You can dispatch the setUser action to set the user data in the Redux store
    // dispatch(setUser(response.data.user));

    // Optionally, you can also dispatch actions to handle other tasks like login
    // dispatch(loginUser(response.data.user));
  } catch (error) {
    // Handle registration failure, display error messages, etc.
    console.error('Registration failed:', error);
  }
};

export const { loginSuccess, logout, setUser } = authSlice.actions;

export default authSlice.reducer;
