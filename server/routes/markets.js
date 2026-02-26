const express = require('express');
const router = express.Router();
const MandiPrice = require('../models/MandiPrice');

// Compare markets
router.get('/compare', async (req, res) => {
  try {
    const { crop, state, userLat, userLng } = req.query;

    const markets = await MandiPrice.find({ 
      crop, 
      'mandi.state': state 
    }).sort({ date: -1 });

    // Group by mandi and get latest price
    const marketMap = {};
    markets.forEach(m => {
      if (!marketMap[m.mandi.name]) {
        marketMap[m.mandi.name] = m;
      }
    });

    const comparison = Object.values(marketMap).map(m => {
      // Calculate distance (mock)
      const distance = Math.floor(Math.random() * 100) + 10;
      const transportCost = distance * 5;
      const profit = (m.price.modal * 10) - transportCost - 500; // 10 quintals

      return {
        mandi: m.mandi.name,
        district: m.mandi.district,
        price: m.price.modal,
        demand: m.demand,
        distance,
        transportCost,
        profit,
        rating: m.demand === 'high' ? 4.5 : m.demand === 'medium' ? 3.5 : 2.5
      };
    }).sort((a, b) => b.profit - a.profit);

    res.json(comparison);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get market details
router.get('/:mandiName', async (req, res) => {
  try {
    const { mandiName } = req.params;
    const { crop } = req.query;

    const prices = await MandiPrice.find({ 
      'mandi.name': mandiName,
      crop
    }).sort({ date: -1 }).limit(30);

    res.json({
      mandi: prices[0]?.mandi,
      currentPrice: prices[0]?.price,
      priceHistory: prices.map(p => ({
        date: p.date,
        price: p.price.modal
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
