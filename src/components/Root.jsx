import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';

const Root = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/log_in');
    }
  }, [token, navigate]);
  return (
    <div id="root">
      <Header />
      <div id="pages-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
