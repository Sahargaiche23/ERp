#!/bin/bash

# Script pour arrêter un service individuel
# Usage: ./stop-service.sh <service-name>

SERVICE=$1

if [ -z "$SERVICE" ]; then
    echo "Usage: ./stop-service.sh <service-name>"
    echo ""
    echo "Services disponibles:"
    echo "  Backend: auth, hr, budget, claims, reports"
    echo "  AI: ai-security, ai-analytics, ai-budget, ai-claims, ai-rh"
    echo "  Frontend: frontend"
    echo ""
    echo "Exemples:"
    echo "  ./stop-service.sh auth"
    echo "  ./stop-service.sh frontend"
    exit 1
fi

# Nom du fichier PID selon le service
case $SERVICE in
    auth|hr|budget|claims|reports|ai-security|ai-analytics|ai-budget|ai-claims|ai-rh|frontend)
        PID_FILE=".pids/${SERVICE}-service.pid"
        if [ "$SERVICE" = "frontend" ]; then
            PID_FILE=".pids/frontend.pid"
        elif [[ "$SERVICE" == ai-* ]]; then
            PID_FILE=".pids/${SERVICE}.pid"
        else
            PID_FILE=".pids/${SERVICE}-service.pid"
        fi
        ;;
    *)
        echo "❌ Service inconnu: $SERVICE"
        exit 1
        ;;
esac

# Vérifier si le fichier PID existe
if [ ! -f "$PID_FILE" ]; then
    echo "⚠️  Fichier PID non trouvé: $PID_FILE"
    echo ""
    echo "Le service n'a peut-être pas été démarré avec start-service.sh ou start-all.sh"
    echo ""
    echo "Pour arrêter manuellement par port:"
    
    case $SERVICE in
        auth) echo "  sudo kill -9 \$(sudo lsof -t -i:8081)" ;;
        hr) echo "  sudo kill -9 \$(sudo lsof -t -i:8082)" ;;
        budget) echo "  sudo kill -9 \$(sudo lsof -t -i:8083)" ;;
        claims) echo "  sudo kill -9 \$(sudo lsof -t -i:8084)" ;;
        reports) echo "  sudo kill -9 \$(sudo lsof -t -i:8085)" ;;
        ai-security) echo "  sudo kill -9 \$(sudo lsof -t -i:9001)" ;;
        ai-analytics) echo "  sudo kill -9 \$(sudo lsof -t -i:9002)" ;;
        ai-budget) echo "  sudo kill -9 \$(sudo lsof -t -i:9003)" ;;
        ai-claims) echo "  sudo kill -9 \$(sudo lsof -t -i:9004)" ;;
        ai-rh) echo "  sudo kill -9 \$(sudo lsof -t -i:9005)" ;;
        frontend) echo "  sudo kill -9 \$(sudo lsof -t -i:4200)" ;;
    esac
    exit 1
fi

# Lire le PID
PID=$(cat "$PID_FILE")

# Vérifier si le processus existe
if ps -p $PID > /dev/null 2>&1; then
    echo "🛑 Arrêt du service $SERVICE (PID: $PID)..."
    kill $PID
    
    # Attendre que le processus s'arrête (max 5 secondes)
    for i in {1..5}; do
        if ! ps -p $PID > /dev/null 2>&1; then
            echo "✅ Service $SERVICE arrêté avec succès"
            rm -f "$PID_FILE"
            exit 0
        fi
        sleep 1
    done
    
    # Si toujours actif, forcer l'arrêt
    echo "⚠️  Force l'arrêt du service..."
    kill -9 $PID
    rm -f "$PID_FILE"
    echo "✅ Service $SERVICE arrêté (forcé)"
else
    echo "⚠️  Le processus $PID n'existe plus"
    rm -f "$PID_FILE"
fi
