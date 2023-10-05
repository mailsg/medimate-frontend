import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

function SignUp() {
  const { reset, watch } = useForm();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    name: '',
    password: '',
    confirm_password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (watch('password') !== watch('confirm_password')) return toast.warn('Passwords are different');
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: data.email,
            name: data.name,
            password: data.password,
            confirm_password: data.confirm_password,
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
            name="name"
            placeholder="Name"
            value={data.name}
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
            name="confirm_password"
            placeholder="Confirm Password"
            value={data.confirm_password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
