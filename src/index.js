import React from 'react';
import ReactDOM from 'react-dom/client';  // ใช้ react-dom/client สำหรับ React 18
import './index.css';
import App from './App';

// สร้าง root element และใช้ createRoot()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
