import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const TechnicalDocumentation = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showDemo, setShowDemo] = useState(false);

  // Sample monitoring data
  const performanceData = [
    { name: 'Jan', orders: 4000, latency: 2400, errors: 240 },
    { name: 'Feb', orders: 3000, latency: 1398, errors: 139 },
    { name: 'Mar', orders: 2000, latency: 9800, errors: 980 },
    { name: 'Apr', orders: 2780, latency: 3908, errors: 390 },
    { name: 'May', orders: 1890, latency: 4800, errors: 480 },
    { name: 'Jun', orders: 2390, latency: 3800, errors: 380 },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {/* Navigation */}
      <div className="mb-8 flex gap-4">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded ${activeTab === 'overview' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          System Overview
        </button>
        <button 
          onClick={() => setActiveTab('monitoring')}
          className={`px-4 py-2 rounded ${activeTab === 'monitoring' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Live Monitoring
        </button>
      </div>

      {/* System Status Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 border rounded shadow">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-500" />
            <span>System Status: Operational</span>
          </div>
        </div>
        <div className="p-4 border rounded shadow">
          <div className="flex items-center gap-2">
            <Info className="text-blue-500" />
            <span>Active Orders: 1,234</span>
          </div>
        </div>
        <div className="p-4 border rounded shadow">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-yellow-500" />
            <span>Warnings: 2</span>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Performance Metrics</h3>
        <div className="h-64 w-full">
          <LineChart width={800} height={250} data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="orders" stroke="#8884d8" />
            <Line type="monotone" dataKey="latency" stroke="#82ca9d" />
            <Line type="monotone" dataKey="errors" stroke="#ff7300" />
          </LineChart>
        </div>
      </div>

      {/* Demo Interface */}
      <div className="mb-8">
        <button 
          onClick={() => setShowDemo(!showDemo)}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          {showDemo ? 'Hide Demo' : 'Show Demo'}
        </button>
        {showDemo && (
          <div className="mt-4 p-4 border rounded">
            <h4 className="font-bold mb-2">Interactive Demo</h4>
            <p>Technical implementation details and interactive examples would be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicalDocumentation;
