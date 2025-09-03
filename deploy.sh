#!/bin/bash

echo "🚀 Deploying Abhishek & Richa's Wedding Website to GitHub Pages..."

# Install dependencies
echo "📦 Installing dependencies..."
npm run install-all

# Build the project
echo "🔨 Building the project..."
cd client && npm run build

# Deploy to GitHub Pages
echo "🚀 Deploying to GitHub Pages..."
npm run deploy

echo "✅ Deployment complete!"
echo "🌐 Your website will be available at: https://[your-username].github.io/[repository-name]"
echo "📝 Don't forget to:"
echo "   1. Update the API URLs in RSVP.js and AdminView.js with your actual backend domain"
echo "   2. Enable GitHub Pages in your repository settings"
echo "   3. Set the source to 'gh-pages' branch"
