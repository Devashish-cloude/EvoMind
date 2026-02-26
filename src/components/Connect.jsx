import React, { useState, useEffect } from 'react'
import { Plus, Search, MapPin, Calendar, MessageCircle, Star, Filter } from 'lucide-react'

const Connect = ({ user }) => {
  const [activeTab, setActiveTab] = useState(user.role === 'farmer' ? 'my-listings' : 'browse')
  const [listings, setListings] = useState([])
  const [myListings, setMyListings] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [filters, setFilters] = useState({
    crop: '',
    location: '',
    priceRange: ''
  })

  useEffect(() => {
    fetchListings()
    if (user.role === 'farmer') {
      fetchMyListings()
    }
  }, [user.role])

  const fetchListings = () => {
    // Dummy listings data
    const dummyListings = [
      {
        id: 1,
        farmer: 'Raj Kumar',
        crop: 'Tomato',
        quantity: '500 kg',
        price: 45,
        location: 'Pune, Maharashtra',
        distance: '5 km',
        harvestDate: '2024-03-15',
        verified: true,
        rating: 4.8,
        description: 'Fresh organic tomatoes, pesticide-free'
      },
      {
        id: 2,
        farmer: 'Priya Singh',
        crop: 'Onion',
        quantity: '200 kg',
        price: 35,
        location: 'Nashik, Maharashtra',
        distance: '8 km',
        harvestDate: '2024-03-20',
        verified: true,
        rating: 4.6,
        description: 'Premium quality red onions'
      },
      {
        id: 3,
        farmer: 'Amit Patel',
        crop: 'Potato',
        quantity: '1000 kg',
        price: 20,
        location: 'Indore, MP',
        distance: '12 km',
        harvestDate: '2024-03-10',
        verified: false,
        rating: 4.2,
        description: 'Fresh potatoes, good for storage'
      }
    ]
    setListings(dummyListings)
  }

  const fetchMyListings = () => {
    // Dummy farmer's own listings
    const dummyMyListings = [
      {
        id: 1,
        crop: 'Wheat',
        quantity: '2000 kg',
        price: 25,
        harvestDate: '2024-04-01',
        status: 'active',
        inquiries: 5
      },
      {
        id: 2,
        crop: 'Rice',
        quantity: '1500 kg',
        price: 30,
        harvestDate: '2024-03-25',
        status: 'sold',
        inquiries: 12
      }
    ]
    setMyListings(dummyMyListings)
  }

  const AddListingForm = () => {
    const [formData, setFormData] = useState({
      crop: '',
      quantity: '',
      price: '',
      harvestDate: '',
      description: ''
    })

    const handleSubmit = (e) => {
      e.preventDefault()
      // Add new listing logic
      const newListing = {
        id: Date.now(),
        ...formData,
        status: 'active',
        inquiries: 0
      }
      setMyListings([...myListings, newListing])
      setShowAddForm(false)
      setFormData({ crop: '', quantity: '', price: '', harvestDate: '', description: '' })
    }

    return (
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">📝 Add New Crop Listing</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Crop Name</label>
              <input
                type="text"
                className="input"
                value={formData.crop}
                onChange={(e) => setFormData({...formData, crop: e.target.value})}
                placeholder="e.g., Tomato, Wheat, Rice"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <input
                type="text"
                className="input"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                placeholder="e.g., 500 kg, 2 tons"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Expected Price (₹/kg)</label>
              <input
                type="number"
                className="input"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                placeholder="45"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Harvest Date</label>
              <input
                type="date"
                className="input"
                value={formData.harvestDate}
                onChange={(e) => setFormData({...formData, harvestDate: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              className="input"
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe your crop quality, farming methods, etc."
            ></textarea>
          </div>

          <div className="flex gap-3">
            <button type="submit" className="btn btn-primary">
              Add Listing
            </button>
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#F8F9FA', minHeight: '100vh', paddingTop: '24px' }}>
      <div className="container">
        <div className="fade-in">
          <h1 className="text-3xl font-bold text-green mb-4">
            {user.role === 'farmer' ? '🤝 Connect with Retailers' : '🌾 Find Fresh Produce'}
          </h1>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="flex gap-4 border-b">
              {user.role === 'farmer' ? (
                <>
                  <button
                    className={`pb-2 px-1 font-medium ${activeTab === 'my-listings' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('my-listings')}
                  >
                    My Listings
                  </button>
                  <button
                    className={`pb-2 px-1 font-medium ${activeTab === 'requests' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('requests')}
                  >
                    Business Requests
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={`pb-2 px-1 font-medium ${activeTab === 'browse' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('browse')}
                  >
                    Browse Farmers
                  </button>
                  <button
                    className={`pb-2 px-1 font-medium ${activeTab === 'my-requests' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('my-requests')}
                  >
                    My Requests
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Farmer: My Listings Tab */}
          {user.role === 'farmer' && activeTab === 'my-listings' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Your Crop Listings</h2>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowAddForm(!showAddForm)}
                >
                  <Plus size={18} className="mr-2" />
                  Add New Listing
                </button>
              </div>

              {showAddForm && <AddListingForm />}

              <div className="grid grid-2 gap-6">
                {myListings.map((listing) => (
                  <div key={listing.id} className="card">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold">{listing.crop}</h3>
                        <p className="text-gray-600">{listing.quantity}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green">₹{listing.price}/kg</div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          listing.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {listing.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {listing.harvestDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle size={14} />
                        {listing.inquiries} inquiries
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '14px' }}>
                        Edit
                      </button>
                      <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '14px' }}>
                        View Inquiries
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Retailer: Browse Tab */}
          {user.role === 'retailer' && activeTab === 'browse' && (
            <div>
              {/* Search and Filters */}
              <div className="card mb-6">
                <div className="grid grid-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Search Crop</label>
                    <div className="relative">
                      <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        className="input pl-10"
                        placeholder="Search crops..."
                        value={filters.crop}
                        onChange={(e) => setFilters({...filters, crop: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="City, State"
                      value={filters.location}
                      onChange={(e) => setFilters({...filters, location: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Price Range</label>
                    <select 
                      className="input"
                      value={filters.priceRange}
                      onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                    >
                      <option value="">All Prices</option>
                      <option value="0-25">₹0 - ₹25</option>
                      <option value="25-50">₹25 - ₹50</option>
                      <option value="50+">₹50+</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Listings */}
              <div className="grid grid-2 gap-6">
                {listings.map((listing) => (
                  <div key={listing.id} className="card">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{listing.farmer}</h3>
                          {listing.verified && (
                            <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                              <Star size={12} />
                              Verified
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Star size={14} className="text-yellow-500" />
                          {listing.rating}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green">₹{listing.price}/kg</div>
                        <div className="text-sm text-gray-600">{listing.quantity}</div>
                      </div>
                    </div>

                    <h4 className="font-medium text-lg mb-2">{listing.crop}</h4>
                    <p className="text-sm text-gray-600 mb-3">{listing.description}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        {listing.distance}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {listing.harvestDate}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '14px', flex: 1 }}>
                        Send Request
                      </button>
                      <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '14px' }}>
                        <MessageCircle size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {activeTab === 'requests' && (
            <div className="card text-center py-12">
              <h3 className="text-xl font-semibold mb-2">Business Requests</h3>
              <p className="text-gray-600">You have no pending business requests.</p>
            </div>
          )}

          {activeTab === 'my-requests' && (
            <div className="card text-center py-12">
              <h3 className="text-xl font-semibold mb-2">My Requests</h3>
              <p className="text-gray-600">You haven't sent any requests yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Connect