#!/bin/bash

echo "📝 CRÉATION DE RÉCLAMATIONS DE TEST"
echo "===================================="
echo ""

# Réclamation 1
echo "1️⃣ Création réclamation: Nid de poule..."
curl -X POST http://localhost:8082/api/claims \
  -H "Content-Type: application/json" \
  -d '{
    "citizenName": "Ahmed Ben Ali",
    "citizenEmail": "ahmed.benali@email.com",
    "citizenPhone": "+216 98 123 456",
    "address": "Rue Habib Bourguiba, Tunis",
    "subject": "Nid de poule dangereux sur la route",
    "description": "Un très grand nid de poule s'\''est formé sur la rue principale près de l'\''école. C'\''est dangereux pour les véhicules et les piétons. Intervention urgente requise.",
    "category": "INFRASTRUCTURE",
    "priority": "HIGH",
    "status": "NEW"
  }' 2>/dev/null | head -c 80
echo ""

sleep 1

# Réclamation 2
echo "2️⃣ Création réclamation: Éclairage public..."
curl -X POST http://localhost:8082/api/claims \
  -H "Content-Type: application/json" \
  -d '{
    "citizenName": "Fatma Trabelsi",
    "citizenEmail": "fatma.trabelsi@email.com",
    "citizenPhone": "+216 22 456 789",
    "address": "Avenue Mohamed V, Tunis",
    "subject": "Éclairage public défectueux",
    "description": "Plusieurs lampadaires ne fonctionnent plus depuis une semaine sur l'\''avenue. La zone est très sombre la nuit, ce qui pose des problèmes de sécurité.",
    "category": "LIGHTING",
    "priority": "MEDIUM",
    "status": "NEW"
  }' 2>/dev/null | head -c 80
echo ""

sleep 1

# Réclamation 3
echo "3️⃣ Création réclamation: Assainissement..."
curl -X POST http://localhost:8082/api/claims \
  -H "Content-Type: application/json" \
  -d '{
    "citizenName": "Mohamed Jebali",
    "citizenEmail": "mohamed.jebali@email.com",
    "citizenPhone": "+216 55 789 123",
    "address": "Rue de la Liberté, Tunis",
    "subject": "Problème assainissement urgent",
    "description": "Égout bouché depuis 3 jours dans notre rue. Mauvaises odeurs et risque sanitaire. Besoin d'\''une intervention immédiate.",
    "category": "SANITATION",
    "priority": "URGENT",
    "status": "NEW"
  }' 2>/dev/null | head -c 80
echo ""

sleep 1

# Réclamation 4
echo "4️⃣ Création réclamation: Sécurité..."
curl -X POST http://localhost:8082/api/claims \
  -H "Content-Type: application/json" \
  -d '{
    "citizenName": "Salma Hadded",
    "citizenEmail": "salma.hadded@email.com",
    "citizenPhone": "+216 29 345 678",
    "address": "Rue Ibn Khaldoun, Tunis",
    "subject": "Passage piéton dangereux",
    "description": "Le passage piéton devant l'\''école n'\''est pas bien signalé. Manque de marquage au sol et de signalisation. Risque d'\''accidents.",
    "category": "SECURITY",
    "priority": "HIGH",
    "status": "NEW"
  }' 2>/dev/null | head -c 80
echo ""

sleep 1

# Réclamation 5
echo "5️⃣ Création réclamation: Administratif..."
curl -X POST http://localhost:8082/api/claims \
  -H "Content-Type: application/json" \
  -d '{
    "citizenName": "Karim Mansouri",
    "citizenEmail": "karim.mansouri@email.com",
    "citizenPhone": "+216 98 654 321",
    "address": "Avenue de la République, Tunis",
    "subject": "Demande de certificat de résidence",
    "description": "J'\''ai besoin d'\''un certificat de résidence pour mes démarches administratives. Merci de me contacter pour fixer un rendez-vous.",
    "category": "ADMINISTRATIVE",
    "priority": "LOW",
    "status": "NEW"
  }' 2>/dev/null | head -c 80
echo ""

echo ""
echo "✅ 5 Réclamations créées avec succès!"
echo ""
echo "Pour les voir:"
echo "  curl http://localhost:8082/api/claims"
echo ""
echo "Ou dans le frontend:"
echo "  http://localhost:4200 → Login → Réclamations"
echo ""
