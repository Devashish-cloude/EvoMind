import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, MapPin, TrendingUp, Truck, DollarSign } from 'lucide-react';

function Markets({ user, language }) {
  const [markets, setMarkets] = useState([]);
  const [crop, setCrop] = useState('Tomato');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMarkets();
  }, [crop]);

  const fetchMarkets = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/markets/compare?crop=${crop}&state=Maharashtra`);
      setMarkets(res.data);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-green-600 text-white p-4 sticky top-0 z-10">
        <div className="flex items-center gap-4 max-w-6xl mx-auto">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-white/20 rounded-lg">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold">Market Comparison</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-4">
        <div className="card">
          <label className="block font-semibold mb-2">Select Crop</label>
          <select value={crop} onChange={(e) => setCrop(e.target.value)} className="input-field">
            <option>Tomato</option>
            <option>Onion</option>
            <option>Potato</option>
            <option>Wheat</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading markets...</div>
        ) : (
          <div className="space-y-3">
            {markets.map((market, idx) => (
              <div key={idx} className={`card ${idx === 0 ? 'border-4 border-green-500' : ''}`}>
                {idx === 0 && (
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold inline-block mb-2">
                    🏆 BEST CHOICE
                  </div>
                )}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{market.mandi}</h3>
                    <p className="text-gray-600 flex items-center gap-1">
                      <MapPin size={16} /> {market.district}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-600">₹{market.price}</p>
                    <p className="text-sm text-gray-600">/quintal</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                      <Truck size={16} />
                      <span className="text-sm">Distance</span>
                    </div>
                    <p className="font-bold">{market.distance} km</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                      <TrendingUp size={16} />
                      <span className="text-sm">Demand</span>
                    </div>
                    <p className="font-bold capitalize">{market.demand}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                      <DollarSign size={16} />
                      <span className="text-sm">Profit</span>
                    </div>
                    <p className="font-bold text-green-600">₹{market.profit}</p>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="flex-1 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600">
                    Get Directions
                  </button>
                  <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600">
                    Contact Mandi
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Markets;
