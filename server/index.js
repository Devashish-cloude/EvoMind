const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Dummy Weather API
app.get('/api/weather', (req, res) => {
  res.json({
    temp: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    wind: 12,
    rainChance: 20,
    forecast: [
      { day: 'Mon', temp: 29, condition: 'Sunny' },
      { day: 'Tue', temp: 27, condition: 'Cloudy' },
      { day: 'Wed', temp: 26, condition: 'Rain' },
      { day: 'Thu', temp: 28, condition: 'Sunny' },
      { day: 'Fri', temp: 30, condition: 'Sunny' },
    ],
    alerts: 'Expected light showers in the next 48 hours. Good time for natural irrigation.'
  });
});

// Dummy Crop Prices API
app.get('/api/crops', (req, res) => {
  res.json([
    { name: 'Tomato', currentPrice: 45, profitPrediction: 'High', risk: 'Low' },
    { name: 'Onion', currentPrice: 22, profitPrediction: 'Medium', risk: 'Medium' },
    { name: 'Cabbage', currentPrice: 12, profitPrediction: 'Low', risk: 'High' }
  ]);
});

// Dummy Auth
app.post('/api/auth/login', (req, res) => {
  const { identifier, role } = req.body;
  res.json({
    token: 'dummy-jwt-token-12345',
    user: {
      id: Math.random().toString(36).substr(2, 9),
      name: role === 'Farmer' ? 'Farmer John' : 'Retailer Mart',
      role: role || 'Farmer',
      contact: identifier,
    }
  });
});

// Simple Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/agriconnect')
  .then(() => console.log('✅ MongoDB Connected (AgriConnect)'))
  .catch(err => console.error('❌ MongoDB Error:', err));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AgriConnect API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 AgriConnect Server running on port ${PORT}`);
});
