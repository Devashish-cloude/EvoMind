import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Brain, Calendar, MapPin, AlertTriangle, TrendingUp } from 'lucide-react';

function Recommendations({ user, language }) {
  const [formData, setFormData] = useState({
    crop: 'Tomato',
    soilCondition: 'good',
    currentStage: 'flowering',
    state: 'Maharashtra',
    district: 'Pune'
  });
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/recommendations/generate', {
        ...formData,
        userId: user.id
      });
      setRecommendation(res.data);
    } catch (error) {
      alert('Error generating recommendation');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-purple-600 text-white p-4 sticky top-0 z-10">
        <div className="flex items-center gap-4 max-w-6xl mx-auto">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-white/20 rounded-lg">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold">AI Recommendations</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <div className="card">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Brain className="text-purple-600" />
            Get AI-Powered Insights
          </h2>
          
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-2">Soil Condition</label>
                <select value={formData.soilCondition} onChange={(e) => setFormData({...formData, soilCondition: e.target.value})} className="input-field">
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="average">Average</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2">Current Stage</label>
                <select value={formData.currentStage} onChange={(e) => setFormData({...formData, currentStage: e.target.value})} className="input-field">
                  <option value="seedling">Seedling</option>
                  <option value="vegetative">Vegetative</option>
                  <option value="flowering">Flowering</option>
                  <option value="fruiting">Fruiting</option>
                  <option value="mature">Mature</option>
                </select>
              </div>
            </div>

            <button onClick={handleGenerate} disabled={loading} className="btn-primary w-full text-xl">
              {loading ? 'Analyzing...' : '🤖 Generate Recommendation'}
            </button>
          </div>
        </div>

        {recommendation && (
          <>
            <div className="card bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">AI Recommendation</h3>
                <div className="text-right">
                  <p className="text-sm opacity-90">Confidence</p>
                  <p className="text-3xl font-bold">{recommendation.confidence}%</p>
                </div>
              </div>
              <p className="text-lg leading-relaxed">{recommendation.reasoning}</p>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="text-green-600" />
                Harvest Timing
              </h3>
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <p className="text-3xl font-bold text-green-600 mb-2">
                  {recommendation.harvestDate.daysFromNow} Days
                </p>
                <p className="text-gray-700">
                  Recommended Date: {new Date(recommendation.harvestDate.recommended).toLocaleDateString('en-IN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="text-blue-600" />
                Best Market
              </h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-800">{recommendation.market.name}</h4>
                    <p className="text-gray-600">{recommendation.market.distance} km away</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-600">₹{recommendation.market.price}</p>
                    <p className="text-sm text-gray-600">/quintal</p>
                  </div>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="text-sm text-gray-600">Expected Profit (10 quintals)</p>
                  <p className="text-2xl font-bold text-green-600">₹{Math.round(recommendation.market.profit * 10)}</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="text-orange-600" />
                Spoilage Risk
              </h3>
              <div className={`p-4 rounded-lg ${
                recommendation.spoilageRisk.level === 'low' ? 'bg-green-50 border-l-4 border-green-500' :
                recommendation.spoilageRisk.level === 'medium' ? 'bg-yellow-50 border-l-4 border-yellow-500' :
                'bg-red-50 border-l-4 border-red-500'
              }`}>
                <p className="text-2xl font-bold uppercase mb-2">{recommendation.spoilageRisk.level} Risk</p>
                <p className="text-gray-700">Risk Score: {recommendation.spoilageRisk.score}/100</p>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="text-purple-600" />
                Top Influencing Factors
              </h3>
              <div className="space-y-3">
                {recommendation.factors.map((factor, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold">{factor.name}</h4>
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-bold">
                        {factor.impact}% impact
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{factor.description}</p>
                    <div className="mt-2 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{width: `${factor.impact}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card bg-gradient-to-r from-green-500 to-emerald-600 text-white">
              <h3 className="text-xl font-bold mb-3">💡 Why This Recommendation?</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Market prices are currently {recommendation.factors[0]?.description.toLowerCase()}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Weather conditions optimal for next {recommendation.harvestDate.daysFromNow} days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Low competition expected in recommended market</span>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Recommendations;
