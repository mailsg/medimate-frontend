/* eslint-disable */ 
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import { Reserve } from './components/Reserve';
import { Doctor } from './components/Doctor';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Doctor />
  </React.StrictMode>,
);
