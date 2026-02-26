import React, { useState, useEffect } from 'react'
import { Cloud, Sun, CloudRain, AlertTriangle, Droplets, Wind, Thermometer, Eye } from 'lucide-react'

const Weather = ({ user }) => {
  const [weatherData, setWeatherData] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState('Current Location')

  useEffect(() => {
    fetchWeatherData()
  }, [])

  const fetchWeatherData = () => {
    setTimeout(() => {
      setWeatherData({
        current: {
          temperature: 28,
          condition: 'Partly Cloudy',
          humidity: 65,
          windSpeed: 12,
          visibility: 10,
          pressure: 1013,
          uvIndex: 6,
          feelsLike: 32
        },
        forecast: [
          { day: 'Today', temp: 28, condition: 'Partly Cloudy', rain: 20, high: 32, low: 24 },
          { day: 'Tomorrow', temp: 30, condition: 'Sunny', rain: 5, high: 34, low: 26 },
          { day: 'Wed', temp: 26, condition: 'Rainy', rain: 80, high: 28, low: 22 },
          { day: 'Thu', temp: 25, condition: 'Cloudy', rain: 40, high: 27, low: 21 },
          { day: 'Fri', temp: 29, condition: 'Sunny', rain: 10, high: 33, low: 25 },
          { day: 'Sat', temp: 31, condition: 'Hot', rain: 0, high: 36, low: 27 },
          { day: 'Sun', temp: 27, condition: 'Partly Cloudy', rain: 30, high: 30, low: 23 }
        ],
        hourly: [
          { time: '12 PM', temp: 28, condition: 'Partly Cloudy', rain: 20 },
          { time: '1 PM', temp: 30, condition: 'Sunny', rain: 10 },
          { time: '2 PM', temp: 32, condition: 'Sunny', rain: 5 },
          { time: '3 PM', temp: 31, condition: 'Partly Cloudy', rain: 15 },
          { time: '4 PM', temp: 29, condition: 'Cloudy', rain: 25 },
          { time: '5 PM', temp: 27, condition: 'Cloudy', rain: 30 }
        ],
        alerts: [
          { type: 'warning', message: 'Heavy rain expected on Wednesday. Protect your crops!', severity: 'Medium' },
          { type: 'info', message: 'Perfect weather for harvesting this weekend.', severity: 'Low' }
        ],
        farmingTips: [
          'Good time for planting tomatoes - soil temperature is optimal',
          'Consider irrigation for crops due to low rainfall forecast',
          'Monitor crops closely during Wednesday\'s heavy rain'
        ]
      })
    }, 1000)
  }

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
      <div style={{ backgroundColor: '#F8F9FA', minHeight: '100vh', paddingTop: '24px' }}>
        <div className="container">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading weather data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#F8F9FA', minHeight: '100vh', paddingTop: '24px' }}>
      <div className="container">
        <div className="fade-in">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-green mb-2">🌤️ Weather Forecast</h1>
              <p className="text-gray-600">Complete weather information for farming decisions</p>
            </div>
            <select 
              className="input" 
              style={{ width: 'auto', minWidth: '200px' }}
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option>Current Location</option>
              <option>Pune, Maharashtra</option>
              <option>Nashik, Maharashtra</option>
              <option>Mumbai, Maharashtra</option>
            </select>
          </div>

          {/* Current Weather - Large Card */}
          <div className="card mb-6" style={{ background: 'linear-gradient(135deg, #E3F2FD 0%, #E8F5E8 100%)' }}>
            <div className="grid grid-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Current Weather</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-6xl">{getWeatherIcon(weatherData.current.condition)}</div>
                  <div>
                    <div className="text-5xl font-bold text-green">{weatherData.current.temperature}°C</div>
                    <div className="text-xl text-gray-600">{weatherData.current.condition}</div>
                    <div className="text-sm text-gray-500">Feels like {weatherData.current.feelsLike}°C</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Weather Details</h4>
                <div className="grid grid-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Droplets size={18} className="text-blue-500" />
                    <div>
                      <div className="text-sm text-gray-600">Humidity</div>
                      <div className="font-semibold">{weatherData.current.humidity}%</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind size={18} className="text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600">Wind Speed</div>
                      <div className="font-semibold">{weatherData.current.windSpeed} km/h</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye size={18} className="text-green-500" />
                    <div>
                      <div className="text-sm text-gray-600">Visibility</div>
                      <div className="font-semibold">{weatherData.current.visibility} km</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Thermometer size={18} className="text-red-500" />
                    <div>
                      <div className="text-sm text-gray-600">UV Index</div>
                      <div className="font-semibold">{weatherData.current.uvIndex}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hourly Forecast */}
          <div className="card mb-6">
            <h3 className="text-xl font-semibold mb-4">Hourly Forecast</h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {weatherData.hourly.map((hour, index) => (
                <div key={index} className="flex-shrink-0 text-center p-3 bg-gray-50 rounded-lg min-w-[100px]">
                  <div className="text-sm font-medium text-gray-600 mb-2">{hour.time}</div>
                  <div className="mb-2">{getWeatherIcon(hour.condition)}</div>
                  <div className="text-lg font-bold mb-1">{hour.temp}°</div>
                  <div 
                    className="text-xs px-2 py-1 rounded text-white"
                    style={{ backgroundColor: getRainColor(hour.rain) }}
                  >
                    {hour.rain}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div className="card mb-6">
            <h3 className="text-xl font-semibold mb-4">7-Day Forecast</h3>
            <div className="space-y-3">
              {weatherData.forecast.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-16 text-sm font-medium text-gray-600">{day.day}</div>
                    <div className="flex items-center gap-2">
                      {getWeatherIcon(day.condition)}
                      <span className="text-sm text-gray-600">{day.condition}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div 
                      className="text-xs px-2 py-1 rounded text-white min-w-[50px] text-center"
                      style={{ backgroundColor: getRainColor(day.rain) }}
                    >
                      {day.rain}%
                    </div>
                    <div className="text-right min-w-[80px]">
                      <span className="font-bold">{day.high}°</span>
                      <span className="text-gray-500 ml-1">{day.low}°</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weather Alerts */}
          {weatherData.alerts && weatherData.alerts.length > 0 && (
            <div className="card mb-6">
              <h3 className="text-xl font-semibold mb-4">Weather Alerts</h3>
              <div className="space-y-3">
                {weatherData.alerts.map((alert, index) => (
                  <div key={index} className={`alert alert-${alert.type}`}>
                    <div className="flex items-start gap-3">
                      <AlertTriangle size={20} />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <span>{alert.message}</span>
                          <span className="text-xs bg-white bg-opacity-50 px-2 py-1 rounded">
                            {alert.severity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Farming Tips */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">🌱 Farming Tips Based on Weather</h3>
            <div className="space-y-3">
              {weatherData.farmingTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="text-green-600 mt-1">💡</div>
                  <p className="text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather