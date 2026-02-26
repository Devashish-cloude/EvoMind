const express = require('express');
const router = express.Router();

// Calculate spoilage risk
router.post('/calculate', async (req, res) => {
  try {
    const { crop, storageType, transitTime, temperature, humidity } = req.body;

    // Risk calculation logic
    let riskScore = 0;
    const factors = [];

    // Storage type impact
    const storageRisk = {
      'cold': 10,
      'ventilated': 30,
      'traditional': 60,
      'open': 80
    };
    riskScore += storageRisk[storageType] || 50;
    factors.push(`Storage: ${storageType} (+${storageRisk[storageType]})`);

    // Transit time impact
    if (transitTime > 24) riskScore += 20;
    else if (transitTime > 12) riskScore += 10;
    factors.push(`Transit: ${transitTime}hrs (+${transitTime > 24 ? 20 : transitTime > 12 ? 10 : 0})`);

    // Temperature impact
    if (temperature > 35) riskScore += 25;
    else if (temperature > 30) riskScore += 15;
    factors.push(`Temperature: ${temperature}°C (+${temperature > 35 ? 25 : temperature > 30 ? 15 : 0})`);

    // Humidity impact
    if (humidity > 80) riskScore += 15;
    factors.push(`Humidity: ${humidity}% (+${humidity > 80 ? 15 : 0})`);

    riskScore = Math.min(riskScore, 100);

    const level = riskScore < 30 ? 'low' : riskScore < 60 ? 'medium' : 'high';

    // Preservation recommendations
    const methods = [
      { 
        method: 'Cold Storage (2-4°C)', 
        cost: 500, 
        effectiveness: 95, 
        duration: '30 days',
        rank: 1 
      },
      { 
        method: 'Controlled Atmosphere Storage', 
        cost: 800, 
        effectiveness: 98, 
        duration: '45 days',
        rank: 2 
      },
      { 
        method: 'Ventilated Warehouse', 
        cost: 150, 
        effectiveness: 70, 
        duration: '10 days',
        rank: 3 
      },
      { 
        method: 'Evaporative Cooling', 
        cost: 200, 
        effectiveness: 75, 
        duration: '15 days',
        rank: 4 
      },
      { 
        method: 'Traditional Storage', 
        cost: 50, 
        effectiveness: 45, 
        duration: '5 days',
        rank: 5 
      }
    ].sort((a, b) => {
      const scoreA = a.effectiveness / a.cost;
      const scoreB = b.effectiveness / b.cost;
      return scoreB - scoreA;
    });

    const actions = [];
    if (level === 'high') {
      actions.push('Use cold storage immediately');
      actions.push('Reduce transit time to < 12 hours');
      actions.push('Harvest during cooler hours');
    } else if (level === 'medium') {
      actions.push('Use ventilated storage');
      actions.push('Transport during night');
    } else {
      actions.push('Standard storage is sufficient');
      actions.push('Monitor temperature daily');
    }

    res.json({
      riskScore,
      level,
      factors,
      methods,
      actions,
      estimatedLoss: level === 'high' ? '30-50%' : level === 'medium' ? '10-25%' : '< 5%'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
