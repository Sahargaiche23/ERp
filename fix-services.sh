#!/bin/bash

echo "🔧 RÉPARATION DES SERVICES BACKEND"
echo "=================================="
echo ""

# Arrêter les services existants
echo "1️⃣ Arrêt des services existants..."
pkill -f hr-service 2>/dev/null
pkill -f claims-service 2>/dev/null
sleep 3

# Démarrer HR Service
echo "2️⃣ Démarrage HR Service (port 8083)..."
cd /home/sahar/Bureau/ERp/backend/hr-service
nohup mvn spring-boot:run > /tmp/hr-service.log 2>&1 &
HR_PID=$!
echo "   PID: $HR_PID"

# Démarrer Claims Service
echo "3️⃣ Démarrage Claims Service (port 8082)..."
cd /home/sahar/Bureau/ERp/backend/claims-service
nohup mvn spring-boot:run > /tmp/claims-service.log 2>&1 &
CLAIMS_PID=$!
echo "   PID: $CLAIMS_PID"

echo ""
echo "⏳ Attente du démarrage des services (60 secondes)..."
echo "   Vous pouvez suivre les logs avec:"
echo "   - HR: tail -f /tmp/hr-service.log"
echo "   - Claims: tail -f /tmp/claims-service.log"
echo ""

for i in {60..1}; do
    echo -ne "\r   Temps restant: $i secondes...  "
    sleep 1
done

echo -e "\n"
echo "✅ Test des APIs..."
echo "===================="

# Tester HR Service
echo ""
echo "📋 HR Service (GET /api/employees):"
HR_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8083/api/employees)
if [ "$HR_RESPONSE" = "200" ]; then
    echo "   ✅ OK (HTTP 200)"
    curl -s http://localhost:8083/api/employees | head -c 100
else
    echo "   ❌ Erreur (HTTP $HR_RESPONSE)"
fi

# Tester Claims Service
echo ""
echo "📋 Claims Service (GET /api/claims):"
CLAIMS_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8082/api/claims)
if [ "$CLAIMS_RESPONSE" = "200" ]; then
    echo "   ✅ OK (HTTP 200)"
    curl -s http://localhost:8082/api/claims | head -c 100
else
    echo "   ❌ Erreur (HTTP $CLAIMS_RESPONSE)"
fi

echo -e "\n"
echo "🎉 TERMINÉ!"
echo "=========="
echo ""
echo "Services en cours d'exécution:"
echo "  - HR Service: PID $HR_PID (port 8083)"
echo "  - Claims Service: PID $CLAIMS_PID (port 8082)"
echo ""
echo "Logs disponibles:"
echo "  - tail -f /tmp/hr-service.log"
echo "  - tail -f /tmp/claims-service.log"
echo ""
echo "Pour arrêter les services:"
echo "  - kill $HR_PID $CLAIMS_PID"
echo ""
