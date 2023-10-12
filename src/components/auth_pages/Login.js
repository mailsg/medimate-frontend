import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import styles from '../../css/reserve-form.module.css';

function LogIn() {
  const { reset } = useForm();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      toast.warn('Please fill in all fields');
    }
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
    <div className={styles['reservation-container']}>
      <h1 className={styles['reserve-form-header']}>Sign In with Email and Password</h1>
      <form onSubmit={handleSubmit} className={styles['reservation-form']}>
        <div className={styles['form-group']}>
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={data.email}
            onChange={handleInputChange}
            // required
          />
        </div>
        <div className={styles['form-group']}>
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={data.password}
            onChange={handleInputChange}
            // required
          />
        </div>
        {error && <p className="error">{error}</p>}
        {' '}
        <div className={styles['btn-container']}>
          <button type="submit" className={styles['submit-button']}>
            Log in
          </button>
        </div>
      </form>
      <div className={styles['float-btn-container']}>
        <p>Not registered?</p>
        <Link to="/sign_up">
          <button className={[styles['float-btn'], styles['submit-button']].join(' ')} type="submit">Sign up</button>
        </Link>
      </div>
    </div>
  );
}

export default LogIn;
