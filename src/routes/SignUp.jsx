/* eslint-disable jsx-a11y/label-has-associated-control, camelcase */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/slice/authSlice'; // Import your register action
import '../App.css';

const SignupPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const {
    username, email, password, password_confirmation,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== password_confirmation) {
      // Handle password mismatch error
      return;
    }

    // Dispatch the registerUser action with the form data
    dispatch(registerUser({ username, email, password }));

    // Reset form fields
    setFormData({
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
    });
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="user[username]"
            id="username"
            value={username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="user[email]"
            id="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="user[password]"
            id="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password_confirmation">Confirm Password</label>
          <input
            type="password"
            name="password_confirmation"
            id="confirmPassword"
            value={password_confirmation}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignupPage;
