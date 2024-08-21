import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Senicare from './Senicare';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Senicare />
  </React.StrictMode>
);
