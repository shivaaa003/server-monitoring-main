import React from 'react';
import { ServerData } from '../types';
import MetricCard from './MetricCard';
import ProcessList from './ProcessList';
import SystemInfo from './SystemInfo';
import { formatDistanceToNow } from 'date-fns';

interface DashboardProps {
  serverData: ServerData | null;
  isConnected: boolean;
  isLoading: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ serverData, isConnected, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading server data...
          </p>
        </div>
      </div>
    );
  }

  if (!serverData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="status-indicator status-offline" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {isConnected ? 'No data available' : 'Unable to connect to server'}
          </p>
        </div>
      </div>
    );
  }

  const { cpu, memory, disk, processes, uptime, os, timestamp } = serverData;

  // Safely format the timestamp
  const formatTimestamp = (timestamp: Date | string) => {
    try {
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
      if (isNaN(date.getTime())) {
        return 'Just now';
      }
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      console.error('Error formatting timestamp:', error);
      return 'Just now';
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Bar */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`status-indicator ${isConnected ? 'status-online' : 'status-offline'}`} />
            <span className="font-medium">
              Server Status: {isConnected ? 'Online' : 'Offline'}
            </span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Last updated: {formatTimestamp(timestamp)}
          </div>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="CPU Usage"
          value={`${cpu.load.toFixed(1)}%`}
          subtitle={`${cpu.cores} cores • ${cpu.temperature.toFixed(1)}°C`}
          icon="cpu"
          color="blue"
          percentage={cpu.load}
        />
        
        <MetricCard
          title="Memory Usage"
          value={`${((memory.used / memory.total) * 100).toFixed(1)}%`}
          subtitle={`${(memory.used / 1024 / 1024 / 1024).toFixed(1)} GB / ${(memory.total / 1024 / 1024 / 1024).toFixed(1)} GB`}
          icon="memory"
          color="green"
          percentage={(memory.used / memory.total) * 100}
        />
        
        <MetricCard
          title="Disk Usage"
          value={`${((disk.used / disk.total) * 100).toFixed(1)}%`}
          subtitle={`${(disk.used / 1024 / 1024 / 1024).toFixed(1)} GB / ${(disk.total / 1024 / 1024 / 1024).toFixed(1)} GB`}
          icon="disk"
          color="purple"
          percentage={(disk.used / disk.total) * 100}
        />
      </div>

      {/* System Information and Processes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SystemInfo uptime={uptime} os={os} />
        <ProcessList processes={processes} />
      </div>
    </div>
  );
};

export default Dashboard; 