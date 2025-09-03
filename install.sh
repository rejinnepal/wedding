#!/bin/bash

echo "🎉 Welcome to Abhishek & Richa's Wedding Website Setup! 🎉"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v14 or higher) first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 14 ]; then
    echo "❌ Node.js version 14 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd client
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

cd ..

# Create logs directory
echo "📁 Creating logs directory..."
mkdir -p logs

# Check if config.env exists
if [ ! -f "config.env" ]; then
    echo "📝 Creating config.env file..."
    cat > config.env << EOF
MONGODB_URI=mongodb://localhost:27017/wedding-website
PORT=5000
NODE_ENV=development
EOF
    echo "✅ Created config.env file"
    echo "⚠️  Please update the MongoDB URI in config.env if needed"
else
    echo "✅ config.env already exists"
fi

echo ""
echo "🎉 Installation completed successfully! 🎉"
echo "=================================================="
echo ""
echo "Next steps:"
echo "1. Make sure MongoDB is running"
echo "2. Update config.env with your MongoDB connection string if needed"
echo "3. Start the application:"
echo "   - Development mode: npm run dev"
echo "   - Backend only: npm run server"
echo "   - Frontend only: npm run client"
echo ""
echo "Access the website at:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend API: http://localhost:5000"
echo "   - Admin View: http://localhost:3000/admin-view"
echo ""
echo "Happy coding! 💕"
