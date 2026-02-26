const express = require('express');
const router = express.Router();
const MandiPrice = require('../models/MandiPrice');
const axios = require('axios');

// Get Dashboard Data
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { crop = 'Tomato', state = 'Maharashtra' } = req.query;

    // Get 7-day price trend
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const priceTrend = await MandiPrice.find({
      crop,
      'mandi.state': state,
      date: { $gte: sevenDaysAgo }
    }).sort({ date: 1 }).limit(7);

    // Get weather (mock data for now)
    const weather = {
      temp: 28,
      condition: 'Partly Cloudy',
      humidity: 65,
      rainfall: 0,
      forecast: [
        { day: 'Today', temp: 28, condition: 'Sunny' },
        { day: 'Tomorrow', temp: 30, condition: 'Cloudy' },
        { day: 'Day 3', temp: 27, condition: 'Rainy' }
      ]
    };

    res.json({
      weather,
      priceTrend: priceTrend.map(p => ({
        date: p.date,
        price: p.price.modal,
        mandi: p.mandi.name
      })),
      summary: {
        avgPrice: priceTrend.reduce((sum, p) => sum + p.price.modal, 0) / priceTrend.length || 0,
        trend: 'up',
        change: 5.2
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
