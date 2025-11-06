#!/bin/bash

# Script pour démarrer un service individuel
# Usage: ./start-service.sh <service-name>

SERVICE=$1

if [ -z "$SERVICE" ]; then
    echo "Usage: ./start-service.sh <service-name>"
    echo ""
    echo "Services disponibles:"
    echo "  Backend (Spring Boot):"
    echo "    - auth"
    echo "    - hr"
    echo "    - budget"
    echo "    - claims"
    echo "    - reports"
    echo ""
    echo "  AI (FastAPI):"
    echo "    - ai-security"
    echo "    - ai-analytics"
    echo "    - ai-budget"
    echo "    - ai-claims"
    echo "    - ai-rh"
    echo ""
    echo "  Frontend:"
    echo "    - frontend"
    echo ""
    echo "Exemples:"
    echo "  ./start-service.sh auth"
    echo "  ./start-service.sh hr"
    echo "  ./start-service.sh ai-security"
    echo "  ./start-service.sh frontend"
    exit 1
fi

# Créer le dossier logs s'il n'existe pas
mkdir -p logs
mkdir -p .pids

case $SERVICE in
    auth)
        echo "🚀 Démarrage du Auth Service (port 8081)..."
        cd backend/auth-service
        mvn spring-boot:run > ../../logs/auth-service.log 2>&1 &
        echo $! > ../../.pids/auth-service.pid
        echo "✅ Auth Service démarré (PID: $!)"
        echo "📝 Logs: logs/auth-service.log"
        echo "🔍 Vérification: curl http://localhost:8081/actuator/health"
        ;;
    
    hr)
        echo "🚀 Démarrage du HR Service (port 8082)..."
        cd backend/hr-service
        mvn spring-boot:run > ../../logs/hr-service.log 2>&1 &
        echo $! > ../../.pids/hr-service.pid
        echo "✅ HR Service démarré (PID: $!)"
        echo "📝 Logs: logs/hr-service.log"
        echo "🔍 Vérification: curl http://localhost:8082/api/employees"
        ;;
    
    budget)
        echo "🚀 Démarrage du Budget Service (port 8083)..."
        cd backend/budget-service
        mvn spring-boot:run > ../../logs/budget-service.log 2>&1 &
        echo $! > ../../.pids/budget-service.pid
        echo "✅ Budget Service démarré (PID: $!)"
        echo "📝 Logs: logs/budget-service.log"
        echo "🔍 Vérification: curl http://localhost:8083/api/budgets"
        ;;
    
    claims)
        echo "🚀 Démarrage du Claims Service (port 8084)..."
        cd backend/claims-service
        mvn spring-boot:run > ../../logs/claims-service.log 2>&1 &
        echo $! > ../../.pids/claims-service.pid
        echo "✅ Claims Service démarré (PID: $!)"
        echo "📝 Logs: logs/claims-service.log"
        echo "🔍 Vérification: curl http://localhost:8084/api/claims"
        ;;
    
    reports)
        echo "🚀 Démarrage du Reports Service (port 8085)..."
        cd backend/reports-service
        mvn spring-boot:run > ../../logs/reports-service.log 2>&1 &
        echo $! > ../../.pids/reports-service.pid
        echo "✅ Reports Service démarré (PID: $!)"
        echo "📝 Logs: logs/reports-service.log"
        echo "🔍 Vérification: curl http://localhost:8085/api/reports/dashboard/stats"
        ;;
    
    ai-security)
        echo "🚀 Démarrage du AI Security Service (port 9001)..."
        cd ai/ai-security
        uvicorn main:app --host 0.0.0.0 --port 9001 > ../../logs/ai-security.log 2>&1 &
        echo $! > ../../.pids/ai-security.pid
        echo "✅ AI Security Service démarré (PID: $!)"
        echo "📝 Logs: logs/ai-security.log"
        echo "🔍 Vérification: curl http://localhost:9001/health"
        ;;
    
    ai-analytics)
        echo "🚀 Démarrage du AI Analytics Service (port 9002)..."
        cd ai/ai-analytics
        uvicorn main:app --host 0.0.0.0 --port 9002 > ../../logs/ai-analytics.log 2>&1 &
        echo $! > ../../.pids/ai-analytics.pid
        echo "✅ AI Analytics Service démarré (PID: $!)"
        echo "📝 Logs: logs/ai-analytics.log"
        echo "🔍 Vérification: curl http://localhost:9002/health"
        ;;
    
    ai-budget)
        echo "🚀 Démarrage du AI Budget Service (port 9003)..."
        cd ai/ai-budget
        uvicorn main:app --host 0.0.0.0 --port 9003 > ../../logs/ai-budget.log 2>&1 &
        echo $! > ../../.pids/ai-budget.pid
        echo "✅ AI Budget Service démarré (PID: $!)"
        echo "📝 Logs: logs/ai-budget.log"
        echo "🔍 Vérification: curl http://localhost:9003/health"
        ;;
    
    ai-claims)
        echo "🚀 Démarrage du AI Claims Service (port 9004)..."
        cd ai/ai-claims
        uvicorn main:app --host 0.0.0.0 --port 9004 > ../../logs/ai-claims.log 2>&1 &
        echo $! > ../../.pids/ai-claims.pid
        echo "✅ AI Claims Service démarré (PID: $!)"
        echo "📝 Logs: logs/ai-claims.log"
        echo "🔍 Vérification: curl http://localhost:9004/health"
        ;;
    
    ai-rh)
        echo "🚀 Démarrage du AI RH Service (port 9005)..."
        cd ai/ai-rh
        uvicorn main:app --host 0.0.0.0 --port 9005 > ../../logs/ai-rh.log 2>&1 &
        echo $! > ../../.pids/ai-rh.pid
        echo "✅ AI RH Service démarré (PID: $!)"
        echo "📝 Logs: logs/ai-rh.log"
        echo "🔍 Vérification: curl http://localhost:9005/health"
        ;;
    
    frontend)
        echo "🚀 Démarrage du Frontend (port 4200)..."
        cd frontend/erp-ui
        npm start > ../../logs/frontend.log 2>&1 &
        echo $! > ../../.pids/frontend.pid
        echo "✅ Frontend démarré (PID: $!)"
        echo "📝 Logs: logs/frontend.log"
        echo "🌐 URL: http://localhost:4200"
        ;;
    
    *)
        echo "❌ Service inconnu: $SERVICE"
        echo ""
        echo "Services disponibles:"
        echo "  auth, hr, budget, claims, reports"
        echo "  ai-security, ai-analytics, ai-budget, ai-claims, ai-rh"
        echo "  frontend"
        exit 1
        ;;
esac

echo ""
echo "Pour voir les logs en temps réel:"
echo "  tail -f logs/$SERVICE.log"
echo ""
echo "Pour arrêter le service:"
echo "  kill \$(cat .pids/$SERVICE.pid)"
