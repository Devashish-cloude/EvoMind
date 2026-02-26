import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MessageCircle } from 'lucide-react';

const AIChatbot = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hello! I\'m your AgriConnect AI assistant. I can help you with crop recommendations, weather insights, market prices, and farming tips. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Weather-related queries
    if (lowerMessage.includes('weather') || lowerMessage.includes('rain') || lowerMessage.includes('temperature')) {
      return 'Based on current weather data, we have partly cloudy conditions at 28°C with 65% humidity. There\'s a 20% chance of rain in the next 48 hours, which is ideal for natural irrigation. Would you like specific crop recommendations based on this weather?';
    }
    
    // Crop recommendations
    if (lowerMessage.includes('crop') || lowerMessage.includes('grow') || lowerMessage.includes('plant')) {
      return 'For current weather conditions (28°C, 65% humidity), I recommend:\n\n🍅 Tomato - High profit potential, low risk (₹48/kg)\n🧅 Onion - Medium profit, medium risk (₹25/kg)\n🥬 Cabbage - Medium profit, medium risk (₹14/kg)\n\nTomatoes are performing best right now due to optimal temperature and humidity levels.';
    }
    
    // Price-related queries
    if (lowerMessage.includes('price') || lowerMessage.includes('market') || lowerMessage.includes('sell')) {
      return 'Current market prices in your area:\n• Tomato: ₹48/kg (↑ trending up)\n• Onion: ₹25/kg (→ stable)\n• Cabbage: ₹14/kg (→ stable)\n\nWould you like to see nearby mandi prices or get selling recommendations?';
    }
    
    // Spoilage/storage queries
    if (lowerMessage.includes('spoil') || lowerMessage.includes('storage') || lowerMessage.includes('preserve')) {
      return 'To minimize spoilage:\n\n1. Store in cool, dry place (15-20°C)\n2. Avoid direct sunlight\n3. Use proper ventilation\n4. Check for damaged produce daily\n5. Consider selling within 3-5 days for leafy vegetables\n\nWould you like to use our Spoilage Calculator for specific crops?';
    }
    
    // Fertilizer/farming tips
    if (lowerMessage.includes('fertilizer') || lowerMessage.includes('soil') || lowerMessage.includes('pest')) {
      return 'For healthy crop growth:\n\n🌱 Use organic compost for better soil health\n💧 Maintain proper irrigation schedule\n🐛 Monitor for pests regularly\n🧪 Test soil pH every season\n\nWith current humidity at 65%, watch for fungal diseases. Apply neem-based pesticides as prevention.';
    }
    
    // Profit/income queries
    if (lowerMessage.includes('profit') || lowerMessage.includes('income') || lowerMessage.includes('earn')) {
      return 'To maximize profits:\n\n1. Focus on high-demand crops (currently Tomatoes)\n2. Time your harvest with peak market prices\n3. Reduce spoilage through proper storage\n4. Compare prices across multiple mandis\n5. Consider direct-to-consumer sales\n\nBased on current conditions, tomatoes offer the best profit margins.';
    }
    
    // Mandi/market location
    if (lowerMessage.includes('mandi') || lowerMessage.includes('where') || lowerMessage.includes('location')) {
      return 'Nearby mandis with good prices:\n\n📍 Pune APMC - 12 km away\n📍 Hadapsar Market - 8 km away\n📍 Kothrud Mandi - 15 km away\n\nCheck the Markets page for real-time prices and route optimization!';
    }
    
    // General greeting
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return 'Hello! I\'m here to help you make smarter farming decisions. You can ask me about:\n\n• Weather forecasts\n• Crop recommendations\n• Market prices\n• Storage tips\n• Farming advice\n\nWhat would you like to know?';
    }
    
    // Thank you
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return 'You\'re welcome! I\'m always here to help you succeed in farming. Feel free to ask anything else! 🌾';
    }
    
    // Default response
    return 'I can help you with:\n\n🌤️ Weather forecasts and alerts\n🌾 Crop recommendations\n💰 Market prices and trends\n📦 Storage and spoilage prevention\n🚜 Farming tips and best practices\n\nWhat would you like to know more about?';
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMsg = {
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: generateAIResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="mt-6">
      {/* Collapsed State - Small Horizontal Box */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-xl flex items-center gap-3 hover:from-green-700 hover:to-green-800 transition-all shadow-sm"
        >
          <div className="bg-white rounded-full p-2">
            <MessageCircle size={24} className="text-green-600" />
          </div>
          <div className="text-left">
            <h4 className="font-bold m-0 text-base">AI Assistant</h4>
            <p className="text-xs m-0 opacity-90">Click to chat with AgriConnect AI</p>
          </div>
        </button>
      )}

      {/* Expanded State - Full Chat Interface */}
      {isExpanded && (
        <div className="bg-white rounded-xl shadow-sm border flex flex-col" style={{ borderColor: 'var(--border-color)', height: '500px' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-full p-2">
                <Bot size={24} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-bold m-0">AgriConnect AI Assistant</h3>
                <p className="text-xs m-0 opacity-90">Ask me anything about farming</p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="hover:bg-white/20 rounded-lg px-3 py-1 text-sm transition-colors"
            >
              Minimize
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundColor: '#f9fafb' }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.type === 'bot' && (
                  <div className="bg-green-100 rounded-full p-2 h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-green-600" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] p-3 rounded-2xl ${
                    msg.type === 'user'
                      ? 'bg-green-600 text-white rounded-br-none'
                      : 'bg-white border border-gray-200 rounded-bl-none'
                  }`}
                  style={{ whiteSpace: 'pre-line' }}
                >
                  <p className="m-0 text-sm">{msg.text}</p>
                  <span className={`text-xs mt-1 block ${msg.type === 'user' ? 'text-green-100' : 'text-gray-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                {msg.type === 'user' && (
                  <div className="bg-green-600 rounded-full p-2 h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <User size={16} className="text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-2 justify-start">
                <div className="bg-green-100 rounded-full p-2 h-8 w-8 flex items-center justify-center">
                  <Bot size={16} className="text-green-600" />
                </div>
                <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about farming..."
                className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-green-600 text-white rounded-xl px-4 hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatbot;
