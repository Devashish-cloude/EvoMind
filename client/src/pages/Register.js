import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, MapPin, Sprout } from 'lucide-react';

const states = ['Maharashtra', 'Karnataka', 'Gujarat', 'Punjab', 'Uttar Pradesh', 'Tamil Nadu'];
const crops = ['Tomato', 'Onion', 'Potato', 'Wheat', 'Rice', 'Cotton', 'Sugarcane'];

function Register({ onRegister, language }) {
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    state: '',
    district: '',
    crops: [],
    language: language
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/register', formData);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      alert('Registration failed');
    }
    setLoading(false);
  };

  const toggleCrop = (crop) => {
    setFormData(prev => ({
      ...prev,
      crops: prev.crops.includes(crop) 
        ? prev.crops.filter(c => c !== crop)
        : [...prev.crops, crop]
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">Complete Registration</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="input-field"
              placeholder="9876543210"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="input-field"
              placeholder="Your name"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">State</label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
                className="input-field"
                required
              >
                <option value="">Select State</option>
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">District</label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({...formData, district: e.target.value})}
                className="input-field"
                placeholder="District"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Select Your Crops</label>
            <div className="grid grid-cols-2 gap-2">
              {crops.map(crop => (
                <button
                  key={crop}
                  type="button"
                  onClick={() => toggleCrop(crop)}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                    formData.crops.includes(crop)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full text-xl">
            {loading ? 'Registering...' : 'Complete Registration'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
