import React from 'react'
import { Cloud, Sun, CloudRain, AlertTriangle, Droplets, Wind } from 'lucide-react'

const WeatherPanel = ({ weatherData }) => {
  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'hot':
        return <Sun size={24} className="text-yellow-500" />
      case 'rainy':
        return <CloudRain size={24} className="text-blue-500" />
      case 'cloudy':
      case 'partly cloudy':
        return <Cloud size={24} className="text-gray-500" />
      default:
        return <Sun size={24} className="text-yellow-500" />
    }
  }

  const getRainColor = (rainChance) => {
    if (rainChance > 70) return '#3B82F6'
    if (rainChance > 40) return '#F59E0B'
    return '#10B981'
  }

  if (!weatherData) {
    return (
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">🌤️ Weather Forecast</h3>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading weather data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4">🌤️ Weather Forecast</h3>
      
      {/* Current Weather */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-green">{weatherData.current.temperature}°C</div>
            <div className="text-gray-600">{weatherData.current.condition}</div>
          </div>
          <div className="text-right">
            {getWeatherIcon(weatherData.current.condition)}
            <div className="text-sm text-gray-600 mt-2">
              <div className="flex items-center gap-1">
                <Droplets size={14} />
                {weatherData.current.humidity}%
              </div>
              <div className="flex items-center gap-1">
                <Wind size={14} />
                {weatherData.current.windSpeed} km/h
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="mb-4">
        <h4 className="font-semibold mb-3">7-Day Forecast</h4>
        <div className="grid grid-cols-7 gap-2">
          {weatherData.forecast.map((day, index) => (
            <div key={index} className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="text-xs font-medium text-gray-600 mb-1">{day.day}</div>
              <div className="mb-2">{getWeatherIcon(day.condition)}</div>
              <div className="text-sm font-bold">{day.temp}°</div>
              <div 
                className="text-xs mt-1 px-1 py-0.5 rounded text-white"
                style={{ backgroundColor: getRainColor(day.rain) }}
              >
                {day.rain}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weather Alerts */}
      {weatherData.alerts && weatherData.alerts.length > 0 && (
        <div>
          {weatherData.alerts.map((alert, index) => (
            <div key={index} className={`alert alert-${alert.type}`}>
              <div className="flex items-center gap-2">
                <AlertTriangle size={18} />
                <span>{alert.message}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default WeatherPanel