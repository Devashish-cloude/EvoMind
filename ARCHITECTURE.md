# AGRICHAIN Architecture Documentation

## System Overview

AGRICHAIN is a full-stack MERN application designed to help Indian farmers make data-driven decisions about crop harvesting, market selection, and preservation strategies.

## Technology Stack

### Frontend
- **React 18**: UI framework
- **Tailwind CSS**: Styling (via CDN)
- **Chart.js**: Data visualization
- **React Router**: Navigation
- **Axios**: HTTP client
- **Lucide React**: Icons

### Backend
- **Node.js**: Runtime
- **Express**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM
- **JWT**: Authentication
- **Axios**: External API calls

## Project Structure

```
agrichain/
├── client/                    # React frontend
│   ├── public/
│   │   └── index.html        # HTML template
│   ├── src/
│   │   ├── pages/            # Page components
│   │   │   ├── Login.js      # OTP-based login
│   │   │   ├── Register.js   # User registration
│   │   │   ├── Dashboard.js  # Main dashboard
│   │   │   ├── Markets.js    # Market comparison
│   │   │   ├── SpoilageCalculator.js
│   │   │   └── Recommendations.js
│   │   ├── App.js            # Main app component
│   │   ├── index.js          # Entry point
│   │   └── index.css         # Global styles
│   └── package.json
│
├── server/                    # Express backend
│   ├── models/               # Mongoose schemas
│   │   ├── User.js           # User model
│   │   ├── MandiPrice.js     # Market price model
│   │   └── Recommendation.js # AI recommendation model
│   ├── routes/               # API routes
│   │   ├── auth.js           # Authentication
│   │   ├── dashboard.js      # Dashboard data
│   │   ├── recommendations.js # AI engine
│   │   ├── markets.js        # Market comparison
│   │   └── spoilage.js       # Risk calculator
│   ├── index.js              # Server entry point
│   └── seedData.js           # Database seeder
│
├── package.json              # Root dependencies
├── .env.example              # Environment template
├── README.md                 # Project overview
├── SETUP.md                  # Installation guide
└── ARCHITECTURE.md           # This file
```

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  phone: String (unique, indexed),
  location: {
    state: String,
    district: String,
    pincode: String
  },
  crops: [String],
  language: String (en/hi/mr),
  subscription: {
    type: String (free/premium),
    expiresAt: Date
  },
  otp: String (temporary),
  otpExpiry: Date,
  createdAt: Date
}
```

### MandiPrice Collection
```javascript
{
  _id: ObjectId,
  mandi: {
    name: String,
    state: String,
    district: String,
    location: { lat: Number, lng: Number }
  },
  crop: String (indexed),
  price: {
    min: Number,
    max: Number,
    modal: Number
  },
  unit: String (default: 'quintal'),
  demand: String (low/medium/high),
  date: Date (indexed)
}
```

### Recommendation Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  crop: String,
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
    level: String (low/medium/high),
    score: Number (0-100),
    factors: [String]
  },
  preservation: [{
    method: String,
    cost: Number,
    effectiveness: Number,
    rank: Number
  }],
  confidence: Number (0-100),
  factors: [{
    name: String,
    impact: Number,
    description: String
  }],
  reasoning: String,
  createdAt: Date
}
```

## API Architecture

### Authentication Flow
1. User enters phone number
2. Backend generates 6-digit OTP
3. OTP sent via SMS (Twilio) or logged (dev mode)
4. User enters OTP
5. Backend verifies and issues JWT token
6. Token stored in localStorage
7. Token sent in Authorization header for protected routes

### AI Recommendation Engine

**Input Parameters:**
- Crop type
- Soil condition
- Current growth stage
- Location (state/district)

**Processing Logic:**
1. Fetch historical mandi prices (last 30 days)
2. Get current weather data
3. Calculate demand score based on price trends
4. Determine optimal harvest timing
5. Rank markets by profit potential
6. Calculate spoilage risk
7. Generate preservation recommendations
8. Compute confidence score

**Output:**
- Harvest date (recommended + days from now)
- Best market (name, price, distance, profit)
- Spoilage risk (level, score, factors)
- Preservation methods (ranked by cost-effectiveness)
- Top influencing factors (with impact percentages)
- Reasoning explanation

### Spoilage Risk Algorithm

**Risk Score Calculation:**
```
Base Score = 0

Storage Type:
- Cold (2-4°C): +10
- Ventilated: +30
- Traditional: +60
- Open: +80

Transit Time:
- > 24 hours: +20
- 12-24 hours: +10
- < 12 hours: +0

Temperature:
- > 35°C: +25
- 30-35°C: +15
- < 30°C: +0

Humidity:
- > 80%: +15
- < 80%: +0

Final Score = min(Sum, 100)

Risk Level:
- 0-30: Low
- 31-60: Medium
- 61-100: High
```

## Frontend Architecture

### Component Hierarchy
```
App
├── Login
├── Register
├── Dashboard
│   ├── WeatherCard
│   ├── PriceTrendChart
│   └── QuickActions
├── Markets
│   └── MarketCard (multiple)
├── SpoilageCalculator
│   ├── InputForm
│   ├── RiskDisplay
│   └── PreservationMethods
└── Recommendations
    ├── InputForm
    ├── HarvestTiming
    ├── BestMarket
    ├── SpoilageRisk
    └── InfluencingFactors
```

### State Management
- **Local State**: useState for component-specific data
- **Context**: User authentication state
- **LocalStorage**: JWT token, user data persistence

### Routing
```
/ → Redirect to /dashboard or /login
/login → OTP-based authentication
/register → Complete user profile
/dashboard → Main dashboard (protected)
/markets → Market comparison (protected)
/spoilage → Risk calculator (protected)
/recommendations → AI insights (protected)
```

## Mobile-First Design

### Responsive Breakpoints
- Mobile: < 640px (default)
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Key Features
- Large touch targets (min 44x44px)
- Bottom navigation for easy thumb access
- Sticky headers for context
- Swipeable cards
- Voice input button
- Offline-ready (future PWA)

## Multi-Language Support

### Implementation
- Translation objects in components
- Language selector in header
- Stored in user profile
- Applied to all UI text
- Number/date formatting per locale

### Supported Languages
- English (en)
- Hindi (hi)
- Marathi (mr)

## Security Considerations

### Authentication
- OTP-based (no passwords)
- JWT with 30-day expiry
- Phone number validation
- Rate limiting on OTP requests

### Data Protection
- Input sanitization
- MongoDB injection prevention
- CORS configuration
- Environment variable secrets

### API Security
- JWT verification middleware
- Request validation
- Error message sanitization
- HTTPS in production

## Performance Optimization

### Frontend
- Code splitting (React.lazy)
- Image optimization
- Tailwind CSS purging
- Chart.js lazy loading
- LocalStorage caching

### Backend
- MongoDB indexing (crop, date, phone)
- Query optimization
- Response compression
- Connection pooling

## Scalability

### Horizontal Scaling
- Stateless API design
- JWT (no session storage)
- MongoDB replica sets
- Load balancer ready

### Caching Strategy
- Client-side: LocalStorage
- Server-side: Redis (future)
- CDN for static assets

## Monitoring & Analytics

### Metrics to Track
- User registrations
- Active users (DAU/MAU)
- Recommendation accuracy
- Market comparison usage
- API response times
- Error rates

### Tools (Future)
- Google Analytics
- Sentry (error tracking)
- MongoDB Atlas monitoring
- Custom analytics dashboard

## Monetization Architecture

### Free Tier
- Basic recommendations
- 7-day price trends
- Market comparison (top 5)
- Spoilage calculator

### Premium Tier (₹49/month)
- 30-day price predictions
- Unlimited market comparison
- Priority support
- Advanced analytics
- Export reports

### Commission Model
- Track mandi transactions
- Calculate 0.5% commission
- Payment gateway integration
- Invoice generation

## Future Enhancements

### Phase 2
- ML price prediction model
- Real-time mandi API integration
- Push notifications
- Offline mode (PWA)
- Voice assistant

### Phase 3
- Crop disease detection (image AI)
- Weather alerts
- Community forum
- Video tutorials
- Government scheme integration

### Phase 4
- Blockchain for supply chain
- Direct buyer-farmer marketplace
- Insurance integration
- Loan recommendations
- IoT sensor integration

## Development Workflow

### Local Development
```bash
npm run dev  # Both servers
npm run server  # Backend only
npm run client  # Frontend only
npm run seed  # Populate database
```

### Testing
- Manual testing in browser
- Postman for API testing
- MongoDB Compass for data inspection

### Deployment
- Backend: Railway/Render/Heroku
- Frontend: Vercel/Netlify
- Database: MongoDB Atlas
- CI/CD: GitHub Actions

## API Response Formats

### Success Response
```json
{
  "data": { ... },
  "message": "Success"
}
```

### Error Response
```json
{
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## Environment Configuration

### Development
- MongoDB: Local
- OTP: Console logging
- CORS: Localhost only
- Debug: Enabled

### Production
- MongoDB: Atlas
- OTP: Twilio SMS
- CORS: Specific domains
- Debug: Disabled
- HTTPS: Required

## Conclusion

AGRICHAIN is designed to be simple, scalable, and farmer-friendly. The architecture prioritizes mobile experience, regional language support, and actionable AI insights to empower Indian farmers with data-driven decision-making tools.
