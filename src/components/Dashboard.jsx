import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Cloud, Sun, CloudRain, AlertTriangle, TrendingUp, TrendingDown, DollarSign, BarChart3, Wheat, Users, ArrowRight } from 'lucide-react'

const Dashboard = ({ user }) => {
  const [quickStats, setQuickStats] = useState(null)

  useEffect(() => {
    // Simulate API calls for quick stats
    fetchQuickStats()
  }, [])

  const fetchQuickStats = () => {
    setTimeout(() => {
      setQuickStats({
        weather: {
          temperature: 28,
          condition: 'Partly Cloudy',
          alert: 'Heavy rain expected on Wednesday'
        },
        stats: user.role === 'farmer' ? {
          activeListings: 23,
          interestedBuyers: 156,
          totalRevenue: 245000,
          responseRate: 94
        } : {
          availableFarmers: 156,
          pendingOrders: 23,
          totalSpent: 156000,
          supplierRating: 4.8
        },
        topCrop: {
          name: 'Tomato',
          price: 45,
          profit: 'High'
        },
        marketTrend: {
          direction: 'up',
          percentage: 15,
          insight: 'Vegetable prices trending upward'
        }
      })
    }, 800)
  }

  const QuickCard = ({ title, value, subtitle, icon: Icon, linkTo, color = 'green' }) => (
    <Link to={linkTo} className="card hover:shadow-lg transition-all duration-300" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="flex items-center justify-between mb-3">
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <Icon size={24} className={`text-${color}-600`} />
        </div>
        <ArrowRight size={18} className="text-gray-400" />
      </div>
      <div className="text-2xl font-bold text-gray-800 mb-1">{value}</div>
      <div className="text-sm text-gray-600 mb-2">{title}</div>
      {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
    </Link>
  )

  return (
    <div style={{ backgroundColor: '#F8F9FA', minHeight: '100vh', paddingTop: '24px' }}>
      <div className="container">
        <div className="fade-in">
          <h1 className="text-3xl font-bold text-green mb-4">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600 mb-6">
            {user.role === 'farmer' 
              ? 'Your farming dashboard - quick access to all essential tools'
              : 'Your retail dashboard - connect with farmers and manage orders'
            }
          </p>

          {/* Quick Access Cards */}
          <div className="grid grid-2 gap-6 mb-8">
            {/* Weather Quick Access */}
            <QuickCard
              title="Weather Forecast"
              value={quickStats ? `${quickStats.weather.temperature}°C` : 'Loading...'}
              subtitle={quickStats ? quickStats.weather.condition : ''}
              icon={Cloud}
              linkTo="/weather"
              color="blue"
            />

            {/* Stats Quick Access */}
            <QuickCard
              title="Quick Stats"
              value={quickStats ? (user.role === 'farmer' ? quickStats.stats.activeListings : quickStats.stats.availableFarmers) : 'Loading...'}
              subtitle={user.role === 'farmer' ? 'Active Listings' : 'Available Farmers'}
              icon={BarChart3}
              linkTo="/stats"
              color="purple"
            />

            {/* Crop Recommendations (Farmers only) */}
            {user.role === 'farmer' && (
              <QuickCard
                title="Top Crop Recommendation"
                value={quickStats ? quickStats.topCrop.name : 'Loading...'}
                subtitle={quickStats ? `₹${quickStats.topCrop.price}/kg - ${quickStats.topCrop.profit} Profit` : ''}
                icon={Wheat}
                linkTo="/crops"
                color="green"
              />
            )}

            {/* Market Insights */}
            <QuickCard
              title="Market Insights"
              value={quickStats ? `+${quickStats.marketTrend.percentage}%` : 'Loading...'}
              subtitle={quickStats ? quickStats.marketTrend.insight : ''}
              icon={TrendingUp}
              linkTo="/market"
              color="yellow"
            />
          </div>

          {/* Weather Alert */}
          {quickStats && quickStats.weather.alert && (
            <div className="alert alert-warning mb-6">
              <div className="flex items-center gap-2">
                <AlertTriangle size={18} />
                <span>{quickStats.weather.alert}</span>
                <Link to="/weather" className="ml-auto text-sm underline">
                  View Details →
                </Link>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid grid-2 gap-6 mb-8">
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">🚀 Quick Actions</h3>
              <div className="space-y-3">
                {user.role === 'farmer' ? (
                  <>
                    <Link to="/connect" className="btn btn-primary block text-center">
                      Add New Crop Listing
                    </Link>
                    <Link to="/crops" className="btn btn-outline block text-center">
                      Get Crop Recommendations
                    </Link>
                    <Link to="/weather" className="btn btn-outline block text-center">
                      Check Weather Forecast
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/connect" className="btn btn-primary block text-center">
                      Browse Farmer Listings
                    </Link>
                    <Link to="/market" className="btn btn-outline block text-center">
                      View Market Trends
                    </Link>
                    <Link to="/stats" className="btn btn-outline block text-center">
                      Check Order Statistics
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold mb-4">📊 Performance Overview</h3>
              {quickStats && (
                <div className="grid grid-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green">
                      {user.role === 'farmer' ? quickStats.stats.activeListings : quickStats.stats.availableFarmers}
                    </div>
                    <div className="text-sm text-gray-600">
                      {user.role === 'farmer' ? 'Active Listings' : 'Available Farmers'}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {user.role === 'farmer' ? quickStats.stats.interestedBuyers : quickStats.stats.pendingOrders}
                    </div>
                    <div className="text-sm text-gray-600">
                      {user.role === 'farmer' ? 'Interested Buyers' : 'Pending Orders'}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      ₹{user.role === 'farmer' ? (quickStats.stats.totalRevenue / 1000).toFixed(0) : (quickStats.stats.totalSpent / 1000).toFixed(0)}K
                    </div>
                    <div className="text-sm text-gray-600">
                      {user.role === 'farmer' ? 'Total Revenue' : 'Total Spent'}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      {user.role === 'farmer' ? `${quickStats.stats.responseRate}%` : quickStats.stats.supplierRating}
                    </div>
                    <div className="text-sm text-gray-600">
                      {user.role === 'farmer' ? 'Response Rate' : 'Supplier Rating'}
                    </div>
                  </div>
                </div>
              )}
              <Link to="/stats" className="btn btn-outline mt-4 block text-center">
                View Detailed Stats →
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">🔔 Recent Activity</h3>
            <div className="space-y-3">
              {user.role === 'farmer' ? (
                <>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="flex-1">
                      <div className="font-medium">New inquiry for tomatoes</div>
                      <div className="text-sm text-gray-600">2 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <div className="flex-1">
                      <div className="font-medium">Wheat listing updated</div>
                      <div className="text-sm text-gray-600">1 day ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <div className="flex-1">
                      <div className="font-medium">Onion deal completed</div>
                      <div className="text-sm text-gray-600">2 days ago</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="flex-1">
                      <div className="font-medium">Order placed with Raj Kumar</div>
                      <div className="text-sm text-gray-600">1 hour ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <div className="flex-1">
                      <div className="font-medium">Tomato delivery received</div>
                      <div className="text-sm text-gray-600">3 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <div className="flex-1">
                      <div className="font-medium">Payment completed for onions</div>
                      <div className="text-sm text-gray-600">1 day ago</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard