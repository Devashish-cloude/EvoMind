import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Users, Package, DollarSign, Calendar, MapPin, Star, Activity } from 'lucide-react'

const Stats = ({ user }) => {
  const [statsData, setStatsData] = useState(null)
  const [timeRange, setTimeRange] = useState('month')

  useEffect(() => {
    fetchStatsData()
  }, [timeRange, user.role])

  const fetchStatsData = () => {
    setTimeout(() => {
      if (user.role === 'farmer') {
        setStatsData({
          overview: {
            totalListings: 156,
            activeListings: 23,
            completedDeals: 89,
            totalRevenue: 245000,
            averagePrice: 42,
            responseRate: 94
          },
          trends: {
            listingsChange: +15,
            revenueChange: +28,
            priceChange: +8,
            dealsChange: +12
          },
          topCrops: [
            { name: 'Tomato', listings: 45, revenue: 89000, avgPrice: 48 },
            { name: 'Onion', listings: 32, revenue: 56000, avgPrice: 35 },
            { name: 'Potato', listings: 28, revenue: 42000, avgPrice: 25 },
            { name: 'Wheat', listings: 25, revenue: 38000, avgPrice: 22 },
            { name: 'Rice', listings: 26, revenue: 20000, avgPrice: 30 }
          ],
          monthlyData: [
            { month: 'Jan', listings: 12, revenue: 18000, deals: 8 },
            { month: 'Feb', listings: 15, revenue: 22000, deals: 12 },
            { month: 'Mar', listings: 18, revenue: 28000, deals: 15 },
            { month: 'Apr', listings: 22, revenue: 35000, deals: 18 },
            { month: 'May', listings: 25, revenue: 42000, deals: 22 },
            { month: 'Jun', listings: 23, revenue: 38000, deals: 20 }
          ],
          recentActivity: [
            { type: 'listing', message: 'New tomato listing created', time: '2 hours ago' },
            { type: 'inquiry', message: 'Retailer inquiry for onions', time: '4 hours ago' },
            { type: 'deal', message: 'Potato deal completed', time: '1 day ago' },
            { type: 'listing', message: 'Wheat listing updated', time: '2 days ago' }
          ]
        })
      } else {
        setStatsData({
          overview: {
            totalOrders: 89,
            activeOrders: 12,
            completedOrders: 77,
            totalSpent: 156000,
            averageOrderValue: 1750,
            supplierRating: 4.8
          },
          trends: {
            ordersChange: +22,
            spentChange: +18,
            avgOrderChange: +5,
            ratingChange: +0.2
          },
          topSuppliers: [
            { name: 'Raj Kumar', orders: 15, spent: 28000, rating: 4.9 },
            { name: 'Priya Singh', orders: 12, spent: 22000, rating: 4.7 },
            { name: 'Amit Patel', orders: 10, spent: 18000, rating: 4.6 },
            { name: 'Sunita Devi', orders: 8, spent: 15000, rating: 4.8 },
            { name: 'Mohan Lal', orders: 7, spent: 12000, rating: 4.5 }
          ],
          monthlyData: [
            { month: 'Jan', orders: 8, spent: 12000, suppliers: 5 },
            { month: 'Feb', orders: 10, spent: 15000, suppliers: 6 },
            { month: 'Mar', orders: 12, spent: 18000, suppliers: 7 },
            { month: 'Apr', orders: 15, spent: 22000, suppliers: 8 },
            { month: 'May', orders: 18, spent: 28000, suppliers: 9 },
            { month: 'Jun', orders: 16, spent: 25000, suppliers: 8 }
          ],
          recentActivity: [
            { type: 'order', message: 'Order placed with Raj Kumar', time: '1 hour ago' },
            { type: 'delivery', message: 'Tomato delivery received', time: '3 hours ago' },
            { type: 'payment', message: 'Payment completed for onions', time: '1 day ago' },
            { type: 'review', message: 'Reviewed supplier Priya Singh', time: '2 days ago' }
          ]
        })
      }
    }, 800)
  }

  const StatCard = ({ title, value, change, icon: Icon, color = 'green' }) => (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <Icon size={24} className={`text-${color}-600`} />
        </div>
        <div className={`flex items-center gap-1 text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {Math.abs(change)}%
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-800 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{title}</div>
    </div>
  )

  if (!statsData) {
    return (
      <div style={{ backgroundColor: '#F8F9FA', minHeight: '100vh', paddingTop: '24px' }}>
        <div className="container">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading statistics...</p>
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
              <h1 className="text-3xl font-bold text-green mb-2">📊 Quick Stats</h1>
              <p className="text-gray-600">
                {user.role === 'farmer' 
                  ? 'Your farming business performance overview'
                  : 'Your purchasing and supplier performance overview'
                }
              </p>
            </div>
            <select 
              className="input" 
              style={{ width: 'auto', minWidth: '150px' }}
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-3 gap-6 mb-8">
            {user.role === 'farmer' ? (
              <>
                <StatCard
                  title="Total Listings"
                  value={statsData.overview.totalListings}
                  change={statsData.trends.listingsChange}
                  icon={Package}
                  color="blue"
                />
                <StatCard
                  title="Active Listings"
                  value={statsData.overview.activeListings}
                  change={statsData.trends.listingsChange}
                  icon={Activity}
                  color="green"
                />
                <StatCard
                  title="Completed Deals"
                  value={statsData.overview.completedDeals}
                  change={statsData.trends.dealsChange}
                  icon={TrendingUp}
                  color="purple"
                />
                <StatCard
                  title="Total Revenue"
                  value={`₹${(statsData.overview.totalRevenue / 1000).toFixed(0)}K`}
                  change={statsData.trends.revenueChange}
                  icon={DollarSign}
                  color="green"
                />
                <StatCard
                  title="Average Price"
                  value={`₹${statsData.overview.averagePrice}/kg`}
                  change={statsData.trends.priceChange}
                  icon={TrendingUp}
                  color="yellow"
                />
                <StatCard
                  title="Response Rate"
                  value={`${statsData.overview.responseRate}%`}
                  change={+2}
                  icon={Star}
                  color="green"
                />
              </>
            ) : (
              <>
                <StatCard
                  title="Total Orders"
                  value={statsData.overview.totalOrders}
                  change={statsData.trends.ordersChange}
                  icon={Package}
                  color="blue"
                />
                <StatCard
                  title="Active Orders"
                  value={statsData.overview.activeOrders}
                  change={statsData.trends.ordersChange}
                  icon={Activity}
                  color="green"
                />
                <StatCard
                  title="Completed Orders"
                  value={statsData.overview.completedOrders}
                  change={statsData.trends.ordersChange}
                  icon={TrendingUp}
                  color="purple"
                />
                <StatCard
                  title="Total Spent"
                  value={`₹${(statsData.overview.totalSpent / 1000).toFixed(0)}K`}
                  change={statsData.trends.spentChange}
                  icon={DollarSign}
                  color="red"
                />
                <StatCard
                  title="Avg Order Value"
                  value={`₹${statsData.overview.averageOrderValue}`}
                  change={statsData.trends.avgOrderChange}
                  icon={TrendingUp}
                  color="yellow"
                />
                <StatCard
                  title="Supplier Rating"
                  value={statsData.overview.supplierRating}
                  change={statsData.trends.ratingChange}
                  icon={Star}
                  color="green"
                />
              </>
            )}
          </div>

          {/* Charts and Top Items */}
          <div className="grid grid-2 gap-6 mb-8">
            {/* Monthly Trend */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">
                {user.role === 'farmer' ? '📈 Monthly Performance' : '📈 Monthly Orders'}
              </h3>
              <div className="space-y-4">
                {statsData.monthlyData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium">{data.month}</div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-blue-600">
                          {user.role === 'farmer' ? data.listings : data.orders}
                        </div>
                        <div className="text-gray-600">
                          {user.role === 'farmer' ? 'Listings' : 'Orders'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-green-600">
                          ₹{(user.role === 'farmer' ? data.revenue : data.spent) / 1000}K
                        </div>
                        <div className="text-gray-600">
                          {user.role === 'farmer' ? 'Revenue' : 'Spent'}
                        </div>
                      </div>
                      {user.role === 'farmer' && (
                        <div className="text-center">
                          <div className="font-bold text-purple-600">{data.deals}</div>
                          <div className="text-gray-600">Deals</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Items */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">
                {user.role === 'farmer' ? '🌾 Top Crops' : '👥 Top Suppliers'}
              </h3>
              <div className="space-y-3">
                {(user.role === 'farmer' ? statsData.topCrops : statsData.topSuppliers).map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600">
                          {user.role === 'farmer' 
                            ? `${item.listings} listings • ₹${item.avgPrice}/kg`
                            : `${item.orders} orders • ${item.rating}⭐`
                          }
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">
                        ₹{(user.role === 'farmer' ? item.revenue : item.spent) / 1000}K
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">🔔 Recent Activity</h3>
            <div className="space-y-3">
              {statsData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'listing' ? 'bg-blue-500' :
                    activity.type === 'inquiry' || activity.type === 'order' ? 'bg-green-500' :
                    activity.type === 'deal' || activity.type === 'delivery' ? 'bg-purple-500' :
                    'bg-yellow-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="font-medium">{activity.message}</div>
                    <div className="text-sm text-gray-600">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats