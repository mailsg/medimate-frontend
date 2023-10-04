import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
      successMessage: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      username, email, password, confirmPassword,
    } = this.state; if (password !== confirmPassword) {
      this.setState({ error: 'Passwords do not match' });
      return;
    } try {
      await axios.post('http://localhost:3000/users/', {
        username,
        email,
        password,
      }); // Handle successful registration here
      this.setState({ successMessage: 'Registration successful', error: '' });
    } catch (error) {
      // Handle registration failure
      this.setState({ error: 'Registration failed', successMessage: '' });
    }
  };

  render() {
    const {
      username,
      email,
      password,
      confirmPassword,
      error,
      successMessage,
    } = this.state;
    return (
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.handleChange}
              required
            />
          </div>
          <p>Already have an account? Login</p>
          <div>
            <button type="submit">Sign Up</button>
            <NavLink to="/">
              <button type="submit">Login</button>
            </NavLink>
          </div>
          {error && <p className="error-message">{error}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </form>
      </div>
    );
  }
} export default SignUp;
