const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  crop: {
    type: String,
    required: true
  },
  harvestDate: {
    recommended: Date,
    daysFromNow: Number
  },
  market: {
    name: String,
    price: Number,
    distance: Number,
    profit: Number
  },
  spoilageRisk: {
    level: {
      type: String,
      enum: ['low', 'medium', 'high']
    },
    score: Number,
    factors: [String]
  },
  preservation: [{
    method: String,
    cost: Number,
    effectiveness: Number,
    rank: Number
  }],
  confidence: {
    type: Number,
    min: 0,
    max: 100
  },
  factors: [{
    name: String,
    impact: Number,
    description: String
  }],
  reasoning: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recommendation', recommendationSchema);
