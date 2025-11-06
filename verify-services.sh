#!/bin/bash

echo "================================"
echo "🔍 Vérification des Services ERP"
echo "================================"
echo ""

# Fonction pour vérifier un service
check_service() {
    local name=$1
    local url=$2
    local type=$3
    
    if curl -s --max-time 3 "$url" > /dev/null 2>&1; then
        echo "✅ $name ($type) - OK"
        return 0
    else
        echo "❌ $name ($type) - KO"
        return 1
    fi
}

# Compteurs
total=0
success=0

echo "📦 Services Backend (Spring Boot)"
echo "-----------------------------------"
((total++)); check_service "Auth Service      (8081)" "http://localhost:8081/actuator/health" "Spring Boot" && ((success++))
((total++)); check_service "HR Service        (8082)" "http://localhost:8082/api/employees" "Spring Boot" && ((success++))
((total++)); check_service "Budget Service    (8083)" "http://localhost:8083/api/budgets" "Spring Boot" && ((success++))
((total++)); check_service "Claims Service    (8084)" "http://localhost:8084/api/claims" "Spring Boot" && ((success++))
((total++)); check_service "Reports Service   (8085)" "http://localhost:8085/api/reports/dashboard/stats" "Spring Boot" && ((success++))

echo ""
echo "🤖 Services AI (FastAPI)"
echo "-----------------------------------"
((total++)); check_service "AI Security       (9001)" "http://localhost:9001/health" "FastAPI" && ((success++))
((total++)); check_service "AI Analytics      (9002)" "http://localhost:9002/health" "FastAPI" && ((success++))
((total++)); check_service "AI Budget         (9003)" "http://localhost:9003/health" "FastAPI" && ((success++))
((total++)); check_service "AI Claims         (9004)" "http://localhost:9004/health" "FastAPI" && ((success++))
((total++)); check_service "AI RH             (9005)" "http://localhost:9005/health" "FastAPI" && ((success++))

echo ""
echo "🌐 Frontend (Angular)"
echo "-----------------------------------"
((total++)); check_service "Frontend          (4200)" "http://localhost:4200" "Angular" && ((success++))

echo ""
echo "================================"
echo "📊 Résumé"
echo "================================"
echo "Services actifs: $success/$total"

if [ $success -eq $total ]; then
    echo "🎉 Tous les services sont opérationnels!"
    exit 0
elif [ $success -eq 0 ]; then
    echo "⚠️  Aucun service n'est démarré!"
    echo ""
    echo "Pour démarrer tous les services:"
    echo "  ./start-all.sh"
    exit 1
else
    echo "⚠️  Certains services ne sont pas démarrés"
    echo ""
    echo "Voir les logs dans: ./logs/"
    exit 1
fi
