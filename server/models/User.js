const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ['Farmer', 'Retailer'], required: true },
  mobileOrEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String },
  isVerified: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
