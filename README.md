# AgriConnect - Smart Farmer Retail Network

A modern, responsive web application that helps farmers decide which crops to grow based on weather and profit predictions, and directly connects them with retailers for business.

## 🌟 Features

### For Farmers
- **Smart Crop Recommendations**: AI-powered suggestions based on weather and market trends
- **Weather Dashboard**: 7-day forecast with alerts and farming insights
- **Crop Listings**: Create and manage crop listings with pricing
- **Business Requests**: Receive and manage retailer inquiries
- **Verified Badge System**: Build trust with verification status

### For Retailers
- **Browse Farmers**: Find fresh produce from local farmers
- **Advanced Filtering**: Search by crop, location, and price range
- **Distance-based Matching**: Find nearby farmers
- **Direct Communication**: Send business requests and chat
- **Rating System**: View farmer ratings and reviews

### Smart Features
- **Weather Integration**: Real-time weather data and forecasts
- **Profit Prediction**: Market price analysis and profit calculations
- **Risk Assessment**: Crop risk indicators based on weather patterns
- **Mobile-first Design**: Optimized for smartphones and tablets
- **Simple English Interface**: Easy to use for all literacy levels

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd agriconnect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Start the backend server** (in a new terminal)
   ```bash
   npm run server
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
agriconnect/
├── src/
│   ├── components/
│   │   ├── Login.jsx          # Authentication page
│   │   ├── Dashboard.jsx      # Main dashboard
│   │   ├── WeatherPanel.jsx   # Weather information
│   │   ├── CropRecommendation.jsx # AI crop suggestions
│   │   ├── Connect.jsx        # Farmer-retailer connection
│   │   └── Navbar.jsx         # Navigation component
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles
├── server/
│   └── index.js              # Express backend server
├── database-schema.md        # Database documentation
└── package.json
```

## 🎨 Design System

### Colors
- **Primary Green**: #2E7D32 (main brand color)
- **Light Green**: #81C784 (accents and secondary buttons)
- **Background**: #FFFFFF (clean white background)
- **Alerts**: Yellow (#F57C00) and Red (#D32F2F) only for warnings/errors

### Typography
- Large, readable fonts optimized for mobile
- Simple English language for accessibility
- Clear hierarchy with proper contrast

### Components
- Modern card-based design
- Smooth animations and transitions
- Responsive grid layouts
- Touch-friendly buttons and inputs

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login/registration

### Weather
- `GET /api/weather/:location` - Get weather data for location

### Crops
- `GET /api/crops` - Get crop listings
- `POST /api/crops` - Create new crop listing
- `GET /api/crops/recommendations` - Get AI crop recommendations

### Business Requests
- `POST /api/business-requests` - Send business request
- `GET /api/business-requests/:userId` - Get user's business requests

## 📱 Mobile Optimization

- **Mobile-first responsive design**
- **Touch-friendly interface**
- **Optimized for slow internet connections**
- **Offline-capable features** (planned)
- **PWA support** (planned)

## 🔒 Security Features

- **Input validation and sanitization**
- **SQL injection prevention**
- **XSS protection**
- **Rate limiting** (planned)
- **JWT authentication** (planned)

## 🚀 Deployment

### Frontend (Vite)
```bash
npm run build
# Deploy the 'dist' folder to your hosting service
```

### Backend (Node.js)
```bash
# Set environment variables
export PORT=5000
export NODE_ENV=production

# Start the server
npm run server
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Lucide React** - Icon library
- **CSS3** - Styling with custom properties

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite3** - Database
- **CORS** - Cross-origin resource sharing

## 📊 Database Schema

See [database-schema.md](./database-schema.md) for detailed database structure.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Weather data integration
- Agricultural market research
- UI/UX design inspiration
- Open source community

---

**AgriConnect** - Connecting farmers and retailers for a sustainable future 🌱