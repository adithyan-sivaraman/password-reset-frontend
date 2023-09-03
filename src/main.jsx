/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { ResetProvider } from './Context'; // Import only the ResetProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <ResetProvider>
  <Router>
    <App />
    </Router>
    </ResetProvider>
)
