import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Users, LogOut, User, Cloud, BarChart3, Wheat, TrendingUp } from 'lucide-react'

const Navbar = ({ user, onLogout }) => {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav style={{ backgroundColor: '#2E7D32', color: 'white', padding: '16px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: '24px', fontWeight: 'bold' }}>
              🌱 AgriConnect
            </Link>
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link
                to="/dashboard"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  backgroundColor: isActive('/dashboard') ? 'rgba(255,255,255,0.2)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Home size={18} />
                Dashboard
              </Link>
              
              <Link
                to="/weather"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  backgroundColor: isActive('/weather') ? 'rgba(255,255,255,0.2)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Cloud size={18} />
                Weather
              </Link>

              <Link
                to="/stats"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  backgroundColor: isActive('/stats') ? 'rgba(255,255,255,0.2)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <BarChart3 size={18} />
                Stats
              </Link>

              {user.role === 'farmer' && (
                <Link
                  to="/crops"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    backgroundColor: isActive('/crops') ? 'rgba(255,255,255,0.2)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Wheat size={18} />
                  Crops
                </Link>
              )}

              <Link
                to="/market"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  backgroundColor: isActive('/market') ? 'rgba(255,255,255,0.2)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <TrendingUp size={18} />
                Market
              </Link>
              
              <Link
                to="/connect"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  backgroundColor: isActive('/connect') ? 'rgba(255,255,255,0.2)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Users size={18} />
                Connect
              </Link>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={18} />
              <span>{user.name}</span>
              <span style={{ 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                padding: '4px 8px', 
                borderRadius: '12px', 
                fontSize: '12px',
                textTransform: 'capitalize'
              }}>
                {user.role}
              </span>
            </div>
            
            <button
              onClick={onLogout}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: '6px',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar