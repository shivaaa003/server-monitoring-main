#!/bin/bash

echo "Setting up Server Monitoring Dashboard"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo " Node.js is not installed. Please install Node.js v14 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 14 ]; then
    echo " Node.js version 14 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo " Node.js version: $(node -v)"

# Make monitor script executable
chmod +x monitor.sh

# Install dependencies
echo " Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo " Dependencies installed successfully!"
else
    echo " Failed to install dependencies"
    exit 1
fi

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo " Project built successfully!"
else
    echo "Failed to build project"
    exit 1
fi

echo ""
echo "Setup completed successfully!"
echo ""
echo "To start the development server:"
echo "  npm run dev"
echo ""
echo "To start the production server:"
echo "  npm run server"
echo ""
echo "The dashboard will be available at:"
echo "  Development: http://localhost:3000"
echo "  Production:  http://localhost:3001"
echo "" 