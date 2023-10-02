import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import logo from '../images/Medimate-logo.png';

export default function Header() {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleMenu();
    }
  };

  return (
    <div className="side-panel">
      <div className="logo-div">
        <img
          src={logo}
          alt="logo"
          className="logo"
          style={{ width: '150px', height: '150px' }}
        />
      </div>
      <div
        className={`menu-icon ${menuVisible ? 'open' : ''}`}
        onClick={toggleMenu}
        onKeyPress={handleKeyPress}
        role="button"
        tabIndex="0"
        aria-label="Toggle Menu"
      >
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </div>

      <nav className={`side-nav ${menuVisible ? 'open' : ''}`}>
        <NavLink className="link-item1" to="/" activeClassName="active">
          Doctors
        </NavLink>
        <NavLink className="link-item2" to="Reserve" activeClassName="active">
          Reserve
        </NavLink>
        <NavLink
          className="link-item3"
          to="Myreservations"
          activeClassName="active"
        >
          My Reservations
        </NavLink>
        <NavLink className="link-item3" to="Adddoctor" activeClassName="active">
          Add Doctor
        </NavLink>
        <NavLink
          className="link-item3"
          to="Deletedoctor"
          activeClassName="active"
        >
          Delete Doctor
        </NavLink>
      </nav>
      <footer className="footer">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-twitter" />
        </a>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-facebook" />
        </a>
        <a
          href="https://plus.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-google" />
        </a>
        <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-vimeo" />
        </a>
        <a
          href="https://www.pinterest.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-pinterest" />
        </a>
      </footer>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
