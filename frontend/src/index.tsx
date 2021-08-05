import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter as Router
} from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
      <Router forceRefresh={true}>
        <App />
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

declare global {
  interface Window {
    current: {
      fetch: {
        type: string,
        data: any,
        hook?: any
      }
    }
  }
}
