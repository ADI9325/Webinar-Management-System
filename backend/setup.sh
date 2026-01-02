#!/bin/bash

echo "🚀 Webinar Management System - Backend Setup"
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

echo "🔍 Checking MongoDB connection..."
if mongosh --eval "db.version()" > /dev/null 2>&1; then
    echo "✅ MongoDB is running"
elif mongo --eval "db.version()" > /dev/null 2>&1; then
    echo "✅ MongoDB is running"
else
    echo "⚠️  MongoDB is not running. Please start MongoDB first:"
    echo "   sudo systemctl start mongod"
    echo "   OR"
    echo "   brew services start mongodb-community"
    echo ""
fi

echo ""
echo "📝 Environment variables:"
if [ -f .env ]; then
    echo "✅ .env file exists"
    cat .env
else
    echo "⚠️  .env file not found. Creating default..."
    echo "PORT=3000" > .env
    echo "MONGODB_URI=mongodb://localhost:27017/webinar-system" >> .env
    echo "✅ Created .env file with default values"
fi

echo ""
echo "🎯 Ready to start!"
echo ""
echo "Run the following command to start the server:"
echo "  npm run start:dev"
echo ""
echo "Or use:"
echo "  npm run build && npm start (for production)"
echo ""
