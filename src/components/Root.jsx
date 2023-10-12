import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Root = () => (
  <div id="root">
    <Header />
    <div id="pages-content">
      <Outlet />
    </div>
  </div>
);

export default Root;
