const express = require('express');
const router = express.Router();
const Recommendation = require('../models/Recommendation');
const MandiPrice = require('../models/MandiPrice');

// AI Recommendation Engine
router.post('/generate', async (req, res) => {
  try {
    const { userId, crop, soilCondition, currentStage, state, district } = req.body;

    // Get market data
    const markets = await MandiPrice.find({ 
      crop, 
      'mandi.state': state 
    }).sort({ 'price.modal': -1 }).limit(5);

    // AI Logic (simplified)
    const weatherScore = 0.8; // Mock: Good weather
    const priceScore = 0.9; // Mock: High prices
    const demandScore = 0.85; // Mock: Good demand
    
    const confidence = Math.round((weatherScore + priceScore + demandScore) / 3 * 100);
    
    // Calculate harvest timing
    const daysToHarvest = soilCondition === 'good' ? 5 : 7;
    const harvestDate = new Date();
    harvestDate.setDate(harvestDate.getDate() + daysToHarvest);

    // Best market
    const bestMarket = markets[0];
    
    // Spoilage risk
    const spoilageRisk = {
      level: daysToHarvest <= 5 ? 'low' : 'medium',
      score: daysToHarvest <= 5 ? 25 : 55,
      factors: ['Temperature', 'Transit time', 'Storage type']
    };

    // Preservation methods
    const preservation = [
      { method: 'Cold Storage', cost: 500, effectiveness: 95, rank: 1 },
      { method: 'Ventilated Storage', cost: 150, effectiveness: 70, rank: 2 },
      { method: 'Traditional Storage', cost: 50, effectiveness: 45, rank: 3 }
    ];

    // Top factors
    const factors = [
      { name: 'Market Price', impact: 35, description: 'Current prices are 12% above average' },
      { name: 'Weather Conditions', impact: 30, description: 'Favorable weather for next 5 days' },
      { name: 'Demand', impact: 25, description: 'High demand in nearby mandis' },
      { name: 'Soil Moisture', impact: 10, description: 'Optimal moisture level' }
    ];

    const recommendation = new Recommendation({
      userId,
      crop,
      harvestDate: {
        recommended: harvestDate,
        daysFromNow: daysToHarvest
      },
      market: {
        name: bestMarket.mandi.name,
        price: bestMarket.price.modal,
        distance: 45,
        profit: bestMarket.price.modal * 0.85
      },
      spoilageRisk,
      preservation,
      confidence,
      factors,
      reasoning: `Based on current market analysis, harvest your ${crop} in ${daysToHarvest} days. ${bestMarket.mandi.name} offers the best price at ₹${bestMarket.price.modal}/quintal. Weather conditions are favorable with ${spoilageRisk.level} spoilage risk.`
    });

    await recommendation.save();

    res.json(recommendation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get recommendation history
router.get('/:userId', async (req, res) => {
  try {
    const recommendations = await Recommendation.find({ 
      userId: req.params.userId 
    }).sort({ createdAt: -1 }).limit(10);
    
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
