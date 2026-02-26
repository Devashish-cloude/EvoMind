const express = require('express')
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Initialize SQLite database
const db = new sqlite3.Database('./agriconnect.db')

// Create tables
db.serialize(() => {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    mobile TEXT UNIQUE,
    role TEXT NOT NULL CHECK(role IN ('farmer', 'retailer')),
    location TEXT,
    verified BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

  // Crops table
  db.run(`CREATE TABLE IF NOT EXISTS crops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    farmer_id INTEGER,
    crop_name TEXT NOT NULL,
    quantity TEXT NOT NULL,
    price REAL NOT NULL,
    harvest_date DATE,
    description TEXT,
    status TEXT DEFAULT 'active' CHECK(status IN ('active', 'sold', 'expired')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmer_id) REFERENCES users (id)
  )`)

  // Business requests table
  db.run(`CREATE TABLE IF NOT EXISTS business_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    crop_id INTEGER,
    retailer_id INTEGER,
    farmer_id INTEGER,
    message TEXT,
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'accepted', 'rejected')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (crop_id) REFERENCES crops (id),
    FOREIGN KEY (retailer_id) REFERENCES users (id),
    FOREIGN KEY (farmer_id) REFERENCES users (id)
  )`)

  // Weather data table (for caching)
  db.run(`CREATE TABLE IF NOT EXISTS weather_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    location TEXT NOT NULL,
    temperature REAL,
    condition TEXT,
    humidity REAL,
    wind_speed REAL,
    forecast_data TEXT, -- JSON string
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)
})

// API Routes

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { mobile, email, role } = req.body
  
  // Simple mock authentication
  const userData = {
    id: Date.now(),
    name: role === 'farmer' ? 'Farmer User' : 'Retailer User',
    email: email || null,
    mobile: mobile || null,
    role: role,
    location: 'Sample Location',
    verified: true
  }
  
  res.json({ success: true, user: userData })
})

// Weather routes
app.get('/api/weather/:location', (req, res) => {
  const { location } = req.params
  
  // Mock weather data
  const weatherData = {
    current: {
      temperature: 28,
      condition: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 12
    },
    forecast: [
      { day: 'Today', temp: 28, condition: 'Partly Cloudy', rain: 20 },
      { day: 'Tomorrow', temp: 30, condition: 'Sunny', rain: 5 },
      { day: 'Wed', temp: 26, condition: 'Rainy', rain: 80 },
      { day: 'Thu', temp: 25, condition: 'Cloudy', rain: 40 },
      { day: 'Fri', temp: 29, condition: 'Sunny', rain: 10 },
      { day: 'Sat', temp: 31, condition: 'Hot', rain: 0 },
      { day: 'Sun', temp: 27, condition: 'Partly Cloudy', rain: 30 }
    ],
    alerts: [
      { type: 'warning', message: 'Heavy rain expected on Wednesday. Protect your crops!' }
    ]
  }
  
  res.json(weatherData)
})

// Crop recommendation routes
app.get('/api/crops/recommendations', (req, res) => {
  const recommendations = [
    {
      id: 1,
      name: 'Tomato',
      expectedPrice: 45,
      profitLevel: 'High',
      risk: 'Low',
      season: 'Current',
      growthTime: '90 days',
      recommendation: 'Excellent choice! High demand and good weather conditions.'
    },
    {
      id: 2,
      name: 'Onion',
      expectedPrice: 35,
      profitLevel: 'Medium',
      risk: 'Medium',
      season: 'Current',
      growthTime: '120 days',
      recommendation: 'Good option with stable market prices.'
    },
    {
      id: 3,
      name: 'Wheat',
      expectedPrice: 25,
      profitLevel: 'Medium',
      risk: 'Low',
      season: 'Next',
      growthTime: '150 days',
      recommendation: 'Safe choice with government support.'
    },
    {
      id: 4,
      name: 'Cotton',
      expectedPrice: 55,
      profitLevel: 'High',
      risk: 'High',
      season: 'Current',
      growthTime: '180 days',
      recommendation: 'High profit but weather dependent. Monitor closely.'
    }
  ]
  
  res.json(recommendations)
})

// Crop listings routes
app.get('/api/crops', (req, res) => {
  const { role, userId } = req.query
  
  if (role === 'farmer') {
    // Return farmer's own listings
    db.all(
      'SELECT * FROM crops WHERE farmer_id = ? ORDER BY created_at DESC',
      [userId],
      (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message })
          return
        }
        res.json(rows)
      }
    )
  } else {
    // Return all active listings for retailers
    const mockListings = [
      {
        id: 1,
        farmer: 'Raj Kumar',
        crop: 'Tomato',
        quantity: '500 kg',
        price: 45,
        location: 'Pune, Maharashtra',
        distance: '5 km',
        harvestDate: '2024-03-15',
        verified: true,
        rating: 4.8,
        description: 'Fresh organic tomatoes, pesticide-free'
      },
      {
        id: 2,
        farmer: 'Priya Singh',
        crop: 'Onion',
        quantity: '200 kg',
        price: 35,
        location: 'Nashik, Maharashtra',
        distance: '8 km',
        harvestDate: '2024-03-20',
        verified: true,
        rating: 4.6,
        description: 'Premium quality red onions'
      }
    ]
    res.json(mockListings)
  }
})

app.post('/api/crops', (req, res) => {
  const { farmer_id, crop_name, quantity, price, harvest_date, description } = req.body
  
  db.run(
    'INSERT INTO crops (farmer_id, crop_name, quantity, price, harvest_date, description) VALUES (?, ?, ?, ?, ?, ?)',
    [farmer_id, crop_name, quantity, price, harvest_date, description],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message })
        return
      }
      res.json({ id: this.lastID, message: 'Crop listing created successfully' })
    }
  )
})

// Business request routes
app.post('/api/business-requests', (req, res) => {
  const { crop_id, retailer_id, farmer_id, message } = req.body
  
  db.run(
    'INSERT INTO business_requests (crop_id, retailer_id, farmer_id, message) VALUES (?, ?, ?, ?)',
    [crop_id, retailer_id, farmer_id, message],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message })
        return
      }
      res.json({ id: this.lastID, message: 'Business request sent successfully' })
    }
  )
})

app.get('/api/business-requests/:userId', (req, res) => {
  const { userId } = req.params
  const { role } = req.query
  
  let query = ''
  if (role === 'farmer') {
    query = `
      SELECT br.*, c.crop_name, c.quantity, c.price, u.name as retailer_name
      FROM business_requests br
      JOIN crops c ON br.crop_id = c.id
      JOIN users u ON br.retailer_id = u.id
      WHERE br.farmer_id = ?
      ORDER BY br.created_at DESC
    `
  } else {
    query = `
      SELECT br.*, c.crop_name, c.quantity, c.price, u.name as farmer_name
      FROM business_requests br
      JOIN crops c ON br.crop_id = c.id
      JOIN users u ON br.farmer_id = u.id
      WHERE br.retailer_id = ?
      ORDER BY br.created_at DESC
    `
  }
  
  db.all(query, [userId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json(rows)
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`AgriConnect server running on port ${PORT}`)
})