import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  BsVimeo, BsFacebook, BsPinterest, BsTwitter,
} from 'react-icons/bs';
import { BiLogoGooglePlus } from 'react-icons/bi';
import { toast } from 'react-toastify';
import logo from '../images/Medimate-logo.png';

export default function Header() {
  const navigate = useNavigate();

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleMenu();
    }
  };

  const handleSignOut = async () => {
    try {
      const response = await fetch('https://medimate-backend-p22y.onrender.com/users/sign_out', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
      });
      localStorage.removeItem('token');

      if (response.ok) {
        toast.success('Sign out is succesful');
        navigate('/log_in');
      } else {
        console.error('Sign-out failed.');
      }
      return null;
    } catch (error) {
      toast.error(`Sign out failed ${error}`);
    }
    return null;
  };

  return (
    <div className="side-panel">
      <div className="logo-div">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div
        className={`menu-icon menu ${menuVisible ? 'open' : ''}`}
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
        <div>
          <button className="sign-out-btn" type="button" onClick={handleSignOut}>SIGN OUT</button>
        </div>
      </nav>
      <footer className="footer">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <BsTwitter />
        </a>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsFacebook />
        </a>
        <a
          href="https://plus.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BiLogoGooglePlus />
        </a>
        <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer">
          <BsVimeo />
        </a>
        <a
          href="https://www.pinterest.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsPinterest />
        </a>
        <p>© 1989 Medimate - All Rights Reserved</p>
      </footer>
    </div>
  );
}
