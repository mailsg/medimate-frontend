import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      error: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username } = this.state; try {
      const response = await axios.post('http://localhost:3000/users/sign_in', {
        username,
      }); localStorage.setItem('token', response.data.token);
    } catch (error) {
      this.setState({ error: 'Invalid username' });
    }
  };

  render() {
    const { username, error } = this.state;
    return (
      <div className="login-container">
        <h2 className="heading">Login</h2>
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
            <button type="submit">Login</button>
          </div>
          <p>Dont have an account? Create one below</p>
          <div>
            <NavLink to="signup">
              <button type="submit">Signup</button>
            </NavLink>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    );
  }
} export default Login;
