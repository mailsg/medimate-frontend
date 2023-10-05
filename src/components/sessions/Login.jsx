import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      const response = await axios.post('http://localhost:3000/users/sign_in', {
        email,
        password,
      });

      const jtiToken = response.data.jti;

      localStorage.setItem('jtiToken', jtiToken);
    } catch (error) {
      this.setState({ error: 'Invalid email or password' });
    }
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <div className="login-container">
        <h2 className="heading">Login</h2>
        <form onSubmit={this.handleSubmit}>
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
            <button type="submit">Login</button>
          </div>
          <p>
            Dont have an account?
            <NavLink to="signup">SignUp</NavLink>
          </p>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    );
  }
}

export default Login;
