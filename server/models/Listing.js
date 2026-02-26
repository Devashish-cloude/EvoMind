const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cropName: { type: String, required: true },
    quantityKg: { type: Number, required: true },
    expectedPrice: { type: Number, required: true },
    harvestDate: { type: Date, required: true },
    status: { type: String, enum: ['Active', 'Sold', 'Pending'], default: 'Active' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Listing', listingSchema);
