import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance monitoring
// To start measuring performance, pass a function
// For example: reportWebVitals(console.log)
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
