import React, { useState } from 'react';
import { Sprout, Store } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [role, setRole] = useState('Farmer'); // 'Farmer' or 'Retailer'
  const [formData, setFormData] = useState({ identifier: '', password: '', name: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isRegistering) {
      // Registration flow
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            role: role,
            mobileOrEmail: formData.identifier,
            password: formData.password
          })
        });
        
        if (response.ok) {
          await response.json();
          alert('Registration successful! Please login.');
          setIsRegistering(false);
          setFormData({ identifier: '', password: '', name: '' });
        } else {
          alert('Registration failed. Please try again.');
        }
      } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed. Please try again.');
      }
    } else {
      // Login flow
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            identifier: formData.identifier,
            password: formData.password,
            role: role
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          const user = {
            id: data.user.id,
            name: data.user.name,
            role: data.user.role,
            contact: data.user.mobileOrEmail
          };
          onLogin(user);
        } else {
          alert('Login failed. Please check your credentials.');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center" style={{ minHeight: '80vh', padding: '2rem 0' }}>
      <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '480px' }}>
        <div className="text-center mb-6">
          <Sprout size={48} color="var(--primary-color)" style={{ margin: '0 auto' }} />
          <h2 className="mt-4 text-primary">{isRegistering ? 'Create Account' : 'Welcome to AgriConnect'}</h2>
          <p className="text-muted">
            {isRegistering ? 'Join our smart retail network' : 'Sign in to your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-6">
            <label className="form-label" style={{ textAlign: 'center', display: 'block' }}>I am a:</label>
            <div className="flex gap-4">
              <div
                className={`card flex-1 text-center transition-all ${role === 'Farmer' ? 'border-primary' : ''}`}
                style={{
                  borderColor: role === 'Farmer' ? 'var(--primary-color)' : 'var(--border-color)',
                  borderWidth: '2px',
                  boxShadow: role === 'Farmer' ? '0 0 0 2px rgba(46,125,50,0.1)' : 'none',
                  cursor: 'pointer',
                  padding: '1.5rem 1rem'
                }}
                onClick={() => setRole('Farmer')}
              >
                <Sprout size={32} className="mb-2" style={{ margin: '0 auto', color: role === 'Farmer' ? 'var(--primary-color)' : 'var(--text-muted)' }} />
                <div className={role === 'Farmer' ? 'font-bold text-primary' : 'text-muted'} style={{ marginTop: '0.5rem' }}>Farmer</div>
              </div>
              <div
                className={`card flex-1 text-center transition-all ${role === 'Retailer' ? 'border-primary' : ''}`}
                style={{
                  borderColor: role === 'Retailer' ? 'var(--primary-color)' : 'var(--border-color)',
                  borderWidth: '2px',
                  boxShadow: role === 'Retailer' ? '0 0 0 2px rgba(46,125,50,0.1)' : 'none',
                  cursor: 'pointer',
                  padding: '1.5rem 1rem'
                }}
                onClick={() => setRole('Retailer')}
              >
                <Store size={32} className="mb-2" style={{ margin: '0 auto', color: role === 'Retailer' ? 'var(--primary-color)' : 'var(--text-muted)' }} />
                <div className={role === 'Retailer' ? 'font-bold text-primary' : 'text-muted'} style={{ marginTop: '0.5rem' }}>Retailer</div>
              </div>
            </div>
          </div>

          {isRegistering && (
            <div className="form-group relative">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter your name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Mobile or Email</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter mobile or email"
              required
              value={formData.identifier}
              onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
            />
          </div>

          <div className="form-group mb-6">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full" style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}>
            {isRegistering ? 'Register Account' : 'Secure Login'}
          </button>
        </form>

        <div className="text-center mt-6 border-t pt-4" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          <p className="text-muted mb-4">
            {isRegistering ? 'Already have an account?' : "Don't have an account?"}
          </p>
          <button
            type="button"
            className="btn btn-secondary w-full"
            style={{ width: '100%', padding: '0.75rem' }}
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? 'Sign In Instead' : 'Create an Account'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
