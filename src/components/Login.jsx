import React, { useState } from 'react'
import { User, Phone, Mail, Eye, EyeOff } from 'lucide-react'

const Login = ({ onLogin }) => {
  const [role, setRole] = useState('farmer')
  const [loginMethod, setLoginMethod] = useState('mobile')
  const [formData, setFormData] = useState({
    mobile: '',
    email: '',
    password: '',
    otp: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSendOTP = () => {
    // Simulate OTP sending
    setOtpSent(true)
    alert('OTP sent successfully!')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simple validation
    if (loginMethod === 'mobile' && !formData.mobile) {
      alert('Please enter mobile number')
      return
    }
    if (loginMethod === 'email' && !formData.email) {
      alert('Please enter email')
      return
    }

    // Simulate login
    const userData = {
      id: Date.now(),
      role: role,
      name: role === 'farmer' ? 'Farmer User' : 'Retailer User',
      contact: formData.mobile || formData.email,
      location: 'Sample Location'
    }

    onLogin(userData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 100%)' }}>
      <div className="container">
        <div className="max-w-md mx-auto">
          <div className="card fade-in">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🌱</div>
              <h1 className="text-3xl font-bold text-green mb-2">AgriConnect</h1>
              <p className="text-gray-600">Smart Farmer Retail Network</p>
            </div>

            {/* Role Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Select Your Role</label>
              <div className="grid grid-2 gap-3">
                <button
                  type="button"
                  className={`btn ${role === 'farmer' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setRole('farmer')}
                >
                  🚜 Farmer
                </button>
                <button
                  type="button"
                  className={`btn ${role === 'retailer' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setRole('retailer')}
                >
                  🏪 Retailer
                </button>
              </div>
            </div>

            {/* Login Method */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Login Method</label>
              <div className="grid grid-2 gap-3">
                <button
                  type="button"
                  className={`btn ${loginMethod === 'mobile' ? 'btn-secondary' : 'btn-outline'}`}
                  onClick={() => setLoginMethod('mobile')}
                >
                  <Phone size={16} className="inline mr-2" />
                  Mobile
                </button>
                <button
                  type="button"
                  className={`btn ${loginMethod === 'email' ? 'btn-secondary' : 'btn-outline'}`}
                  onClick={() => setLoginMethod('email')}
                >
                  <Mail size={16} className="inline mr-2" />
                  Email
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Mobile/Email Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  {loginMethod === 'mobile' ? 'Mobile Number' : 'Email Address'}
                </label>
                <input
                  type={loginMethod === 'mobile' ? 'tel' : 'email'}
                  name={loginMethod}
                  value={formData[loginMethod]}
                  onChange={handleInputChange}
                  className="input"
                  placeholder={loginMethod === 'mobile' ? '+91 9876543210' : 'your@email.com'}
                  required
                />
              </div>

              {/* Password/OTP */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  {otpSent ? 'Enter OTP' : 'Password'}
                </label>
                <div className="relative">
                  <input
                    type={otpSent ? 'text' : (showPassword ? 'text' : 'password')}
                    name={otpSent ? 'otp' : 'password'}
                    value={otpSent ? formData.otp : formData.password}
                    onChange={handleInputChange}
                    className="input pr-12"
                    placeholder={otpSent ? '123456' : 'Enter password'}
                    required
                  />
                  {!otpSent && (
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  )}
                </div>
              </div>

              {/* OTP Button */}
              {!otpSent && (
                <button
                  type="button"
                  className="btn btn-outline mb-4"
                  onClick={handleSendOTP}
                >
                  Send OTP Instead
                </button>
              )}

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary mb-4">
                {isRegister ? 'Register' : 'Login'}
              </button>

              {/* Register Toggle */}
              <div className="text-center">
                <button
                  type="button"
                  className="text-green hover:underline"
                  onClick={() => setIsRegister(!isRegister)}
                >
                  {isRegister ? 'Already have account? Login' : 'New user? Register here'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login