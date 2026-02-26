import React, { useState, useEffect } from 'react';
import { Search, MapPin, CheckCircle, Users, Plus, MessageCircle } from 'lucide-react';

const ConnectPage = ({ user }) => {
    const isFarmer = user.role === 'Farmer';

    // Farmer State
    const [showAddForm, setShowAddForm] = useState(false);
    const [myListings, setMyListings] = useState([
        { id: 1, crop: 'Tomato', qty: '500kg', price: '₹45/kg', date: '2023-11-20', status: 'Active' }
    ]);
    const [incomingRequests, setIncomingRequests] = useState([
        { id: 101, retailer: 'FreshMart Organics', offer: '₹42/kg', qty: '300kg', status: 'Pending' }
    ]);
    const [newListing, setNewListing] = useState({
        crop: '',
        qty: '',
        price: '',
        date: ''
    });

    const handlePublish = (e) => {
        e.preventDefault();
        if (!newListing.crop || !newListing.qty || !newListing.price || !newListing.date) return;

        const newEntry = {
            id: Date.now(),
            crop: newListing.crop,
            qty: `${newListing.qty}kg`,
            price: `₹${newListing.price}/kg`,
            date: newListing.date,
            status: 'Active'
        };

        setMyListings(prev => [newEntry, ...prev]);
        setNewListing({ crop: '', qty: '', price: '', date: '' });
        setShowAddForm(false);
    };

    const handleOfferAction = (id, action) => {
        setIncomingRequests(prev => prev.map(req => {
            if (req.id === id) {
                if (action === 'accept') {
                    return { ...req, status: 'Accepted' };
                } else if (action === 'decline') {
                    return { ...req, status: 'Declined' };
                } else if (action === 'negotiate') {
                    return { ...req, status: 'Negotiating' };
                }
            }
            return req;
        }));
    };

    // Retailer State
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCrop, setFilterCrop] = useState('All');

    const [farmers] = useState([
        { id: 201, name: 'John Doe', verified: true, crop: 'Tomato', qty: '500kg', price: '₹45/kg', location: 'Nashik, MH', distance: '15km', rating: 4.8 },
        { id: 202, name: 'Jane Smith', verified: true, crop: 'Onion', qty: '2000kg', price: '₹22/kg', location: 'Pune, MH', distance: '8km', rating: 4.9 },
        { id: 203, name: 'Bob Brown', verified: false, crop: 'Cabbage', qty: '800kg', price: '₹12/kg', location: 'Satara, MH', distance: '45km', rating: 4.2 }
    ]);

    const filteredFarmers = farmers.filter(f => {
        const matchesCrop = filterCrop === 'All' || f.crop === filterCrop;
        const matchesSearch = f.crop.toLowerCase().includes(searchTerm.toLowerCase()) || f.location.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCrop && matchesSearch;
    });

    const getPrediction = async () => {
        try {
            const response = await fetch("http://localhost:5001/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    month: 6,
                    temperature: 32,
                    humidity: 80,
                    rainfall: 5,
                    soil_score: 50,
                    transit_time: 6
                })
            });

            const data = await response.json();
            console.log("AI Response:", data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getPrediction();
    }, []);

    return (
        <div className="animate-fade-in pb-8">
            <div className="flex justify-between items-end mb-6 border-b pb-4" style={{ borderColor: 'var(--border-color)' }}>
                <div>
                    <h1 className="text-primary gap-2 m-0 flex items-center">
                        <Users size={32} /> Market Connect
                    </h1>
                    <p className="text-muted mt-2 m-0">
                        {isFarmer ? 'Manage your crop listings and incoming business requests.' : 'Find verified farmers and negotiate deals directly.'}
                    </p>
                </div>
                {isFarmer && (
                    <button className="btn btn-primary flex items-center gap-2" onClick={() => setShowAddForm(!showAddForm)}>
                        <Plus size={20} /> New Listing
                    </button>
                )}
            </div>

            {isFarmer ? (
                // ================= FARMER VIEW =================
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>

                    <div>
                        {showAddForm && (
                            <div className="card mb-6 border-primary" style={{ borderWidth: '2px', borderStyle: 'solid', borderColor: 'var(--primary-color)' }}>
                                <h3 className="mb-4">Post New Crop</h3>
                                <form onSubmit={handlePublish}>
                                    <div className="form-group">
                                        <label className="form-label">Crop Name</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            placeholder="e.g. Tomato"
                                            value={newListing.crop}
                                            onChange={(e) => setNewListing({ ...newListing, crop: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="form-group flex-1">
                                            <label className="form-label">Quantity (kg)</label>
                                            <input
                                                type="number"
                                                className="form-input"
                                                placeholder="e.g. 1000"
                                                value={newListing.qty}
                                                onChange={(e) => setNewListing({ ...newListing, qty: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group flex-1">
                                            <label className="form-label">Price (₹/kg)</label>
                                            <input
                                                type="number"
                                                className="form-input"
                                                placeholder="e.g. 40"
                                                value={newListing.price}
                                                onChange={(e) => setNewListing({ ...newListing, price: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mb-4">
                                        <label className="form-label">Estimated Harvest Date</label>
                                        <input
                                            type="date"
                                            className="form-input"
                                            value={newListing.date}
                                            onChange={(e) => setNewListing({ ...newListing, date: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <button type="submit" className="btn btn-primary flex-1">Publish Listing</button>
                                        <button type="button" className="btn btn-secondary flex-1" onClick={() => setShowAddForm(false)}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <h3 className="mb-4">Your Active Listings</h3>
                        {myListings.map(listing => (
                            <div key={listing.id} className="card mb-4" style={{ padding: '1rem' }}>
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="m-0 text-xl">{listing.crop}</h4>
                                    <span className="badge badge-green">{listing.status}</span>
                                </div>
                                <div className="text-muted text-sm flex gap-4 mt-2">
                                    <span><strong>Qty:</strong> {listing.qty}</span>
                                    <span><strong>Price:</strong> {listing.price}</span>
                                    <span><strong>Est. Harvest:</strong> {listing.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h3 className="mb-4 flex items-center gap-2">
                            <MessageCircle size={24} className="text-primary" /> Incoming Offers
                        </h3>
                        {incomingRequests.length === 0 ? (
                            <p className="text-muted">No offers yet. Keep your prices competitive!</p>
                        ) : (
                            incomingRequests.map(req => (
                                <div key={req.id} className="card mb-4" style={{ borderLeft: '4px solid var(--alert-yellow)' }}>
                                    <div className="flex justify-between mb-2">
                                        <h4 className="m-0">{req.retailer}</h4>
                                        <span className={`text-sm font-bold ${req.status === 'Accepted' ? 'text-green-600' : req.status === 'Declined' ? 'text-red-600' : 'text-yellow-600'}`}>
                                            {req.status}
                                        </span>
                                    </div>
                                    <p className="m-0 text-sm text-muted mb-4">
                                        Wants to buy <strong>{req.qty}</strong> of your Tomato crop for <strong>{req.offer}</strong>.
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            className="btn btn-primary py-2 px-4 text-sm flex-1"
                                            onClick={() => handleOfferAction(req.id, 'accept')}
                                            disabled={req.status === 'Accepted' || req.status === 'Declined'}
                                        >Accept</button>
                                        <button
                                            className="btn btn-secondary py-2 px-4 text-sm flex-1"
                                            onClick={() => handleOfferAction(req.id, 'negotiate')}
                                            disabled={req.status === 'Accepted' || req.status === 'Declined'}
                                        >Negotiate</button>
                                        <button
                                            className="btn btn-danger py-2 px-4 text-sm"
                                            onClick={() => handleOfferAction(req.id, 'decline')}
                                            disabled={req.status === 'Accepted' || req.status === 'Declined'}
                                        >Decline</button>
                                    </div>
                                </div>
                            ))

                        )}
                    </div>

                </div>
            ) : (
                // ================= RETAILER VIEW =================
                <div>
                    <div className="card mb-6 bg-green-50">
                        <div className="flex flex-wrap gap-4 items-end">
                            <div className="form-group m-0 flex-1 min-w-[200px]">
                                <label className="form-label">Search location or crop</label>
                                <div className="relative">
                                    <div style={{ position: 'absolute', top: '12px', left: '12px' }}><Search size={20} className="text-muted" /></div>
                                    <input
                                        type="text"
                                        className="form-input"
                                        style={{ paddingLeft: '2.5rem' }}
                                        placeholder="e.g. Pune or Tomato"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group m-0">
                                <label className="form-label">Filter Crop</label>
                                <select className="form-input bg-white cursor-pointer" value={filterCrop} onChange={(e) => setFilterCrop(e.target.value)}>
                                    <option>All</option>
                                    <option>Tomato</option>
                                    <option>Onion</option>
                                    <option>Cabbage</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <h3 className="mb-4">Farmers Near You</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                        {filteredFarmers.map(f => (
                            <div key={f.id} className="card flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h4 className="m-0 flex items-center gap-1 text-lg">
                                                {f.name}
                                                {f.verified && <CheckCircle size={16} color="var(--primary-color)" title="Verified Farmer" />}
                                            </h4>
                                            <span className="text-sm flex items-center gap-1 text-muted mt-1">
                                                <MapPin size={14} /> {f.location} ({f.distance})
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <span className="badge badge-green">★ {f.rating}</span>
                                        </div>
                                    </div>

                                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 mb-4">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-muted text-sm">Crop:</span>
                                            <span className="font-bold">{f.crop}</span>
                                        </div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-muted text-sm">Available:</span>
                                            <span className="font-bold">{f.qty}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted text-sm">Asking Price:</span>
                                            <span className="font-bold text-primary">{f.price}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-auto">
                                    <button className="btn btn-primary flex-1 flex items-center justify-center gap-2">
                                        <Users size={18} /> Send Request
                                    </button>
                                    <button className="btn btn-secondary flex items-center justify-center p-2 rounded-lg" title="Chat" style={{ width: '48px' }}>
                                        <MessageCircle size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            )}
        </div>
    );
};

export default ConnectPage;
