import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Clock, Zap, Activity, AlertTriangle } from 'lucide-react';

const PerformanceProfiler = () => {
  const [metrics, setMetrics] = useState({
    orderProcessing: {
      latency: 45,
      throughput: 1240,
      errorRate: 0.02,
      queueDepth: 23
    },
    systemResources: {
      cpu: 65,
      memory: 72,
      disk: 48,
      network: 58
    }
  });

  const [historicalData] = useState([
    { time: '10:00', latency: 42, throughput: 1200, cpu: 62, memory: 70 },
    { time: '10:05', latency: 45, throughput: 1240, cpu: 65, memory: 72 },
    { time: '10:10', latency: 43, throughput: 1220, cpu: 63, memory: 71 }
    // Additional historical data would be populated here
  ]);

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">System Performance Profile</h2>
        <p className="text-gray-600">Real-time performance metrics and resource utilization</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-gray-600">Latency</span>
              </div>
              <p className="text-2xl font-bold mt-2">{metrics.orderProcessing.latency}ms</p>
            </div>
            <div className="text-sm text-green-500">-2.3%</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="text-gray-600">Throughput</span>
              </div>
              <p className="text-2xl font-bold mt-2">{metrics.orderProcessing.throughput}/s</p>
            </div>
            <div className="text-sm text-green-500">+3.1%</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <Activity className="w-5 h-5 text-purple-500 mr-2" />
                <span className="text-gray-600">CPU Usage</span>
              </div>
              <p className="text-2xl font-bold mt-2">{metrics.systemResources.cpu}%</p>
            </div>
            <div className="text-sm text-orange-500">+5.2%</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-gray-600">Error Rate</span>
              </div>
              <p className="text-2xl font-bold mt-2">{(metrics.orderProcessing.errorRate * 100).toFixed(2)}%</p>
            </div>
            <div className="text-sm text-green-500">-0.5%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Performance Trends</h3>
          <LineChart width={500} height={300} data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="latency" stroke="#3b82f6" />
            <Line type="monotone" dataKey="throughput" stroke="#10b981" />
          </LineChart>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Resource Utilization</h3>
          <AreaChart width={500} height={300} data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="cpu" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
            <Area type="monotone" dataKey="memory" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
          </AreaChart>
        </div>
      </div>
    </div>
  );
};

export default PerformanceProfiler;
