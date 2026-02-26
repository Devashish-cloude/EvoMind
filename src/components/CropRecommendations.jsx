import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, DollarSign, Clock, AlertCircle, CheckCircle, Filter, Search, Calendar, MapPin } from 'lucide-react'

const CropRecommendations = ({ user }) => {
  const [cropData, setCropData] = useState([])
  const [filteredCrops, setFilteredCrops] = useState([])
  const [filters, setFilters] = useState({
    season: 'all',
    profitLevel: 'all',
    risk: 'all',
    growthTime: 'all'
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCrop, setSelectedCrop] = useState(null)

  useEffect(() => {
    fetchCropData()
  }, [])

  useEffect(() => {
    filterCrops()
  }, [cropData, filters, searchTerm])

  const fetchCropData = () => {
    setTimeout(() => {
      setCropData([
        {
          id: 1,
          name: 'Tomato',
          expectedPrice: 45,
          profitLevel: 'High',
          risk: 'Low',
          season: 'Current',
          growthTime: '90 days',
          recommendation: 'Excellent choice! High demand and good weather conditions.',
          marketDemand: 'Very High',
          waterRequirement: 'Medium',
          soilType: 'Well-drained loamy soil',
          pestResistance: 'Good',
          storageLife: '7-10 days',
          bestRegions: ['Maharashtra', 'Karnataka', 'Andhra Pradesh'],
          plantingTips: [
            'Plant after last frost date',
            'Maintain soil pH between 6.0-6.8',
            'Provide support structures for vines'
          ]
        },
        {
          id: 2,
          name: 'Onion',
          expectedPrice: 35,
          profitLevel: 'Medium',
          risk: 'Medium',
          season: 'Current',
          growthTime: '120 days',
          recommendation: 'Good option with stable market prices.',
          marketDemand: 'High',
          waterRequirement: 'Low',
          soilType: 'Sandy loam with good drainage',
          pestResistance: 'Excellent',
          storageLife: '6-8 months',
          bestRegions: ['Maharashtra', 'Gujarat', 'Rajasthan'],
          plantingTips: [
            'Plant in well-prepared beds',
            'Ensure proper spacing for bulb development',
            'Harvest when tops begin to fall over'
          ]
        },
        {
          id: 3,
          name: 'Wheat',
          expectedPrice: 25,
          profitLevel: 'Medium',
          risk: 'Low',
          season: 'Next',
          growthTime: '150 days',
          recommendation: 'Safe choice with government support.',
          marketDemand: 'Stable',
          waterRequirement: 'Medium',
          soilType: 'Well-drained fertile soil',
          pestResistance: 'Good',
          storageLife: '12+ months',
          bestRegions: ['Punjab', 'Haryana', 'Uttar Pradesh'],
          plantingTips: [
            'Sow at optimal temperature (18-25°C)',
            'Ensure proper seed rate and depth',
            'Apply fertilizers as per soil test'
          ]
        },
        {
          id: 4,
          name: 'Cotton',
          expectedPrice: 55,
          profitLevel: 'High',
          risk: 'High',
          season: 'Current',
          growthTime: '180 days',
          recommendation: 'High profit but weather dependent. Monitor closely.',
          marketDemand: 'High',
          waterRequirement: 'High',
          soilType: 'Deep, well-drained black soil',
          pestResistance: 'Poor',
          storageLife: '12+ months',
          bestRegions: ['Gujarat', 'Maharashtra', 'Telangana'],
          plantingTips: [
            'Choose pest-resistant varieties',
            'Maintain proper plant spacing',
            'Regular monitoring for pests'
          ]
        },
        {
          id: 5,
          name: 'Rice',
          expectedPrice: 30,
          profitLevel: 'Medium',
          risk: 'Low',
          season: 'Current',
          growthTime: '120 days',
          recommendation: 'Stable crop with consistent demand.',
          marketDemand: 'Very High',
          waterRequirement: 'Very High',
          soilType: 'Clay or clay loam',
          pestResistance: 'Good',
          storageLife: '12+ months',
          bestRegions: ['West Bengal', 'Punjab', 'Andhra Pradesh'],
          plantingTips: [
            'Ensure adequate water supply',
            'Transplant at right age (25-30 days)',
            'Maintain proper water levels'
          ]
        },
        {
          id: 6,
          name: 'Sugarcane',
          expectedPrice: 40,
          profitLevel: 'High',
          risk: 'Medium',
          season: 'Next',
          growthTime: '365 days',
          recommendation: 'Long-term investment with good returns.',
          marketDemand: 'High',
          waterRequirement: 'Very High',
          soilType: 'Deep, fertile, well-drained soil',
          pestResistance: 'Good',
          storageLife: 'Process immediately',
          bestRegions: ['Uttar Pradesh', 'Maharashtra', 'Karnataka'],
          plantingTips: [
            'Plant quality seed cane',
            'Ensure proper irrigation',
            'Regular weeding and fertilization'
          ]
        }
      ])
    }, 1200)
  }

  const filterCrops = () => {
    let filtered = cropData.filter(crop => {
      const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSeason = filters.season === 'all' || crop.season.toLowerCase() === filters.season
      const matchesProfit = filters.profitLevel === 'all' || crop.profitLevel.toLowerCase() === filters.profitLevel
      const matchesRisk = filters.risk === 'all' || crop.risk.toLowerCase() === filters.risk
      
      let matchesGrowthTime = true
      if (filters.growthTime !== 'all') {
        const days = parseInt(crop.growthTime)
        switch (filters.growthTime) {
          case 'short':
            matchesGrowthTime = days <= 90
            break
          case 'medium':
            matchesGrowthTime = days > 90 && days <= 150
            break
          case 'long':
            matchesGrowthTime = days > 150
            break
        }
      }

      return matchesSearch && matchesSeason && matchesProfit && matchesRisk && matchesGrowthTime
    })

    // Sort by profit level and expected price
    filtered.sort((a, b) => {
      const profitOrder = { 'High': 3, 'Medium': 2, 'Low': 1 }
      if (profitOrder[a.profitLevel] !== profitOrder[b.profitLevel]) {
        return profitOrder[b.profitLevel] - profitOrder[a.profitLevel]
      }
      return b.expectedPrice - a.expectedPrice
    })

    setFilteredCrops(filtered)
  }

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
      <div style={{ backgroundColor: '#F8F9FA', minHeight: '100vh', paddingTop: '24px' }}>
        <div className="container">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 text-lg">Analyzing market trends and weather data...</p>
          </div>
        </div>
      </div>
    )
  }

  const topRecommendation = filteredCrops.find(crop => crop.profitLevel === 'High') || filteredCrops[0]

  return (
    <div style={{ backgroundColor: '#F8F9FA', minHeight: '100vh', paddingTop: '24px' }}>
      <div className="container">
        <div className="fade-in">
          <h1 className="text-3xl font-bold text-green mb-2">🌾 Smart Crop Recommendations</h1>
          <p className="text-gray-600 mb-6">AI-powered crop suggestions based on weather, market trends, and soil conditions</p>
          
          {/* AI Top Suggestion */}
          {topRecommendation && (
            <div className="card mb-6" style={{ background: 'linear-gradient(135deg, #E8F5E8 0%, #E3F2FD 100%)' }}>
              <div className="flex items-start gap-4">
                <div className="text-4xl">🤖</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-green-700 mb-2">AI Top Recommendation</h3>
                  <p className="text-gray-700 mb-3">
                    Based on current weather patterns, market analysis, and soil conditions, growing <strong>{topRecommendation.name}</strong> is your best option right now.
                  </p>
                  <div className="grid grid-3 gap-4 text-sm">
                    <div className="text-center p-3 bg-white bg-opacity-70 rounded-lg">
                      <div className="font-bold text-green-600">₹{topRecommendation.expectedPrice}/kg</div>
                      <div className="text-gray-600">Expected Price</div>
                    </div>
                    <div className="text-center p-3 bg-white bg-opacity-70 rounded-lg">
                      <div className="font-bold text-blue-600">{topRecommendation.profitLevel}</div>
                      <div className="text-gray-600">Profit Level</div>
                    </div>
                    <div className="text-center p-3 bg-white bg-opacity-70 rounded-lg">
                      <div className="font-bold text-purple-600">{topRecommendation.growthTime}</div>
                      <div className="text-gray-600">Growth Time</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search and Filters */}
          <div className="card mb-6">
            <div className="grid grid-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Search Crops</label>
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    className="input pl-10"
                    placeholder="Search for crops..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Season</label>
                <select 
                  className="input"
                  value={filters.season}
                  onChange={(e) => setFilters({...filters, season: e.target.value})}
                >
                  <option value="all">All Seasons</option>
                  <option value="current">Current Season</option>
                  <option value="next">Next Season</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Profit Level</label>
                <select 
                  className="input"
                  value={filters.profitLevel}
                  onChange={(e) => setFilters({...filters, profitLevel: e.target.value})}
                >
                  <option value="all">All Levels</option>
                  <option value="high">High Profit</option>
                  <option value="medium">Medium Profit</option>
                  <option value="low">Low Profit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Risk Level</label>
                <select 
                  className="input"
                  value={filters.risk}
                  onChange={(e) => setFilters({...filters, risk: e.target.value})}
                >
                  <option value="all">All Risk Levels</option>
                  <option value="low">Low Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="high">High Risk</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Growth Time</label>
                <select 
                  className="input"
                  value={filters.growthTime}
                  onChange={(e) => setFilters({...filters, growthTime: e.target.value})}
                >
                  <option value="all">All Durations</option>
                  <option value="short">Short (≤90 days)</option>
                  <option value="medium">Medium (90-150 days)</option>
                  <option value="long">Long (>150 days)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Crop Cards */}
          <div className="grid grid-2 gap-6">
            {filteredCrops.map((crop) => (
              <div key={crop.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{crop.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {crop.season} Season
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {crop.growthTime}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green">₹{crop.expectedPrice}/kg</div>
                    <div className="text-sm text-gray-600">Expected Price</div>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
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

                <div className="grid grid-2 gap-3 mb-4 text-xs">
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="font-medium text-gray-700">Market Demand</div>
                    <div className="text-gray-600">{crop.marketDemand}</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="font-medium text-gray-700">Water Need</div>
                    <div className="text-gray-600">{crop.waterRequirement}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    className="btn btn-primary flex-1"
                    style={{ padding: '10px 16px', fontSize: '14px' }}
                    onClick={() => setSelectedCrop(crop)}
                  >
                    View Details
                  </button>
                  <button 
                    className="btn btn-outline"
                    style={{ padding: '10px 16px', fontSize: '14px' }}
                  >
                    Add to Plan
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredCrops.length === 0 && (
            <div className="card text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No crops found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          )}

          {/* Detailed Crop Modal */}
          {selectedCrop && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-green">{selectedCrop.name} Details</h2>
                    <button 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setSelectedCrop(null)}
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold mb-3">Crop Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Expected Price:</span>
                          <span className="font-medium">₹{selectedCrop.expectedPrice}/kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Growth Time:</span>
                          <span className="font-medium">{selectedCrop.growthTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Market Demand:</span>
                          <span className="font-medium">{selectedCrop.marketDemand}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Water Requirement:</span>
                          <span className="font-medium">{selectedCrop.waterRequirement}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Storage Life:</span>
                          <span className="font-medium">{selectedCrop.storageLife}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Growing Conditions</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-600">Soil Type:</span>
                          <p className="font-medium">{selectedCrop.soilType}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Pest Resistance:</span>
                          <p className="font-medium">{selectedCrop.pestResistance}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Best Growing Regions</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCrop.bestRegions.map((region, index) => (
                        <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          {region}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Planting Tips</h4>
                    <ul className="space-y-2">
                      {selectedCrop.plantingTips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-green-600 mt-1">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <button className="btn btn-primary flex-1">
                      Add to My Plan
                    </button>
                    <button 
                      className="btn btn-outline"
                      onClick={() => setSelectedCrop(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CropRecommendations