import React, { useState } from 'react';
import { Shield, AlertTriangle, Lock, Eye, Activity, Users } from 'lucide-react';

const SecurityAuditDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('24h');
  
  const securityMetrics = {
    alerts: 23,
    incidents: 2,
    vulnerabilities: 5,
    accessAttempts: 1205,
    activeUsers: 89,
    securityScore: 94
  };

  const recentAlerts = [
    { id: 1, type: 'warning', message: 'Multiple failed login attempts detected', timestamp: '2024-11-30 10:15:23' },
    { id: 2, type: 'critical', message: 'Unusual API access pattern detected', timestamp: '2024-11-30 09:45:12' },
    { id: 3, type: 'info', message: 'Security patch available for deployment', timestamp: '2024-11-30 08:30:00' }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Security Audit Dashboard</h2>
        <select 
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-75">Security Score</p>
              <p className="text-3xl font-bold">{securityMetrics.securityScore}%</p>
            </div>
            <Shield className="w-12 h-12 opacity-75" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-75">Active Alerts</p>
              <p className="text-3xl font-bold">{securityMetrics.alerts}</p>
            </div>
            <AlertTriangle className="w-12 h-12 opacity-75" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-75">Active Users</p>
              <p className="text-3xl font-bold">{securityMetrics.activeUsers}</p>
            </div>
            <Users className="w-12 h-12 opacity-75" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Security Alerts</h3>
          <div className="space-y-4">
            {recentAlerts.map(alert => (
              <div key={alert.id} className="flex items-center p-3 border rounded">
                <AlertTriangle className={`w-5 h-5 mr-3 ${
                  alert.type === 'critical' ? 'text-red-500' :
                  alert.type === 'warning' ? 'text-yellow-500' :
                  'text-blue-500'
                }`} />
                <div>
                  <p className="font-medium">{alert.message}</p>
                  <p className="text-sm text-gray-500">{alert.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Security Metrics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-2 border-b">
              <div className="flex items-center">
                <Lock className="w-5 h-5 text-blue-500 mr-2" />
                <span>Failed Authentication Attempts</span>
              </div>
              <span className="font-semibold">{securityMetrics.accessAttempts}</span>
            </div>
            <div className="flex items-center justify-between p-2 border-b">
              <div className="flex items-center">
                <Eye className="w-5 h-5 text-purple-500 mr-2" />
                <span>Open Vulnerabilities</span>
              </div>
              <span className="font-semibold">{securityMetrics.vulnerabilities}</span>
            </div>
            <div className="flex items-center justify-between p-2 border-b">
              <div className="flex items-center">
                <Activity className="w-5 h-5 text-red-500 mr-2" />
                <span>Security Incidents</span>
              </div>
              <span className="font-semibold">{securityMetrics.incidents}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityAuditDashboard;
