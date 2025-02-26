import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';
import './index.css';
import FirstApp from './FirstApp';

ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <FirstApp />
  </React.StrictMode>
)
