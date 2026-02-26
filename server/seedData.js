const mongoose = require('mongoose');
const MandiPrice = require('./models/MandiPrice');
require('dotenv').config();

const sampleData = [
  // Maharashtra - Tomato
  { mandi: { name: 'Pune APMC', state: 'Maharashtra', district: 'Pune', location: { lat: 18.5204, lng: 73.8567 } }, crop: 'Tomato', price: { min: 2200, max: 2600, modal: 2450 }, demand: 'high' },
  { mandi: { name: 'Mumbai Vashi', state: 'Maharashtra', district: 'Mumbai', location: { lat: 19.0760, lng: 72.8777 } }, crop: 'Tomato', price: { min: 2400, max: 2800, modal: 2650 }, demand: 'high' },
  { mandi: { name: 'Nashik APMC', state: 'Maharashtra', district: 'Nashik', location: { lat: 19.9975, lng: 73.7898 } }, crop: 'Tomato', price: { min: 2000, max: 2400, modal: 2250 }, demand: 'medium' },
  
  // Maharashtra - Onion
  { mandi: { name: 'Pune APMC', state: 'Maharashtra', district: 'Pune' }, crop: 'Onion', price: { min: 1800, max: 2200, modal: 2000 }, demand: 'high' },
  { mandi: { name: 'Nashik APMC', state: 'Maharashtra', district: 'Nashik' }, crop: 'Onion', price: { min: 1900, max: 2300, modal: 2100 }, demand: 'high' },
  { mandi: { name: 'Lasalgaon', state: 'Maharashtra', district: 'Nashik' }, crop: 'Onion', price: { min: 2000, max: 2400, modal: 2200 }, demand: 'high' },
  
  // Karnataka - Tomato
  { mandi: { name: 'Bangalore KR Market', state: 'Karnataka', district: 'Bangalore', location: { lat: 12.9716, lng: 77.5946 } }, crop: 'Tomato', price: { min: 2300, max: 2700, modal: 2500 }, demand: 'high' },
  { mandi: { name: 'Mysore APMC', state: 'Karnataka', district: 'Mysore' }, crop: 'Tomato', price: { min: 2100, max: 2500, modal: 2300 }, demand: 'medium' },
  
  // Gujarat - Cotton
  { mandi: { name: 'Rajkot APMC', state: 'Gujarat', district: 'Rajkot' }, crop: 'Cotton', price: { min: 5800, max: 6200, modal: 6000 }, demand: 'high' },
  { mandi: { name: 'Ahmedabad APMC', state: 'Gujarat', district: 'Ahmedabad' }, crop: 'Cotton', price: { min: 5700, max: 6100, modal: 5900 }, demand: 'medium' },
  
  // Punjab - Wheat
  { mandi: { name: 'Ludhiana Mandi', state: 'Punjab', district: 'Ludhiana' }, crop: 'Wheat', price: { min: 2100, max: 2300, modal: 2200 }, demand: 'high' },
  { mandi: { name: 'Amritsar Mandi', state: 'Punjab', district: 'Amritsar' }, crop: 'Wheat', price: { min: 2050, max: 2250, modal: 2150 }, demand: 'medium' },
  
  // Uttar Pradesh - Potato
  { mandi: { name: 'Agra Mandi', state: 'Uttar Pradesh', district: 'Agra' }, crop: 'Potato', price: { min: 1200, max: 1600, modal: 1400 }, demand: 'high' },
  { mandi: { name: 'Kanpur Mandi', state: 'Uttar Pradesh', district: 'Kanpur' }, crop: 'Potato', price: { min: 1100, max: 1500, modal: 1300 }, demand: 'medium' }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/agrichain');
    console.log('📦 Connected to MongoDB');

    await MandiPrice.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create data for last 7 days
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date);
    }

    const allData = [];
    dates.forEach((date, index) => {
      sampleData.forEach(item => {
        const priceVariation = 1 + (Math.random() * 0.1 - 0.05); // ±5% variation
        allData.push({
          ...item,
          price: {
            min: Math.round(item.price.min * priceVariation),
            max: Math.round(item.price.max * priceVariation),
            modal: Math.round(item.price.modal * priceVariation)
          },
          date
        });
      });
    });

    await MandiPrice.insertMany(allData);
    console.log(`✅ Seeded ${allData.length} price records`);
    
    mongoose.connection.close();
    console.log('👋 Database connection closed');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seedDatabase();
