#!/bin/bash

echo "🎨 Webinar Management System - Frontend Setup"
echo "=============================================="
echo ""

echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Dependencies installed successfully!"
echo ""

echo "📝 Environment variables:"
if [ -f .env ]; then
    echo "✅ .env file exists"
    cat .env
else
    echo "⚠️  .env file not found. Creating from example..."
    cp .env.example .env
    echo "✅ Created .env file"
fi

echo ""
echo "🎯 Ready to start!"
echo ""
echo "Run the following command to start the development server:"
echo "  npm run dev"
echo ""
echo "Frontend will run on: http://localhost:5173"
echo ""
echo "⚠️  Make sure backend is running on http://localhost:3000"
echo ""
