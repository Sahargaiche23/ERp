#!/bin/bash

echo "================================"
echo "Starting ERP (Production Mode)"
echo "================================"

# Build frontend
echo "Building frontend..."
cd frontend/erp-ui
npm run build
cd ../..

# Start Backend Services
echo "Starting Backend Services..."

cd backend/auth-service
mvn spring-boot:run > ../../logs/auth-service.log 2>&1 &
AUTH_PID=$!

cd ../hr-service
mvn spring-boot:run > ../../logs/hr-service.log 2>&1 &
HR_PID=$!

cd ../budget-service
mvn spring-boot:run > ../../logs/budget-service.log 2>&1 &
BUDGET_PID=$!

cd ../claims-service
mvn spring-boot:run > ../../logs/claims-service.log 2>&1 &
CLAIMS_PID=$!

cd ../reports-service
mvn spring-boot:run > ../../logs/reports-service.log 2>&1 &
REPORTS_PID=$!

cd ../..

# Start AI Services
cd ai/ai-security
uvicorn main:app --host 0.0.0.0 --port 9001 > ../../logs/ai-security.log 2>&1 &
cd ../ai-analytics
uvicorn main:app --host 0.0.0.0 --port 9002 > ../../logs/ai-analytics.log 2>&1 &
cd ../ai-budget
uvicorn main:app --host 0.0.0.0 --port 9003 > ../../logs/ai-budget.log 2>&1 &
cd ../ai-claims
uvicorn main:app --host 0.0.0.0 --port 9004 > ../../logs/ai-claims.log 2>&1 &
cd ../ai-rh
uvicorn main:app --host 0.0.0.0 --port 9005 > ../../logs/ai-rh.log 2>&1 &
cd ../..

# Serve frontend with Python HTTP server
echo "Starting frontend server..."
cd frontend/erp-ui/dist/erp-ui/browser
python3 -m http.server 4200 > ../../../../../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ../../../../..

mkdir -p .pids
echo $AUTH_PID > .pids/auth-service.pid
echo $HR_PID > .pids/hr-service.pid
echo $BUDGET_PID > .pids/budget-service.pid
echo $CLAIMS_PID > .pids/claims-service.pid
echo $REPORTS_PID > .pids/reports-service.pid
echo $FRONTEND_PID > .pids/frontend.pid

echo ""
echo "================================"
echo "All Services Started!"
echo "================================"
echo ""
echo "Frontend: http://localhost:4200"
echo "Backends: http://localhost:8081-8085"
echo "AI: http://localhost:9001-9005"
echo ""
echo "To stop: ./stop-all.sh"
echo ""
