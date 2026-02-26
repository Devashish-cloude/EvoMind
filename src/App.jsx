import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Connect from './components/Connect'
import Weather from './components/Weather'
import Stats from './components/Stats'
import CropRecommendations from './components/CropRecommendations'
import MarketInsights from './components/MarketInsights'
import Navbar from './components/Navbar'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('agriconnect_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('agriconnect_user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('agriconnect_user')
  }

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#2E7D32'
      }}>
        Loading AgriConnect...
      </div>
    )
  }

  return (
    <Router>
      <div className="App">
        {user && <Navbar user={user} onLogout={handleLogout} />}
        <Routes>
          <Route 
            path="/login" 
            element={
              user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              user ? <Dashboard user={user} /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/connect" 
            element={
              user ? <Connect user={user} /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/weather" 
            element={
              user ? <Weather user={user} /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/stats" 
            element={
              user ? <Stats user={user} /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/crops" 
            element={
              user ? <CropRecommendations user={user} /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/market" 
            element={
              user ? <MarketInsights user={user} /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/" 
            element={<Navigate to={user ? "/dashboard" : "/login"} />} 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App