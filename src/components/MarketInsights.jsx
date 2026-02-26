import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, BarChart3, PieChart, Calendar, MapPin, DollarSign, Package, AlertTriangle, Info } from 'lucide-react'

const MarketInsights = ({ user }) => {
  const [marketData, setMarketData] = useState(null)
  const [selectedTimeframe, setSelectedTimeframe] = useState('month')
  const [selectedRegion, setSelectedRegion] = useState('all')

  useEffect(() => {
    fetchMarketData()
  }, [selectedTimeframe, selectedRegion])

  const fetchMarketData = () => {
    setTimeout(() => {
      setMarketData({
        overview: {
          totalMarketValue: 2450000,
          activeTraders: 1250,
          dailyTransactions: 340,
          averagePrice: 42,
          priceChange: +15,
          volumeChange: +8,
          demandChange: +12
        },
        pricetrends: [
          { crop: 'Tomato', currentPrice: 45, change: +18, volume: 2500, demand: 'Very High' },
          { crop: 'Onion', currentPrice: 35, change: +12, volume: 1800, demand: 'High' },
          { crop: 'Potato', currentPrice: 20, change: -5, volume: 3200, demand: 'Medium' },
          { crop: 'Wheat', currentPrice: 25, change: +8, volume: 4500, demand: 'High' },
          { crop: 'Rice', currentPrice: 30, change: +3, volume: 3800, demand: 'Very High' },
          { crop: 'Cotton', currentPrice: 55, change: +25, volume: 1200, demand: 'High' }
        ],
        regionalData: [
          { region: 'Maharashtra', avgPrice: 38, volume: 15000, growth: +12 },
          { region: 'Punjab', avgPrice: 32, volume: 12000, growth: +8 },
          { region: 'Uttar Pradesh', avgPrice: 35, volume: 18000, growth: +15 },
          { region: 'Gujarat', avgPrice: 40, volume: 10000, growth: +10 },
          { region: 'Karnataka', avgPrice: 42, volume: 8000, growth: +18 }
        ],
        seasonalTrends: [
          { month: 'Jan', price: 32, volume: 2800, demand: 85 },
          { month: 'Feb', price: 35, volume: 3200, demand: 88 },
          { month: 'Mar', price: 38, volume: 3600, demand: 92 },
          { month: 'Apr', price: 42, volume: 4200, demand: 95 },
          { month: 'May', price: 45, volume: 4800, demand: 98 },
          { month: 'Jun', price: 43, volume: 4500, demand: 94 }
        ],
        marketAlerts: [
          {
            type: 'price-surge',
            title: 'Tomato Prices Surge',
            message: 'Tomato prices increased by 18% due to supply shortage',
            severity: 'high',
            impact: 'Positive for farmers, challenging for retailers'
          },
          {
            type: 'demand-increase',
            title: 'Cotton Demand Rising',
            message: 'Export demand for cotton increased significantly',
            severity: 'medium',
            impact: 'Good opportunity for cotton farmers'
          },
          {
            type: 'weather-impact',
            title: 'Weather Alert',
            message: 'Upcoming rains may affect vegetable prices',
            severity: 'medium',
            impact: 'Monitor crop protection measures'
          }
        ],
        predictions: [
          {
            crop: 'Tomato',
            nextWeek: { price: 48, confidence: 85, trend: 'up' },
            nextMonth: { price: 52, confidence: 72, trend: 'up' }
          },
          {
            crop: 'Onion',
            nextWeek: { price: 37, confidence: 90, trend: 'up' },
            nextMonth: { price: 40, confidence: 78, trend: 'up' }
          },
          {
            crop: 'Wheat',
            nextWeek: { price: 26, confidence: 88, trend: 'stable' },
            nextMonth: { price: 27, confidence: 82, trend: 'up' }
          }
        ],
        insights: [
          'Vegetable prices are trending upward due to seasonal demand',
          'Export opportunities for cotton and wheat are increasing',
          'Regional price variations offer arbitrage opportunities',
          'Weather patterns suggest good conditions for next planting season'
        ]
      })
    }, 1000)
  }

  const getTrendIcon = (change) => {
    if (change > 0) return <TrendingUp className="text-green-600" size={16} />
    if (change < 0) return <TrendingDown className="text-red-600" size={16} />
    return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
  }

  const getTrendColor = (change) => {
    if (change > 0) return 'text-green-600'
    if (change < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  const getDemandColor = (demand) => {
    switch (demand.toLowerCase()) {
      case 'very high': return 'bg-green-500'
      case 'high': return 'bg-blue-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case 'price-surge': return <TrendingUp className="text-green-600" size={20} />
      case 'demand-increase': return <BarChart3 className="text-blue-600" size={20} />
      case 'weather-impact': return <AlertTriangle className="text-yellow-600" size={20} />
      default: return <Info className="text-gray-600" size={20} />
    }
  }

  if (!marketData) {
    return (
      <div style={{ backgroundColor: '#F8F9FA', minHeight: '100vh', paddingTop: '24px' }}>
        <div className="container">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading market insights...</p>
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
              <h1 className="text-3xl font-bold text-green mb-2">📈 Market Insights</h1>
              <p className="text-gray-600">Real-time market analysis and price predictions</p>
            </div>
            <div className="flex gap-3">
              <select 
                className="input" 
                style={{ width: 'auto', minWidth: '150px' }}
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <select 
                className="input" 
                style={{ width: 'auto', minWidth: '150px' }}
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="all">All Regions</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="punjab">Punjab</option>
                <option value="up">Uttar Pradesh</option>
                <option value="gujarat">Gujarat</option>
              </select>
            </div>
          </div>

          {/* Market Overview */}
          <div className="grid grid-3 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-lg bg-green-100">
                  <DollarSign size={24} className="text-green-600" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${getTrendColor(marketData.overview.priceChange)}`}>
                  {getTrendIcon(marketData.overview.priceChange)}
                  {Math.abs(marketData.overview.priceChange)}%
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">₹{marketData.overview.averagePrice}/kg</div>
              <div className="text-sm text-gray-600">Average Market Price</div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-lg bg-blue-100">
                  <Package size={24} className="text-blue-600" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${getTrendColor(marketData.overview.volumeChange)}`}>
                  {getTrendIcon(marketData.overview.volumeChange)}
                  {Math.abs(marketData.overview.volumeChange)}%
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{marketData.overview.dailyTransactions}</div>
              <div className="text-sm text-gray-600">Daily Transactions</div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-lg bg-purple-100">
                  <BarChart3 size={24} className="text-purple-600" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${getTrendColor(marketData.overview.demandChange)}`}>
                  {getTrendIcon(marketData.overview.demandChange)}
                  {Math.abs(marketData.overview.demandChange)}%
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{marketData.overview.activeTraders}</div>
              <div className="text-sm text-gray-600">Active Traders</div>
            </div>
          </div>

          {/* Price Trends */}
          <div className="card mb-8">
            <h3 className="text-xl font-semibold mb-4">💰 Current Price Trends</h3>
            <div className="space-y-3">
              {marketData.pricetrends.map((crop, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">{crop.crop[0]}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{crop.crop}</div>
                      <div className="text-sm text-gray-600">Volume: {crop.volume} tons</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-xl font-bold">₹{crop.currentPrice}/kg</div>
                      <div className={`text-sm flex items-center gap-1 ${getTrendColor(crop.change)}`}>
                        {getTrendIcon(crop.change)}
                        {Math.abs(crop.change)}%
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className={`px-3 py-1 rounded-full text-white text-sm ${getDemandColor(crop.demand)}`}>
                        {crop.demand}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Demand</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Analysis & Seasonal Trends */}
          <div className="grid grid-2 gap-6 mb-8">
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">🗺️ Regional Analysis</h3>
              <div className="space-y-3">
                {marketData.regionalData.map((region, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <MapPin size={16} className="text-gray-500" />
                      <div>
                        <div className="font-medium">{region.region}</div>
                        <div className="text-sm text-gray-600">{region.volume} tons</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">₹{region.avgPrice}/kg</div>
                      <div className={`text-sm ${getTrendColor(region.growth)}`}>
                        +{region.growth}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold mb-4">📅 Seasonal Trends</h3>
              <div className="space-y-3">
                {marketData.seasonalTrends.map((month, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium w-12">{month.month}</div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-bold">₹{month.price}</div>
                        <div className="text-gray-600">Price</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold">{month.volume}</div>
                        <div className="text-gray-600">Volume</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold">{month.demand}%</div>
                        <div className="text-gray-600">Demand</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Market Alerts */}
          <div className="card mb-8">
            <h3 className="text-xl font-semibold mb-4">🚨 Market Alerts</h3>
            <div className="space-y-4">
              {marketData.marketAlerts.map((alert, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${
                  alert.severity === 'high' ? 'bg-red-50 border-red-500' :
                  alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                  'bg-blue-50 border-blue-500'
                }`}>
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{alert.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                          alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">{alert.message}</p>
                      <p className="text-sm text-gray-600 italic">{alert.impact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Predictions */}
          <div className="card mb-8">
            <h3 className="text-xl font-semibold mb-4">🔮 Price Predictions</h3>
            <div className="grid grid-3 gap-4">
              {marketData.predictions.map((prediction, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-3">{prediction.crop}</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Next Week</span>
                      <div className="text-right">
                        <div className="font-bold">₹{prediction.nextWeek.price}/kg</div>
                        <div className="text-xs text-gray-500">{prediction.nextWeek.confidence}% confidence</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Next Month</span>
                      <div className="text-right">
                        <div className="font-bold">₹{prediction.nextMonth.price}/kg</div>
                        <div className="text-xs text-gray-500">{prediction.nextMonth.confidence}% confidence</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Insights */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">💡 Key Market Insights</h3>
            <div className="grid grid-2 gap-4">
              {marketData.insights.map((insight, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="text-green-600 mt-1">💡</div>
                  <p className="text-gray-700">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketInsights