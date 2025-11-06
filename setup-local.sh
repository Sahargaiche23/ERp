#!/bin/bash

echo "================================"
echo "ERP Municipal - Local Setup"
echo "================================"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install it first:"
    echo "   sudo apt install postgresql postgresql-contrib"
    exit 1
fi

echo "✓ PostgreSQL found"

# Create databases
echo "Creating PostgreSQL databases..."
sudo -u postgres psql -c "CREATE DATABASE erp_auth;" 2>/dev/null || echo "  Database erp_auth already exists"
sudo -u postgres psql -c "CREATE DATABASE erp_hr;" 2>/dev/null || echo "  Database erp_hr already exists"
sudo -u postgres psql -c "CREATE DATABASE erp_budget;" 2>/dev/null || echo "  Database erp_budget already exists"
sudo -u postgres psql -c "CREATE DATABASE erp_claims;" 2>/dev/null || echo "  Database erp_claims already exists"
sudo -u postgres psql -c "CREATE DATABASE erp_reports;" 2>/dev/null || echo "  Database erp_reports already exists"

echo "✓ Databases created"

# Check if Redis is installed
if ! command -v redis-server &> /dev/null; then
    echo "⚠️  Redis is not installed (optional for auth-service)"
    echo "   To install: sudo apt install redis-server"
else
    echo "✓ Redis found"
    sudo systemctl start redis-server 2>/dev/null || echo "  Redis already running"
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it first:"
    echo "   sudo apt install nodejs npm"
    exit 1
fi

echo "✓ Node.js found ($(node --version))"

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java 17:"
    echo "   sudo apt install openjdk-17-jdk"
    exit 1
fi

echo "✓ Java found ($(java --version | head -n 1))"

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven is not installed. Please install it:"
    echo "   sudo apt install maven"
    exit 1
fi

echo "✓ Maven found"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 is not installed. Please install it:"
    echo "   sudo apt install python3 python3-pip"
    exit 1
fi

echo "✓ Python3 found ($(python3 --version))"

echo ""
echo "================================"
echo "Setup Complete!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Install frontend dependencies: cd frontend/erp-ui && npm install"
echo "2. Update database credentials in backend/*/src/main/resources/application.properties"
echo "3. Update email credentials in backend/auth-service/src/main/resources/application.properties"
echo "4. Install Python dependencies for AI services: cd ai/ai-* && pip install -r requirements.txt"
echo "5. Run the application using: ./start-all.sh"
echo ""
