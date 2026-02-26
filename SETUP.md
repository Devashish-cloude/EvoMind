# AGRICHAIN Setup Guide

## Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Git

## Step-by-Step Installation

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### 2. Setup MongoDB

Option A: Local MongoDB
```bash
# Install MongoDB (macOS)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

Option B: MongoDB Atlas (Cloud)
- Go to https://www.mongodb.com/cloud/atlas
- Create free cluster
- Get connection string
- Use in .env file

### 3. Configure Environment

```bash
# Copy example env file
cp .env.example .env

# Edit .env with your values
nano .env
```

Required variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agrichain
JWT_SECRET=your_random_secret_key_here
```

Optional (for production):
```
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_number
WEATHER_API_KEY=your_openweather_key
```

### 4. Seed Database

```bash
# Populate with sample mandi data
npm run seed
```

Expected output:
```
📦 Connected to MongoDB
🗑️  Cleared existing data
✅ Seeded 98 price records
👋 Database connection closed
```

### 5. Start Application

Option A: Run both servers concurrently
```bash
npm run dev
```

Option B: Run separately
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

### 6. Access Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/api/health

## Testing the Application

### 1. Register/Login
- Phone: Any 10-digit number starting with 6-9
- OTP will be logged in console (development mode)

### 2. Test Features
- Dashboard: View weather and price trends
- AI Recommendations: Get harvest timing suggestions
- Market Comparison: Compare different mandis
- Spoilage Calculator: Calculate preservation needs

## API Endpoints

### Authentication
- POST `/api/auth/send-otp` - Send OTP to phone
- POST `/api/auth/verify-otp` - Verify OTP and login
- POST `/api/auth/register` - Complete registration

### Dashboard
- GET `/api/dashboard/:userId` - Get dashboard data

### Recommendations
- POST `/api/recommendations/generate` - Generate AI recommendation
- GET `/api/recommendations/:userId` - Get recommendation history

### Markets
- GET `/api/markets/compare` - Compare markets
- GET `/api/markets/:mandiName` - Get market details

### Spoilage
- POST `/api/spoilage/calculate` - Calculate spoilage risk

## Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
brew services list

# Restart MongoDB
brew services restart mongodb-community
```

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules client/node_modules
npm install
cd client && npm install
```

## Production Deployment

### Backend (Node.js)
- Deploy to: Heroku, Railway, Render, DigitalOcean
- Set environment variables
- Use MongoDB Atlas for database

### Frontend (React)
- Build: `cd client && npm run build`
- Deploy to: Vercel, Netlify, AWS S3
- Update API endpoint in production

### Environment Variables (Production)
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=strong_random_secret
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
WEATHER_API_KEY=...
```

## Monetization Setup

### Premium Features
1. Update User model subscription field
2. Add payment gateway (Razorpay/Stripe)
3. Implement subscription check middleware
4. Gate premium features in frontend

### Commission Tracking
1. Add transaction model
2. Track mandi sales
3. Calculate commission (0.5%)
4. Generate reports

## Next Steps

1. Integrate real weather API (OpenWeatherMap)
2. Connect to actual mandi price API (data.gov.in)
3. Implement SMS OTP (Twilio/MSG91)
4. Add ML price prediction model
5. Build admin dashboard
6. Add analytics tracking
7. Implement offline mode (PWA)
8. Add voice assistant (Web Speech API)

## Support

For issues or questions:
- Check logs: `npm run server` output
- MongoDB logs: `/usr/local/var/log/mongodb/`
- Browser console for frontend errors

## License
MIT
