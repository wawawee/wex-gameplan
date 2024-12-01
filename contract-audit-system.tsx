import React, { useState } from 'react';
import { AlertCircle, CheckCircle, FileCode, Shield, GitBranch, Terminal } from 'lucide-react';

const ContractAuditSystem = () => {
  const [selectedContract, setSelectedContract] = useState('trading');
  
  const auditMetrics = {
    trading: {
      securityScore: 92,
      vulnerabilities: {
        critical: 0,
        high: 1,
        medium: 3,
        low: 5
      },
      coverage: 98.5,
      lastAudit: '2024-11-28',
      gasEfficiency: 87,
      issues: [
        { id: 1, type: 'high', title: 'Potential reentrancy in withdraw()', location: 'Trading.sol:245' },
        { id: 2, type: 'medium', title: 'Timestamp dependency', location: 'Trading.sol:178' },
        { id: 3, type: 'medium', title: 'Unchecked external call', location: 'Trading.sol:302' }
      ]
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Smart Contract Audit Dashboard</h2>
        <select
          value={selectedContract}
          onChange={(e) => setSelectedContract(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="trading">Trading Contract</option>
          <option value="custody">Custody Contract</option>
          <option value="token">Token Contract</option>
        </select>
      </div>

      {/* Audit Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Security Score</p>
              <p className="text-2xl font-bold">{auditMetrics[selectedContract].securityScore}%</p>
            </div>
            <Shield className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Code Coverage</p>
              <p className="text-2xl font-bold">{auditMetrics[selectedContract].coverage}%</p>
            </div>
            <FileCode className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Gas Efficiency</p>
              <p className="text-2xl font-bold">{auditMetrics[selectedContract].gasEfficiency}%</p>
            </div>
            <Terminal className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Last Audit</p>
              <p className="text-2xl font-bold">{auditMetrics[selectedContract].lastAudit}</p>
            </div>
            <GitBranch className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Vulnerabilities Panel */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Vulnerability Summary</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 border-b">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <span>Critical</span>
              </div>
              <span className="font-semibold">{auditMetrics[selectedContract].vulnerabilities.critical}</span>
            </div>
            <div className="flex items-center justify-between p-2 border-b">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-orange-500 mr-2" />
                <span>High</span>
              </div>
              <span className="font-semibold">{auditMetrics[selectedContract].vulnerabilities.high}</span>
            </div>
            <div className="flex items-center justify-between p-2 border-b">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
                <span>Medium</span>
              </div>
              <span className="font-semibold">{auditMetrics[selectedContract].vulnerabilities.medium}</span>
            </div>
            <div className="flex items-center justify-between p-2 border-b">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-blue-500 mr-2" />
                <span>Low</span>
              </div>
              <span className="font-semibold">{auditMetrics[selectedContract].vulnerabilities.low}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Issues</h3>
          <div className="space-y-4">
            {auditMetrics[selectedContract].issues.map(issue => (
              <div key={issue.id} className="flex items-start p-3 border rounded">
                <AlertCircle className={`w-5 h-5 mr-3 flex-shrink-0 ${
                  issue.type === 'critical' ? 'text-red-500' :
                  issue.type === 'high' ? 'text-orange-500' :
                  issue.type === 'medium' ? 'text-yellow-500' :
                  'text-blue-500'
                }`} />
                <div>
                  <p className="font-medium">{issue.title}</p>
                  <p className="text-sm text-gray-500">{issue.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractAuditSystem;
