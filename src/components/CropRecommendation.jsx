import React from 'react'
import { TrendingUp, TrendingDown, DollarSign, Clock, AlertCircle, CheckCircle } from 'lucide-react'

const CropRecommendation = ({ cropData }) => {
  const getProfitIcon = (level) => {
    switch (level.toLowerCase()) {
      case 'high':
        return <TrendingUp className="text-green-600" size={20} />
      case 'medium':
        return <DollarSign className="text-yellow-600" size={20} />
      case 'low':
        return <TrendingDown className="text-red-600" size={20} />
      default:
        return <DollarSign className="text-gray-600" size={20} />
    }
  }

  const getRiskIcon = (risk) => {
    switch (risk.toLowerCase()) {
      case 'low':
        return <CheckCircle className="text-green-600" size={16} />
      case 'medium':
        return <AlertCircle className="text-yellow-600" size={16} />
      case 'high':
        return <AlertCircle className="text-red-600" size={16} />
      default:
        return <AlertCircle className="text-gray-600" size={16} />
    }
  }

  const getProfitColor = (level) => {
    switch (level.toLowerCase()) {
      case 'high':
        return '#10B981'
      case 'medium':
        return '#F59E0B'
      case 'low':
        return '#EF4444'
      default:
        return '#6B7280'
    }
  }

  if (!cropData || cropData.length === 0) {
    return (
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">🌾 Smart Crop Recommendations</h3>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Analyzing market trends and weather data...</p>
        </div>
      </div>
    )
  }

  const topRecommendation = cropData.find(crop => crop.profitLevel === 'High') || cropData[0]

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4">🌾 Smart Crop Recommendations</h3>
      
      {/* AI Suggestion */}
      <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-l-4 border-green-500">
        <div className="flex items-start gap-3">
          <div className="text-2xl">🤖</div>
          <div>
            <h4 className="font-semibold text-green-700 mb-1">AI Recommendation</h4>
            <p className="text-gray-700">
              Based on weather and market trends, growing <strong>{topRecommendation.name}</strong> can give higher profit. 
              Expected return: <strong>₹{topRecommendation.expectedPrice}/kg</strong> with {topRecommendation.risk.toLowerCase()} risk.
            </p>
          </div>
        </div>
      </div>

      {/* Crop Cards */}
      <div className="grid grid-2">
        {cropData.map((crop) => (
          <div key={crop.id} className="card" style={{ padding: '20px', margin: '8px' }}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{crop.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-600">Season: {crop.season}</span>
                  <span className="text-sm text-gray-400">•</span>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span className="text-sm text-gray-600">{crop.growthTime}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-green">₹{crop.expectedPrice}/kg</div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                {getProfitIcon(crop.profitLevel)}
                <span 
                  className="font-medium"
                  style={{ color: getProfitColor(crop.profitLevel) }}
                >
                  {crop.profitLevel} Profit
                </span>
              </div>
              <div className="flex items-center gap-1">
                {getRiskIcon(crop.risk)}
                <span className="text-sm text-gray-600">{crop.risk} Risk</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{crop.recommendation}</p>

            <div className="flex gap-2">
              <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '14px', flex: 1 }}>
                Select Crop
              </button>
              <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '14px' }}>
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Market Trends */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-2">📈 Market Insights</h4>
        <div className="grid grid-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-green-600 font-bold">↗ +15%</div>
            <div className="text-gray-600">Vegetable prices</div>
          </div>
          <div className="text-center">
            <div className="text-blue-600 font-bold">85%</div>
            <div className="text-gray-600">Demand satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-yellow-600 font-bold">12 days</div>
            <div className="text-gray-600">Avg. selling time</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CropRecommendation