import React, { useState, useEffect } from 'react';
import { Server, Database, Globe, Wifi, Shield } from 'lucide-react';

const NetworkTopology = () => {
  const [networkStatus, setNetworkStatus] = useState({
    nodes: {
      active: 12,
      total: 15,
      validators: 8
    },
    connections: {
      active: 45,
      latency: 24,
      bandwidth: 85
    }
  });

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-gray-50">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Network Topology</h2>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center mb-2">
              <Server className="w-6 h-6 text-blue-500 mr-2" />
              <span className="font-semibold">Active Nodes</span>
            </div>
            <div className="text-2xl font-bold">
              {networkStatus.nodes.active}/{networkStatus.nodes.total}
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <div className="flex items-center mb-2">
              <Shield className="w-6 h-6 text-green-500 mr-2" />
              <span className="font-semibold">Validators</span>
            </div>
            <div className="text-2xl font-bold">
              {networkStatus.nodes.validators}
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <div className="flex items-center mb-2">
              <Wifi className="w-6 h-6 text-purple-500 mr-2" />
              <span className="font-semibold">Network Load</span>
            </div>
            <div className="text-2xl font-bold">
              {networkStatus.connections.bandwidth}%
            </div>
          </div>
        </div>

        <div className="relative w-full h-96 border rounded-lg p-4">
          {/* Interactive network map would be rendered here */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500">Interactive network visualization would be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkTopology;
