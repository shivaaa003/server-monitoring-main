import React from 'react';
import { Cpu, HardDrive, Database } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: 'cpu' | 'memory' | 'disk';
  color: 'blue' | 'green' | 'purple' | 'red' | 'yellow';
  percentage: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color,
  percentage
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'cpu':
        return <Cpu className="h-6 w-6" />;
      case 'memory':
        return <Database className="h-6 w-6" />;
      case 'disk':
        return <HardDrive className="h-6 w-6" />;
      default:
        return <Cpu className="h-6 w-6" />;
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return {
          icon: 'text-blue-600',
          progress: 'bg-blue-600',
          bg: 'bg-blue-50 dark:bg-blue-900/20'
        };
      case 'green':
        return {
          icon: 'text-green-600',
          progress: 'bg-green-600',
          bg: 'bg-green-50 dark:bg-green-900/20'
        };
      case 'purple':
        return {
          icon: 'text-purple-600',
          progress: 'bg-purple-600',
          bg: 'bg-purple-50 dark:bg-purple-900/20'
        };
      case 'red':
        return {
          icon: 'text-red-600',
          progress: 'bg-red-600',
          bg: 'bg-red-50 dark:bg-red-900/20'
        };
      case 'yellow':
        return {
          icon: 'text-yellow-600',
          progress: 'bg-yellow-600',
          bg: 'bg-yellow-50 dark:bg-yellow-900/20'
        };
      default:
        return {
          icon: 'text-blue-600',
          progress: 'bg-blue-600',
          bg: 'bg-blue-50 dark:bg-blue-900/20'
        };
    }
  };

  const colorClasses = getColorClasses();
  const isHighUsage = percentage > 80;
  const isMediumUsage = percentage > 60;

  return (
    <div className="metric-card">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${colorClasses.bg}`}>
          <div className={colorClasses.icon}>
            {getIcon()}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {subtitle}
        </p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${colorClasses.progress} ${
              isHighUsage ? 'animate-pulse' : ''
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        
        {/* Usage Level Indicator */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500 dark:text-gray-400">0%</span>
          <span className={`font-medium ${
            isHighUsage ? 'text-red-600' : 
            isMediumUsage ? 'text-yellow-600' : 
            'text-green-600'
          }`}>
            {percentage.toFixed(1)}%
          </span>
          <span className="text-gray-500 dark:text-gray-400">100%</span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard; 