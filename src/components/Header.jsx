import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../css/header.css';
import {
  BsVimeo,
  BsFacebook,
  BsPinterest,
  BsTwitter,
  BsList,
} from 'react-icons/bs';
import { BiLogoGooglePlus } from 'react-icons/bi';
import { toast } from 'react-toastify';
import logo from '../images/Medimate-logo.png';

const Header = () => {
  const path = useLocation();
  const [panel, setPanel] = useState(true);
  const navigate = useNavigate();

  const setSidePanelBg = (targetPath) => {
    if (path.pathname === targetPath) return { backgroundColor: 'var(--green)', color: 'white' };
    return {};
  };
  const setSidePanelClass = (targetPath) => (path.pathname === targetPath ? 'text-white' : '');

  const handleSignOut = async () => {
    try {
      const response = await fetch('http://localhost:3000/users/sign_out', {
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
      }
      return null;
    } catch (error) {
      toast.error(`Sign out failed ${error}`);
    }
    return null;
  };

  return (
    <>
      <div className="mobile-nav">
        <span
          role="button"
          onClick={() => setPanel(!panel)}
          onKeyDown={() => setPanel(!panel)}
          tabIndex={0}
          aria-label="Toggle Panel"
        >
          <BsList className="bars" />
        </span>
      </div>
      <div
        className={!panel ? 'show' : 'hide'}
        id="header"
        role="button"
        onClick={() => setPanel(!panel)}
        onKeyDown={() => setPanel(!panel)}
        tabIndex={0}
      >
        <div className="nav-panel">
          <div className="logo-container">
            <img
              height={150}
              width={150}
              src={logo}
              alt="logo"
              className="logo"
            />
          </div>
          <ul>
            <li style={setSidePanelBg('/')}>
              <Link className={setSidePanelClass('/')} to="/">
                Doctors
              </Link>
            </li>
            <li style={setSidePanelBg('/reserve')}>
              <Link className={setSidePanelClass('/reserve')} to="reserve">
                Reserve
              </Link>
            </li>
            <li style={setSidePanelBg('/reservations')}>
              <Link
                className={setSidePanelClass('/reservations')}
                to="reservations"
              >
                Reservations
              </Link>
            </li>
            <li style={setSidePanelBg('/add')}>
              <Link className={setSidePanelClass('/add')} to="add">
                Add Doctor
              </Link>
            </li>
            <li style={setSidePanelBg('/delete')}>
              <Link className={setSidePanelClass('/delete')} to="delete">
                Delete Doctor
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={handleSignOut}
                className="sign-out"
              >
                SIGN OUT
              </button>
            </li>
          </ul>
        </div>
        <footer className="footer">
          <div>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter Icon"
            >
              <BsTwitter />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Icon"
            >
              <BsFacebook />
            </a>
            <a
              href="https://plus.google.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Icon"
            >
              <BiLogoGooglePlus />
            </a>
            <a
              href="https://vimeo.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vimeo Icon"
            >
              <BsVimeo />
            </a>
            <a
              href="https://www.pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest icon"
            >
              <BsPinterest />
            </a>
          </div>
          <p>© 2023 MediMate - All Rights Reserved</p>
        </footer>
        <div
          className="mobile close"
          role="button"
          onClick={() => setPanel(!panel)}
          onKeyDown={() => setPanel(!panel)}
          tabIndex={0}
          aria-label="close button"
        >
          <i className="fa fa-solid fa-xmark" />
        </div>
      </div>
    </>
  );
};

export default Header;
