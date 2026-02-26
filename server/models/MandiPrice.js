const mongoose = require('mongoose');

const mandiPriceSchema = new mongoose.Schema({
  mandi: {
    name: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    location: {
      lat: Number,
      lng: Number
    }
  },
  crop: {
    type: String,
    required: true
  },
  price: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    modal: { type: Number, required: true }
  },
  unit: {
    type: String,
    default: 'quintal'
  },
  demand: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mandiPriceSchema.index({ crop: 1, date: -1 });
mandiPriceSchema.index({ 'mandi.name': 1, crop: 1 });

module.exports = mongoose.model('MandiPrice', mandiPriceSchema);
