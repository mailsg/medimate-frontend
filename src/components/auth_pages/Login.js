import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

function LogIn() {
  const { handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/users/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: data.email,
            password: data.password,
          },
        }),
      });

      if (response.ok) {
        const token = response.headers.get('Authorization');
        if (token) {
          toast.success(
            'You logged in successfully',
          );
          reset();
          localStorage.setItem('token', token);
          navigate('/');
        } else {
          setError('Authentication failed. Please try again.');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(
        'An error occured while creating the account, please try again',
      );
      reset();
    }
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
      <h2>Sign In with Email and Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={data.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={data.password}
            onChange={handleInputChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        {' '}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LogIn;
