import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import styles from '../../css/reserve-form.module.css';

const SignUp = () => {
  const { reset } = useForm();
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.username || !data.email || !data.password || !data.password_confirmation) {
      toast.warn('Please fill in all fields');
    }
    if (data.password !== data.password_confirmation) return toast.error('Passwords do not match');
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
        navigate('/log_in');
      }

      return null;
    } catch (error) {
      toast.error(
        'An error occured while creating the account, please try again',
      );
      reset();
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
    <div className={styles['reservation-container']}>
      <h1 className={styles['reserve-form-header']}>Sign Up</h1>
      <form onSubmit={handleSubmit} className={styles['reservation-form']}>
        <div className={styles['form-group']}>
          <input
            type="text"
            name="username"
            placeholder="Name"
            value={data.username}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles['form-group']}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles['form-group']}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles['form-group']}>
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            value={data.password_confirmation}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles['btn-container']}>
          <button type="submit" className={styles['submit-button']}>
            Sign up
          </button>
        </div>
      </form>
      <div className={styles['float-btn-container']}>
        <p>Already have an account?</p>
        <Link to="/log_in">
          <button className={[styles['float-btn'], styles['submit-button']].join(' ')} type="submit">Log in</button>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
