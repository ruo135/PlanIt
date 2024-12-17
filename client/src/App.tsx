import React from 'react'
import AppRoutes from './routes'
import './styles/index.css'
import axios from 'axios'

export default function App() {
  // Set proxy based on node env
  if (process.env.NODE_ENV === 'production') {
    axios.defaults.withCredentials = true
    axios.defaults.baseURL = 'https://planit-bc9a.onrender.com'
  } else {
    axios.defaults.baseURL = 'http://localhost:4000'
  }

  return <AppRoutes />
}
