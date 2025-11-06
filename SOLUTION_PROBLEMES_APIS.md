# 🔧 SOLUTION AUX PROBLÈMES DES APIS

**Date**: 2025-11-06 19:40  
**Problèmes identifiés**: APIs retournent 404, Liste réclamations vide

---

## 🔴 PROBLÈME 1: Erreur Création Employé

### Cause
L'API `/api/employees` retourne **404 Not Found** car:
1. ✅ Le contrôleur existe mais n'est pas scanné correctement
2. ✅ `@EnableJpaRepositories` manquait

### Solution Appliquée

**Fichier modifié**: `backend/hr-service/src/main/java/tn/tunis/erp/hr/HrServiceApplication.java`

```java
@SpringBootApplication
@EnableJpaRepositories(basePackages = "tn.tunis.erp.hr.repo")
public class HrServiceApplication {
    // ...
}
```

### Redémarrer le Service

```bash
# Arrêter le service HR actuel
pkill -f hr-service

# Redémarrer
cd /home/sahar/Bureau/ERp/backend/hr-service
mvn spring-boot:run
```

### Tester

```bash
# 1. Attendre 30 secondes que le service démarre
sleep 30

# 2. Tester l'API
curl http://localhost:8083/api/employees

# Résultat attendu: [] (liste vide mais pas 404!)
```

---

## 🔴 PROBLÈME 2: Liste Réclamations Vide

### Cause
Aucune réclamation n'existe dans la base de données.

### Solution 1: Créer Via Frontend

```
1. http://localhost:4200
2. Login: sahar_citizen / newpass123
3. Dashboard → "Nouvelle Réclamation"
4. Remplir et soumettre
5. Aller dans "Mes Réclamations"
✅ La réclamation apparaît!
```

### Solution 2: Créer Via API (Backend)

```bash
# Créer des réclamations de test
curl -X POST http://localhost:8082/api/claims \
  -H "Content-Type: application/json" \
  -d '{
    "citizenName": "Ahmed Ben Ali",
    "citizenEmail": "ahmed@email.com",
    "citizenPhone": "+216 98 123 456",
    "address": "Rue Habib Bourguiba, Tunis",
    "subject": "Nid de poule dangereux",
    "description": "Un grand nid de poule près de l'\''école",
    "category": "INFRASTRUCTURE",
    "priority": "HIGH",
    "status": "NEW"
  }'

curl -X POST http://localhost:8082/api/claims \
  -H "Content-Type: application/json" \
  -d '{
    "citizenName": "Fatma Trabelsi",
    "citizenEmail": "fatma@email.com",
    "citizenPhone": "+216 22 456 789",
    "address": "Avenue Mohamed V, Tunis",
    "subject": "Éclairage public défectueux",
    "description": "Plusieurs lampadaires ne fonctionnent plus",
    "category": "LIGHTING",
    "priority": "MEDIUM",
    "status": "NEW"
  }'

curl -X POST http://localhost:8082/api/claims \
  -H "Content-Type: application/json" \
  -d '{
    "citizenName": "Mohamed Jebali",
    "citizenEmail": "mohamed@email.com",
    "citizenPhone": "+216 55 789 123",
    "address": "Rue de la Liberté, Tunis",
    "subject": "Problème assainissement",
    "description": "Égout bouché depuis 3 jours",
    "category": "SANITATION",
    "priority": "URGENT",
    "status": "NEW"
  }'
```

### Rafraîchir Frontend

```bash
# Sur http://localhost:4200
Ctrl + Shift + R

# Aller dans Liste Réclamations
✅ Devrait afficher 3 réclamations!
```

---

## 🔴 PROBLÈME 3: Claims Service 404

### Cause
Même problème que HR-service.

### Solution Appliquée

**Fichier modifié**: `backend/claims-service/src/main/java/tn/tunis/erp/claims/ClaimsServiceApplication.java`

```java
@SpringBootApplication
@EnableJpaRepositories(basePackages = "tn.tunis.erp.claims.repo")
public class ClaimsServiceApplication {
    // ...
}
```

### Redémarrer le Service

```bash
# Arrêter le service Claims actuel
pkill -f claims-service

# Redémarrer
cd /home/sahar/Bureau/ERp/backend/claims-service
mvn spring-boot:run
```

---

## ✅ PROCÉDURE COMPLÈTE DE RÉPARATION

### Étape 1: Redémarrer les Services

```bash
# Terminal 1 - Arrêter les services
pkill -f hr-service
pkill -f claims-service

# Terminal 2 - HR Service
cd /home/sahar/Bureau/ERp/backend/hr-service
mvn spring-boot:run

# Terminal 3 - Claims Service
cd /home/sahar/Bureau/ERp/backend/claims-service
mvn spring-boot:run

# Attendre 1 minute pour que les services démarrent
```

### Étape 2: Vérifier les APIs

```bash
# HR Service
curl http://localhost:8083/api/employees
# Attendu: [] (pas 404)

# Claims Service
curl http://localhost:8082/api/claims
# Attendu: [] (pas 404)
```

### Étape 3: Créer des Données de Test

```bash
# Exécuter le script complet
cd /home/sahar/Bureau/ERp
bash create-test-data.sh
```

### Étape 4: Tester Frontend

```
1. http://localhost:4200
2. Ctrl + Shift + R
3. Login: sahar_admin / test123

# Test Créer Employé
4. Dashboard → "Nouvel Employé"
5. Remplir et soumettre
✅ Devrait fonctionner!

# Test Voir Réclamations
6. Menu → "Réclamations"
✅ Devrait afficher les réclamations créées!
```

---

## 🎯 VÉRIFICATION FINALE

### APIs Fonctionnelles

| Service | Port | Endpoint | Statut |
|---------|------|----------|--------|
| Auth | 8081 | `/api/auth/login` | ✅ OK |
| Claims | 8082 | `/api/claims` | 🔧 À redémarrer |
| HR | 8083 | `/api/employees` | 🔧 À redémarrer |

### Services à Redémarrer

```bash
# 1. Claims Service
cd backend/claims-service && mvn spring-boot:run

# 2. HR Service
cd backend/hr-service && mvn spring-boot:run

# 3. Attendre 1 minute
# 4. Tester
```

---

## 📝 SCRIPT AUTOMATIQUE

Créer le fichier `fix-services.sh`:

```bash
#!/bin/bash

echo "🔧 Arrêt des services..."
pkill -f hr-service
pkill -f claims-service
sleep 2

echo "🚀 Démarrage HR Service..."
cd /home/sahar/Bureau/ERp/backend/hr-service
mvn spring-boot:run > /tmp/hr-service.log 2>&1 &

echo "🚀 Démarrage Claims Service..."
cd /home/sahar/Bureau/ERp/backend/claims-service
mvn spring-boot:run > /tmp/claims-service.log 2>&1 &

echo "⏳ Attente du démarrage (60 secondes)..."
sleep 60

echo "✅ Test des APIs..."
echo "HR Service:"
curl -s http://localhost:8083/api/employees | head -c 100

echo -e "\n\nClaims Service:"
curl -s http://localhost:8082/api/claims | head -c 100

echo -e "\n\n✅ Services redémarrés!"
echo "Logs:"
echo "  - HR: tail -f /tmp/hr-service.log"
echo "  - Claims: tail -f /tmp/claims-service.log"
```

Rendre exécutable:
```bash
chmod +x fix-services.sh
./fix-services.sh
```

---

## 🎉 RÉSULTAT ATTENDU

Après redémarrage:

1. **HR Service** (port 8083):
   - ✅ POST `/api/employees` fonctionne
   - ✅ GET `/api/employees` retourne `[]` ou liste
   - ✅ Frontend peut créer employés

2. **Claims Service** (port 8082):
   - ✅ GET `/api/claims` retourne `[]` ou liste
   - ✅ POST `/api/claims` fonctionne
   - ✅ Frontend affiche réclamations

3. **Frontend**:
   - ✅ Créer Employé: succès
   - ✅ Liste Réclamations: affiche données
   - ✅ Créer Réclamation: succès

---

## 🆘 SI TOUJOURS DES ERREURS

### Vérifier les Logs

```bash
# Logs HR Service
tail -f backend/hr-service/target/*.log

# Logs Claims Service
tail -f backend/claims-service/target/*.log

# Chercher les erreurs
grep -i "error\|exception" backend/*/target/*.log
```

### Vérifier les Ports

```bash
# Vérifier que les services écoutent
lsof -i :8081 -i :8082 -i :8083 | grep LISTEN

# Devrait afficher:
# java ... *:8081 (LISTEN) - Auth Service
# java ... *:8082 (LISTEN) - Claims Service  
# java ... *:8083 (LISTEN) - HR Service
```

### Rebuild Complet

```bash
# Si rien ne fonctionne
cd backend/hr-service
mvn clean install
mvn spring-boot:run

cd ../claims-service
mvn clean install
mvn spring-boot:run
```

---

**✅ APRÈS CES ÉTAPES, TOUT DEVRAIT FONCTIONNER!**
