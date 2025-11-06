#!/bin/bash

echo "================================"
echo "Starting ERP Municipal Services"
echo "================================"

# Start Backend Services
echo "Starting Backend Services..."

cd backend/auth-service
echo "  ➜ Starting Auth Service (port 8081)..."
mvn spring-boot:run > ../../logs/auth-service.log 2>&1 &
AUTH_PID=$!

cd ../hr-service
echo "  ➜ Starting HR Service (port 8082)..."
mvn spring-boot:run > ../../logs/hr-service.log 2>&1 &
HR_PID=$!

cd ../budget-service
echo "  ➜ Starting Budget Service (port 8083)..."
mvn spring-boot:run > ../../logs/budget-service.log 2>&1 &
BUDGET_PID=$!

cd ../claims-service
echo "  ➜ Starting Claims Service (port 8084)..."
mvn spring-boot:run > ../../logs/claims-service.log 2>&1 &
CLAIMS_PID=$!

cd ../reports-service
echo "  ➜ Starting Reports Service (port 8085)..."
mvn spring-boot:run > ../../logs/reports-service.log 2>&1 &
REPORTS_PID=$!

cd ../..

# Start AI Services
echo ""
echo "Starting AI Services..."

cd ai/ai-security
echo "  ➜ Starting AI Security Service (port 9001)..."
uvicorn main:app --host 0.0.0.0 --port 9001 > ../../logs/ai-security.log 2>&1 &
AI_SEC_PID=$!

cd ../ai-analytics
echo "  ➜ Starting AI Analytics Service (port 9002)..."
uvicorn main:app --host 0.0.0.0 --port 9002 > ../../logs/ai-analytics.log 2>&1 &
AI_ANA_PID=$!

cd ../ai-budget
echo "  ➜ Starting AI Budget Service (port 9003)..."
uvicorn main:app --host 0.0.0.0 --port 9003 > ../../logs/ai-budget.log 2>&1 &
AI_BUD_PID=$!

cd ../ai-claims
echo "  ➜ Starting AI Claims Service (port 9004)..."
uvicorn main:app --host 0.0.0.0 --port 9004 > ../../logs/ai-claims.log 2>&1 &
AI_CLA_PID=$!

cd ../ai-rh
echo "  ➜ Starting AI RH Service (port 9005)..."
uvicorn main:app --host 0.0.0.0 --port 9005 > ../../logs/ai-rh.log 2>&1 &
AI_RH_PID=$!

cd ../..

# Start Frontend
echo ""
echo "Starting Frontend..."
cd frontend/erp-ui
echo "  ➜ Starting Angular Frontend (port 4200)..."
npm start > ../../logs/frontend.log 2>&1 &
FRONTEND_PID=$!

cd ../..

# Save PIDs
mkdir -p .pids
echo $AUTH_PID > .pids/auth-service.pid
echo $HR_PID > .pids/hr-service.pid
echo $BUDGET_PID > .pids/budget-service.pid
echo $CLAIMS_PID > .pids/claims-service.pid
echo $REPORTS_PID > .pids/reports-service.pid
echo $AI_SEC_PID > .pids/ai-security.pid
echo $AI_ANA_PID > .pids/ai-analytics.pid
echo $AI_BUD_PID > .pids/ai-budget.pid
echo $AI_CLA_PID > .pids/ai-claims.pid
echo $AI_RH_PID > .pids/ai-rh.pid
echo $FRONTEND_PID > .pids/frontend.pid

echo ""
echo "================================"
echo "All Services Started!"
echo "================================"
echo ""
echo "Services running:"
echo "  • Auth Service:      http://localhost:8081"
echo "  • HR Service:        http://localhost:8082"
echo "  • Budget Service:    http://localhost:8083"
echo "  • Claims Service:    http://localhost:8084"
echo "  • Reports Service:   http://localhost:8085"
echo "  • AI Security:       http://localhost:9001"
echo "  • AI Analytics:      http://localhost:9002"
echo "  • AI Budget:         http://localhost:9003"
echo "  • AI Claims:         http://localhost:9004"
echo "  • AI RH:             http://localhost:9005"
echo "  • Frontend:          http://localhost:4200"
echo ""
echo "Logs available in: ./logs/"
echo "To stop all services: ./stop-all.sh"
echo ""
