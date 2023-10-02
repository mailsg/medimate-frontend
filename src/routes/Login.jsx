// LoginPage.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginSuccess } from '../redux/slice/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users/sign_in', {
        email,
        password,
      });
      // Assuming your backend returns user data upon successful login
      const userData = response.data.user;
      // Dispatch the action to store the user's information in Redux
      dispatch(loginSuccess(userData));

      // Redirect to the homepage or perform any other desired actions
    } catch (error) {
      // Handle login failure, display error messages, etc.
      console.error('Login failed', error);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="button" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
