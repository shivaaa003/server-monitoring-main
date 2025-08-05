import React, { useState, useEffect } from 'react';
import { Activity, Moon, Sun, Wifi, WifiOff } from 'lucide-react';
import Dashboard from './components/Dashboard';
import { ServerData } from './types';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [serverData, setServerData] = useState<ServerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    
    // Apply dark mode class
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Fetch real monitoring data
  const fetchMonitoringData = async () => {
    try {
      const response = await fetch('/api/monitoring');
      if (!response.ok) {
        throw new Error('Failed to fetch monitoring data');
      }
      const data = await response.json();
      setServerData(data);
      setIsConnected(true);
      setError(null);
    } catch (err) {
      console.error('Error fetching monitoring data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchMonitoringData();
  }, []);

  // Set up polling for real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMonitoringData();
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-dark-800 shadow-sm border-b border-gray-200 dark:border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-8 w-8 text-primary-600" />
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Server Monitor
                </h1>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`status-indicator ${isConnected ? 'status-online' : 'status-offline'}`} />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
                {isConnected ? <Wifi className="h-4 w-4 text-green-500" /> : <WifiOff className="h-4 w-4 text-red-500" />}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="status-indicator status-offline" />
              <span className="text-red-800 dark:text-red-200 font-medium">
                Error: {error}
              </span>
            </div>
            <p className="text-red-600 dark:text-red-300 text-sm mt-1">
              Make sure the backend server is running with: npm run server
            </p>
          </div>
        )}
        
        <Dashboard 
          serverData={serverData} 
          isConnected={isConnected} 
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}

export default App; 