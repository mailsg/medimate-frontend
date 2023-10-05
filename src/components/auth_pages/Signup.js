import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

function SignUp() {
  const { reset, watch } = useForm();
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (watch('password') !== watch('password_confirmation')) return toast.error('Passwords do not match');
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username: data.username,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation,
          },
        }),
      });

      if (response.ok) {
        toast.success(
          'You signed up successfully, you can now log-in with the email and password you just used',
        );
        localStorage.setItem('token', response.headers.get('Authorization'));
        reset();
        console.log(response);
        navigate('/log_in');
      } else {
        console.log('Unable to fetch');
      }
      return null;
    } catch (error) {
      toast.error(
        'An error occured while creating the account, please try again',
      );
      reset();
      console.error('Error:', error);
    }
    return null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {/* <label>Name:</label> */}
          <input
            type="text"
            name="username"
            placeholder="Name"
            value={data.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          {/* <label>Email:</label> */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          {/* <label>Password:</label> */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          {/* <label>Confirm Password:</label> */}
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            value={data.password_confirmation}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
