import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, AlertTriangle, ThermometerSun, Clock, Warehouse } from 'lucide-react';

function SpoilageCalculator({ user, language }) {
  const [formData, setFormData] = useState({
    crop: 'Tomato',
    storageType: 'traditional',
    transitTime: 12,
    temperature: 30,
    humidity: 65
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/spoilage/calculate', formData);
      setResult(res.data);
    } catch (error) {
      alert('Error calculating risk');
    }
    setLoading(false);
  };

  const getRiskColor = (level) => {
    return level === 'low' ? 'bg-green-500' : level === 'medium' ? 'bg-yellow-500' : 'bg-red-500';
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-orange-600 text-white p-4 sticky top-0 z-10">
        <div className="flex items-center gap-4 max-w-6xl mx-auto">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-white/20 rounded-lg">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold">Spoilage Risk Calculator</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Enter Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Crop</label>
              <select value={formData.crop} onChange={(e) => setFormData({...formData, crop: e.target.value})} className="input-field">
                <option>Tomato</option>
                <option>Onion</option>
                <option>Potato</option>
                <option>Wheat</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2 flex items-center gap-2">
                <Warehouse size={20} /> Storage Type
              </label>
              <select value={formData.storageType} onChange={(e) => setFormData({...formData, storageType: e.target.value})} className="input-field">
                <option value="cold">Cold Storage (2-4°C)</option>
                <option value="ventilated">Ventilated Warehouse</option>
                <option value="traditional">Traditional Storage</option>
                <option value="open">Open Storage</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2 flex items-center gap-2">
                <Clock size={20} /> Transit Time (hours)
              </label>
              <input
                type="number"
                value={formData.transitTime}
                onChange={(e) => setFormData({...formData, transitTime: parseInt(e.target.value)})}
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-2 flex items-center gap-2">
                  <ThermometerSun size={20} /> Temperature (°C)
                </label>
                <input
                  type="number"
                  value={formData.temperature}
                  onChange={(e) => setFormData({...formData, temperature: parseInt(e.target.value)})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Humidity (%)</label>
                <input
                  type="number"
                  value={formData.humidity}
                  onChange={(e) => setFormData({...formData, humidity: parseInt(e.target.value)})}
                  className="input-field"
                />
              </div>
            </div>

            <button onClick={handleCalculate} disabled={loading} className="btn-primary w-full text-xl">
              {loading ? 'Calculating...' : 'Calculate Risk'}
            </button>
          </div>
        </div>

        {result && (
          <>
            <div className={`card ${getRiskColor(result.level)} text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Spoilage Risk</p>
                  <h2 className="text-4xl font-bold uppercase">{result.level}</h2>
                  <p className="text-lg mt-2">Risk Score: {result.riskScore}/100</p>
                </div>
                <AlertTriangle size={64} />
              </div>
              <div className="mt-4 pt-4 border-t border-white/30">
                <p className="font-semibold">Estimated Loss: {result.estimatedLoss}</p>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold mb-3">Risk Factors</h3>
              <ul className="space-y-2">
                {result.factors.map((factor, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold mb-3">Recommended Actions</h3>
              <div className="space-y-2">
                {result.actions.map((action, idx) => (
                  <div key={idx} className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                    {action}
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold mb-4">Preservation Methods (Ranked by Cost-Effectiveness)</h3>
              <div className="space-y-3">
                {result.methods.map((method, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">#{idx + 1}</span>
                        <h4 className="font-bold text-lg mt-2">{method.method}</h4>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">₹{method.cost}</p>
                        <p className="text-sm text-gray-600">per quintal</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <p className="text-sm text-gray-600">Effectiveness</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{width: `${method.effectiveness}%`}}></div>
                          </div>
                          <span className="font-bold">{method.effectiveness}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="font-bold">{method.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SpoilageCalculator;
