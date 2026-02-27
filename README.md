# AGRICHAIN – Farm-to-Market Intelligence Platform

A full-stack platform helping Indian farmers make data-driven decisions about harvesting, selling, and preserving crops.

## Features
- 🌾 AI-powered harvest recommendations
- 📊 Real-time mandi price tracking
- ⚠️ Spoilage risk calculator
- 🗺️ Market comparison & route optimization
- 📱 Mobile-first responsive design

## Tech Stack
- Frontend: React + Tailwind CSS + Chart.js
- Backend: Node.js + Express
- Database: MongoDB
- Authentication: OTP-based

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB
- npm or yarn

### Installation

1. Clone and install dependencies:
```bash
npm install
cd client && npm install
cd ..
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your MongoDB URI and API keys
```

3. Start MongoDB:
```bash
mongod
```

4. Run the application:
```bash
# Backend (port 5000)
npm run server

# Frontend (port 3000)
npm run client

# Both concurrently
npm run dev
```

## Project Structure
```
agrichain/
├── client/              # React frontend
├── server/              # Express backend
├── models/              # MongoDB schemas
├── routes/              # API routes
├── controllers/         # Business logic
├── utils/               # Helper functions
└── data/                # Sample datasets
```

## Monetization Model
- Free tier: Basic recommendations
- Premium (₹49/month): Advanced analytics, price predictions
- Commission: 0.5% from mandi transactions

## License
MIT
