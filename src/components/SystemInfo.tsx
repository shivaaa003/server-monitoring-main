import React from 'react';
import { Clock, Monitor, Server } from 'lucide-react';

interface SystemInfoProps {
  uptime: number;
  os: string;
}

const SystemInfo: React.FC<SystemInfoProps> = ({ uptime, os }) => {
  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-4">
        <Server className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          System Information
        </h2>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-blue-500" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                Uptime
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                System running time
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-gray-900 dark:text-white">
              {formatUptime(uptime)}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
          <div className="flex items-center space-x-3">
            <Monitor className="h-5 w-5 text-green-500" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                Operating System
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                System platform
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-gray-900 dark:text-white">
              {os}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
          <div className="flex items-center space-x-3">
            <Server className="h-5 w-5 text-purple-500" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                Server Status
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Overall health
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <div className="status-indicator status-online" />
              <span className="font-semibold text-green-600">
                Healthy
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-600">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          System information updated in real-time
        </div>
      </div>
    </div>
  );
};

export default SystemInfo; 