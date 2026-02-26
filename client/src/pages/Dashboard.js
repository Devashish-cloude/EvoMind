import React from 'react';
import { Cloud, Sun, CloudRain, AlertTriangle, TrendingUp, IndianRupee, ShieldAlert, Sparkles, Droplets, Wind } from 'lucide-react';

const Dashboard = ({ user }) => {
  // Mock Data
  const weather = {
    temp: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    wind: 12,
    rainChance: 20,
    forecast: [
      { day: 'Mon', temp: 29, icon: <Sun size={24} color="#f59e0b" /> },
      { day: 'Tue', temp: 27, icon: <Cloud size={24} color="#6b7280" /> },
      { day: 'Wed', temp: 26, icon: <CloudRain size={24} color="#3b82f6" /> },
      { day: 'Thu', temp: 28, icon: <Sun size={24} color="#f59e0b" /> },
      { day: 'Fri', temp: 30, icon: <Sun size={24} color="#f59e0b" /> },
    ]
  };

  const recommendations = [
    {
      name: 'Tomato',
      price: '₹45/kg',
      profit: 'High',
      profitColor: 'badge-green',
      risk: 'Low',
      riskColor: 'badge-green',
      icon: '🍅'
    },
    {
      name: 'Onion',
      price: '₹22/kg',
      profit: 'Medium',
      profitColor: 'badge-yellow',
      risk: 'Medium',
      riskColor: 'badge-yellow',
      icon: '🧅'
    },
    {
      name: 'Cabbage',
      price: '₹12/kg',
      profit: 'Low',
      profitColor: 'badge-red',
      risk: 'High',
      riskColor: 'badge-red',
      icon: '🥬'
    }
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-primary mb-1">Hello, {user.name} 👋</h1>
          <p className="text-muted">Here's your smart agriculture overview for today.</p>
        </div>
        <div className="badge badge-green text-lg py-2 px-4 shadow-sm border border-green-200">
          Role: {user.role}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>

        {/* Weather Panel */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="flex items-center gap-2 m-0">
              <Cloud size={24} className="text-primary" />
              Weather Overview
            </h2>
            <div className="badge" style={{ backgroundColor: '#f3f4f6', color: '#374151' }}>Pune, MH</div>
          </div>

          <div className="flex items-center justify-center gap-6 mb-6 py-4 bg-green-50 rounded-xl" style={{ backgroundColor: '#f0fdf4', borderRadius: '12px' }}>
            <Sun size={64} color="#f59e0b" />
            <div>
              <div style={{ fontSize: '3rem', fontWeight: '700', lineHeight: 1, color: 'var(--text-main)' }}>
                {weather.temp}°C
              </div>
              <div className="text-muted font-medium mt-1">{weather.condition}</div>
            </div>
          </div>

          <div className="flex justify-between mb-6 pb-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex items-center gap-2 text-muted">
              <Droplets size={18} />
              <span>{weather.humidity}% Humidity</span>
            </div>
            <div className="flex items-center gap-2 text-muted">
              <Wind size={18} />
              <span>{weather.wind} km/h Wind</span>
            </div>
            <div className="flex items-center gap-2 text-muted">
              <CloudRain size={18} />
              <span>{weather.rainChance}% Rain</span>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-muted text-sm uppercase tracking-wider">5-Day Forecast</h4>
            <div className="flex justify-between">
              {weather.forecast.map((day, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <span className="font-medium text-sm">{day.day}</span>
                  {day.icon}
                  <span className="font-bold">{day.temp}°</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg flex items-start gap-3" style={{ backgroundColor: '#fffbeb', border: '1px solid #fde047' }}>
            <AlertTriangle color="#d97706" size={24} style={{ flexShrink: 0 }} />
            <p className="m-0 text-sm" style={{ color: '#92400e' }}>
              <strong>Weather Alert:</strong> Expected light showers in the next 48 hours. Good time for natural irrigation.
            </p>
          </div>
        </div>

        {/* Smart Crop Recommendation Panel */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="flex items-center gap-2 m-0">
              <Sparkles size={24} className="text-primary" />
              Smart Recommendations
            </h2>
          </div>

          <div className="mb-6 p-5 rounded-xl text-white" style={{ background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)' }}>
            <p className="m-0 text-lg font-medium leading-relaxed">
              "Based on recent weather trends and high market demand in your area, growing <strong style={{ color: '#fffb00' }}>Tomato</strong> can give you higher profit margins this season."
            </p>
          </div>

          <h4 className="mb-4 text-muted">Crop Profitability Forecast</h4>
          <div className="flex flex-col gap-4">
            {recommendations.map((crop, idx) => (
              <div key={idx} className="p-4 border rounded-xl flex items-center justify-between hover:border-green-500 transition-colors" style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex items-center gap-4">
                  <div style={{ fontSize: '2.5rem' }}>{crop.icon}</div>
                  <div>
                    <h3 className="m-0">{crop.name}</h3>
                    <div className="flex items-center gap-1 text-muted text-sm mt-1">
                      <IndianRupee size={14} /> Expected: {crop.price}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted w-12 text-right">Profit</span>
                    <span className={`badge ${crop.profitColor} w-20 justify-center`}>{crop.profit}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted w-12 text-right">Risk</span>
                    <span className={`badge ${crop.riskColor} w-20 justify-center`}>{crop.risk}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
