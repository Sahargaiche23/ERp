#!/bin/bash

echo "================================"
echo "Starting Frontend Only"
echo "================================"

cd frontend/erp-ui
echo "  ➜ Starting Angular Frontend (port 4200)..."
npm start &
FRONTEND_PID=$!

cd ../..

mkdir -p .pids
echo $FRONTEND_PID > .pids/frontend.pid

echo ""
echo "Frontend started: http://localhost:4200"
echo "Note: Backend services are not running."
echo ""
