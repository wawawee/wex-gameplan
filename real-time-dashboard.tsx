import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { AlertCircle, CheckCircle, Clock, Database, Server, Activity } from 'lucide-react';

const RealTimeSystemDashboard = () => {
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: [],
    memory: [],
    orders: [],
    transactions: []
  });

  const [systemHealth, setSystemHealth] = useState({
    status: 'operational',
    activeNodes: 12,
    pendingTransactions: 156,
    averageLatency: 45
  });

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        cpu: [...prev.cpu.slice(-20), Math.random() * 100],
        memory: [...prev.memory.slice(-20), Math.random() * 100],
        orders: [...prev.orders.slice(-20), Math.random() * 1000],
        transactions: [...prev.transactions.slice(-20), Math.random() * 500]
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Server className="w-6 h-6 text-blue-500 mr-2" />
              <span className="text-lg font-semibold">System Status</span>
            </div>
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
          <p className="mt-2 text-2xl font-bold">Active: {systemHealth.activeNodes} nodes</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="w-6 h-6 text-orange-500 mr-2" />
            <span className="text-lg font-semibold">Latency</span>
          </div>
          <p className="mt-2 text-2xl font-bold">{systemHealth.averageLatency}ms</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Database className="w-6 h-6 text-purple-500 mr-2" />
            <span className="text-lg font-semibold">Pending Tx</span>
          </div>
          <p className="mt-2 text-2xl font-bold">{systemHealth.pendingTransactions}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Activity className="w-6 h-6 text-red-500 mr-2" />
            <span className="text-lg font-semibold">System Load</span>
          </div>
          <p className="mt-2 text-2xl font-bold">
            {systemMetrics.cpu[systemMetrics.cpu.length - 1]?.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">System Resources</h3>
          <AreaChart width={500} height={300} data={systemMetrics.cpu.map((value, index) => ({
            time: index,
            cpu: value,
            memory: systemMetrics.memory[index]
          }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="cpu" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="memory" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Transaction Volume</h3>
          <LineChart width={500} height={300} data={systemMetrics.orders.map((value, index) => ({
            time: index,
            orders: value,
            transactions: systemMetrics.transactions[index]
          }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="orders" stroke="#8884d8" />
            <Line type="monotone" dataKey="transactions" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default RealTimeSystemDashboard;
