import React from 'react';
import { Process } from '../types';
import { Activity, Cpu, Database } from 'lucide-react';

interface ProcessListProps {
  processes: Process[];
}

const ProcessList: React.FC<ProcessListProps> = ({ processes }) => {
  const sortedProcesses = [...processes].sort((a, b) => b.cpu - a.cpu);

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-4">
        <Activity className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Top Processes
        </h2>
      </div>
      
      <div className="space-y-3">
        {sortedProcesses.map((process, index) => (
          <div
            key={`${process.name}-${index}`}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                  {process.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {process.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  PID: {Math.floor(Math.random() * 9999) + 1000}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Cpu className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {process.cpu.toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Database className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {process.memory.toFixed(0)} MB
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-600">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {processes.length} processes • Sorted by CPU usage
        </div>
      </div>
    </div>
  );
};

export default ProcessList; 