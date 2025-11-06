#!/bin/bash

echo "================================================"
echo "Peuplement de la base de données avec des données de test"
echo "================================================"

# Obtenir un token admin
echo "1. Connexion en tant qu'admin..."
TOKEN=$(curl -s -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"sahar_admin","password":"test123"}' | jq -r '.accessToken')

echo "Token obtenu: ${TOKEN:0:20}..."

# ===== EMPLOYÉS =====
echo ""
echo "2. Création des employés..."

curl -s -X POST http://localhost:8082/api/employees \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "matricule": "EMP001",
    "firstName": "Mohamed",
    "lastName": "Ben Ali",
    "email": "mohamed.benali@tunis.tn",
    "phone": "+216 20 123 456",
    "department": "Travaux Publics",
    "position": "Ingénieur",
    "hireDate": "2020-01-15",
    "salary": 2500.00,
    "status": "ACTIVE"
  }' > /dev/null

curl -s -X POST http://localhost:8082/api/employees \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "matricule": "EMP002",
    "firstName": "Fatma",
    "lastName": "Trabelsi",
    "email": "fatma.trabelsi@tunis.tn",
    "phone": "+216 20 234 567",
    "department": "Finances",
    "position": "Comptable",
    "hireDate": "2019-03-20",
    "salary": 2000.00,
    "status": "ACTIVE"
  }' > /dev/null

curl -s -X POST http://localhost:8082/api/employees \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "matricule": "EMP003",
    "firstName": "Ahmed",
    "lastName": "Khelifi",
    "email": "ahmed.khelifi@tunis.tn",
    "phone": "+216 20 345 678",
    "department": "RH",
    "position": "Responsable RH",
    "hireDate": "2018-06-10",
    "salary": 3000.00,
    "status": "ACTIVE"
  }' > /dev/null

curl -s -X POST http://localhost:8082/api/employees \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "matricule": "EMP004",
    "firstName": "Sana",
    "lastName": "Gharbi",
    "email": "sana.gharbi@tunis.tn",
    "phone": "+216 20 456 789",
    "department": "Travaux Publics",
    "position": "Chef de Projet",
    "hireDate": "2021-02-01",
    "salary": 2800.00,
    "status": "ACTIVE"
  }' > /dev/null

curl -s -X POST http://localhost:8082/api/employees \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "matricule": "EMP005",
    "firstName": "Karim",
    "lastName": "Mansour",
    "email": "karim.mansour@tunis.tn",
    "phone": "+216 20 567 890",
    "department": "Services Techniques",
    "position": "Technicien",
    "hireDate": "2020-09-15",
    "salary": 1800.00,
    "status": "ACTIVE"
  }' > /dev/null

echo "✓ 5 employés créés"

# ===== BUDGETS =====
echo ""
echo "3. Création des budgets..."

curl -s -X POST http://localhost:8083/api/budgets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "department": "Travaux Publics",
    "year": 2025,
    "totalAllocated": 5000000.00,
    "totalSpent": 3200000.00,
    "status": "IN_PROGRESS"
  }' > /dev/null

curl -s -X POST http://localhost:8083/api/budgets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "department": "Services Techniques",
    "year": 2025,
    "totalAllocated": 2000000.00,
    "totalSpent": 800000.00,
    "status": "IN_PROGRESS"
  }' > /dev/null

curl -s -X POST http://localhost:8083/api/budgets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "department": "Finances",
    "year": 2025,
    "totalAllocated": 1000000.00,
    "totalSpent": 450000.00,
    "status": "IN_PROGRESS"
  }' > /dev/null

echo "✓ 3 budgets créés"

# ===== PROJETS =====
echo ""
echo "4. Création des projets..."

curl -s -X POST http://localhost:8083/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Rénovation Avenue Habib Bourguiba",
    "description": "Réfection complète de la chaussée et des trottoirs",
    "department": "Travaux Publics",
    "budget": 1500000.00,
    "spent": 900000.00,
    "startDate": "2025-01-15",
    "endDate": "2025-12-31",
    "status": "IN_PROGRESS",
    "progress": 60,
    "manager": "Mohamed Ben Ali"
  }' > /dev/null

curl -s -X POST http://localhost:8083/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Éclairage Public LED",
    "description": "Remplacement de l'\''éclairage public par des LED",
    "department": "Services Techniques",
    "budget": 800000.00,
    "spent": 400000.00,
    "startDate": "2025-03-01",
    "endDate": "2025-11-30",
    "status": "IN_PROGRESS",
    "progress": 50,
    "manager": "Karim Mansour"
  }' > /dev/null

curl -s -X POST http://localhost:8083/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Digitalisation des Services",
    "description": "Mise en place du système ERP municipal",
    "department": "Services Techniques",
    "budget": 500000.00,
    "spent": 350000.00,
    "startDate": "2025-01-01",
    "endDate": "2025-12-31",
    "status": "IN_PROGRESS",
    "progress": 70,
    "manager": "Sana Gharbi"
  }' > /dev/null

curl -s -X POST http://localhost:8083/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Aménagement Parc Central",
    "description": "Création d'\''espaces verts et aires de jeux",
    "department": "Travaux Publics",
    "budget": 1200000.00,
    "spent": 600000.00,
    "startDate": "2025-04-01",
    "endDate": "2026-03-31",
    "status": "IN_PROGRESS",
    "progress": 40,
    "manager": "Mohamed Ben Ali"
  }' > /dev/null

echo "✓ 4 projets créés"

# ===== RÉCLAMATIONS =====
echo ""
echo "5. Création des réclamations..."

# Obtenir tokens de différents citoyens
TOKEN_CITIZEN1=$(curl -s -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}' | jq -r '.accessToken')

TOKEN_CITIZEN2=$(curl -s -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"sahar_citizen","password":"test123"}' | jq -r '.accessToken')

curl -s -X POST http://localhost:8084/api/claims \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN_CITIZEN1" \
  -d '{
    "title": "Nid de poule Avenue de la République",
    "description": "Un grand nid de poule s'\''est formé sur l'\''Avenue de la République, très dangereux pour les véhicules",
    "category": "VOIRIE",
    "priority": "HIGH",
    "location": "36.8065,10.1815",
    "address": "Avenue de la République, Tunis"
  }' > /dev/null

curl -s -X POST http://localhost:8084/api/claims \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN_CITIZEN1" \
  -d '{
    "title": "Éclairage public défaillant",
    "description": "Plusieurs lampadaires ne fonctionnent plus rue de Marseille",
    "category": "ECLAIRAGE",
    "priority": "MEDIUM",
    "location": "36.8025,10.1795",
    "address": "Rue de Marseille, Tunis"
  }' > /dev/null

curl -s -X POST http://localhost:8084/api/claims \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN_CITIZEN2" \
  -d '{
    "title": "Fuite d'\''eau importante",
    "description": "Fuite d'\''eau sur la canalisation principale rue Charles de Gaulle",
    "category": "EAU",
    "priority": "URGENT",
    "location": "36.8055,10.1805",
    "address": "Rue Charles de Gaulle, Tunis"
  }' > /dev/null

echo "✓ 3 réclamations créées"

echo ""
echo "================================================"
echo "✓ Toutes les données de test ont été insérées!"
echo "================================================"
echo ""
echo "Vérification des données..."
echo ""

EMPLOYEES=$(curl -s http://localhost:8082/api/employees -H "Authorization: Bearer $TOKEN" | jq 'length')
BUDGETS=$(curl -s http://localhost:8083/api/budgets -H "Authorization: Bearer $TOKEN" | jq 'length')
PROJECTS=$(curl -s http://localhost:8083/api/projects -H "Authorization: Bearer $TOKEN" | jq 'length')
CLAIMS=$(curl -s http://localhost:8084/api/claims -H "Authorization: Bearer $TOKEN" | jq 'length')

echo "📊 Résumé:"
echo "  - Employés: $EMPLOYEES"
echo "  - Budgets: $BUDGETS"
echo "  - Projets: $PROJECTS"
echo "  - Réclamations: $CLAIMS"
echo ""
echo "✅ Le système est prêt!"
