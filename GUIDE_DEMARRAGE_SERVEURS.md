# Guide de Démarrage - ERP Municipal
## Guide complet pour démarrer chaque serveur individuellement

---

## 📋 Table des Matières
1. [Prérequis](#prérequis)
2. [Configuration Initiale](#configuration-initiale)
3. [Démarrer TOUS les services](#démarrer-tous-les-services)
4. [Démarrer les services INDIVIDUELLEMENT](#démarrer-les-services-individuellement)
5. [Vérification des services](#vérification-des-services)
6. [Arrêter les services](#arrêter-les-services)
7. [Résolution de problèmes](#résolution-de-problèmes)

---

## 🔧 Prérequis

### Logiciels nécessaires
```bash
# Vérifier PostgreSQL
psql --version

# Vérifier Java (17+)
java --version

# Vérifier Maven
mvn --version

# Vérifier Node.js (18+)
node --version
npm --version

# Vérifier Python (3.9+)
python3 --version
pip3 --version
```

### Installation des prérequis (si manquants)
```bash
# PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Java 17
sudo apt install openjdk-17-jdk

# Maven
sudo apt install maven

# Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs

# Python 3 et pip
sudo apt install python3 python3-pip

# Dépendances Python pour les services AI
pip3 install fastapi uvicorn pydantic scikit-learn joblib numpy
```

---

## ⚙️ Configuration Initiale

### 1. Configurer les bases de données
```bash
cd /home/sahar/Bureau/ERp

# Exécuter le script de configuration automatique
./setup-local.sh
```

### 2. Configurer l'email (IMPORTANT!)
Éditer le fichier: `backend/auth-service/src/main/resources/application.properties`

```properties
spring.mail.username=votre-email@gmail.com
spring.mail.password=votre-mot-de-passe-application
```

### 3. Installer les dépendances frontend
```bash
cd /home/sahar/Bureau/ERp/frontend/erp-ui
npm install
```

---

## 🚀 Démarrer TOUS les services (Méthode Rapide)

```bash
cd /home/sahar/Bureau/ERp
./start-all.sh
```

**Attendez 2-3 minutes** que tous les services démarrent, puis accédez à:
- **Application**: http://localhost:4200

Pour arrêter tous les services:
```bash
./stop-all.sh
```

---

## 🔷 Démarrer les services INDIVIDUELLEMENT

### 1️⃣ Services Backend (Spring Boot + Java)

#### **Auth Service** (Port 8081)
Gestion de l'authentification, JWT, OTP email

```bash
cd /home/sahar/Bureau/ERp/backend/auth-service
mvn spring-boot:run
```

**Vérification:**
```bash
curl http://localhost:8081/actuator/health
```

**Logs:**
```bash
tail -f /home/sahar/Bureau/ERp/logs/auth-service.log
```

---

#### **HR Service** (Port 8082)
Gestion des employés, congés, pointage

```bash
cd /home/sahar/Bureau/ERp/backend/hr-service
mvn spring-boot:run
```

**Vérification:**
```bash
curl http://localhost:8082/api/employees
```

**Logs:**
```bash
tail -f /home/sahar/Bureau/ERp/logs/hr-service.log
```

---

#### **Budget Service** (Port 8083)
Gestion des budgets et projets

```bash
cd /home/sahar/Bureau/ERp/backend/budget-service
mvn spring-boot:run
```

**Vérification:**
```bash
curl http://localhost:8083/api/budgets
```

**Logs:**
```bash
tail -f /home/sahar/Bureau/ERp/logs/budget-service.log
```

---

#### **Claims Service** (Port 8084)
Gestion des réclamations citoyennes

```bash
cd /home/sahar/Bureau/ERp/backend/claims-service
mvn spring-boot:run
```

**Vérification:**
```bash
curl http://localhost:8084/api/claims
```

**Logs:**
```bash
tail -f /home/sahar/Bureau/ERp/logs/claims-service.log
```

---

#### **Reports Service** (Port 8085)
Génération de rapports et tableaux de bord

```bash
cd /home/sahar/Bureau/ERp/backend/reports-service
mvn spring-boot:run
```

**Vérification:**
```bash
curl http://localhost:8085/api/reports/dashboard/stats
```

**Logs:**
```bash
tail -f /home/sahar/Bureau/ERp/logs/reports-service.log
```

---

### 2️⃣ Services AI (FastAPI + Python)

#### **AI Security Service** (Port 9001)
Détection d'anomalies avec IsolationForest

```bash
cd /home/sahar/Bureau/ERp/ai/ai-security
uvicorn main:app --host 0.0.0.0 --port 9001
```

**Vérification:**
```bash
curl http://localhost:9001/health
```

**Logs:**
```bash
tail -f /home/sahar/Bureau/ERp/logs/ai-security.log
```

---

#### **AI Analytics Service** (Port 9002)
Analyses et prévisions

```bash
cd /home/sahar/Bureau/ERp/ai/ai-analytics
uvicorn main:app --host 0.0.0.0 --port 9002
```

**Vérification:**
```bash
curl http://localhost:9002/health
```

**Logs:**
```bash
tail -f /home/sahar/Bureau/ERp/logs/ai-analytics.log
```

---

#### **AI Budget Service** (Port 9003)
Prédictions budgétaires

```bash
cd /home/sahar/Bureau/ERp/ai/ai-budget
uvicorn main:app --host 0.0.0.0 --port 9003
```

**Vérification:**
```bash
curl http://localhost:9003/health
```

**Logs:**
```bash
tail -f /home/sahar/Bureau/ERp/logs/ai-budget.log
```

---

#### **AI Claims Service** (Port 9004)
Classification et analyse de sentiment des réclamations

```bash
cd /home/sahar/Bureau/ERp/ai/ai-claims
uvicorn main:app --host 0.0.0.0 --port 9004
```

**Vérification:**
```bash
curl http://localhost:9004/health
```

**Logs:**
```bash
tail -f /home/sahar/Bureau/ERp/logs/ai-claims.log
```

---

#### **AI RH Service** (Port 9005)
Prévisions RH

```bash
cd /home/sahar/Bureau/ERp/ai/ai-rh
uvicorn main:app --host 0.0.0.0 --port 9005
```

**Vérification:**
```bash
curl http://localhost:9005/health
```

**Logs:**
```bash
tail -f /home/sahar/Bureau/ERp/logs/ai-rh.log
```

---

### 3️⃣ Frontend (Angular)

#### **Application Web** (Port 4200)
Interface utilisateur Angular

```bash
cd /home/sahar/Bureau/ERp/frontend/erp-ui
npm start
```

**Ou en mode développement:**
```bash
ng serve
```

**Accéder à l'application:**
```
http://localhost:4200
```

**Logs:**
```bash
tail -f /home/sahar/Bureau/ERp/logs/frontend.log
```

---

## ✅ Vérification des services

### Script de vérification rapide
```bash
#!/bin/bash

echo "🔍 Vérification des services Backend..."
curl -s http://localhost:8081/actuator/health && echo "✅ Auth Service OK" || echo "❌ Auth Service KO"
curl -s http://localhost:8082/api/employees && echo "✅ HR Service OK" || echo "❌ HR Service KO"
curl -s http://localhost:8083/api/budgets && echo "✅ Budget Service OK" || echo "❌ Budget Service KO"
curl -s http://localhost:8084/api/claims && echo "✅ Claims Service OK" || echo "❌ Claims Service KO"
curl -s http://localhost:8085/api/reports/dashboard/stats && echo "✅ Reports Service OK" || echo "❌ Reports Service KO"

echo ""
echo "🤖 Vérification des services AI..."
curl -s http://localhost:9001/health && echo "✅ AI Security OK" || echo "❌ AI Security KO"
curl -s http://localhost:9002/health && echo "✅ AI Analytics OK" || echo "❌ AI Analytics KO"
curl -s http://localhost:9003/health && echo "✅ AI Budget OK" || echo "❌ AI Budget KO"
curl -s http://localhost:9004/health && echo "✅ AI Claims OK" || echo "❌ AI Claims KO"
curl -s http://localhost:9005/health && echo "✅ AI RH OK" || echo "❌ AI RH KO"

echo ""
echo "🌐 Vérification du Frontend..."
curl -s http://localhost:4200 > /dev/null && echo "✅ Frontend OK" || echo "❌ Frontend KO"
```

### Vérifier les ports utilisés
```bash
# Vérifier tous les ports ERP
sudo lsof -i :4200  # Frontend
sudo lsof -i :8081  # Auth
sudo lsof -i :8082  # HR
sudo lsof -i :8083  # Budget
sudo lsof -i :8084  # Claims
sudo lsof -i :8085  # Reports
sudo lsof -i :9001  # AI Security
sudo lsof -i :9002  # AI Analytics
sudo lsof -i :9003  # AI Budget
sudo lsof -i :9004  # AI Claims
sudo lsof -i :9005  # AI RH
```

---

## 🛑 Arrêter les services

### Arrêter tous les services automatiquement
```bash
cd /home/sahar/Bureau/ERp
./stop-all.sh
```

### Arrêter un service spécifique

#### Par PID (si démarré avec start-all.sh)
```bash
# Exemple pour auth-service
kill $(cat /home/sahar/Bureau/ERp/.pids/auth-service.pid)

# Exemple pour frontend
kill $(cat /home/sahar/Bureau/ERp/.pids/frontend.pid)
```

#### Par port
```bash
# Tuer le processus sur un port spécifique
# Exemple: arrêter le service sur le port 8081
sudo kill -9 $(sudo lsof -t -i:8081)

# Exemple: arrêter le frontend sur le port 4200
sudo kill -9 $(sudo lsof -t -i:4200)
```

#### Avec CTRL+C
Si vous avez démarré le service manuellement dans le terminal, appuyez sur `CTRL+C`

---

## 🔧 Résolution de problèmes

### 1. Port déjà utilisé

**Problème:**
```
Error: Port 8081 is already in use
```

**Solution:**
```bash
# Trouver le processus qui utilise le port
sudo lsof -i :8081

# Tuer le processus
sudo kill -9 <PID>

# Ou tuer directement
sudo kill -9 $(sudo lsof -t -i:8081)
```

---

### 2. Base de données non accessible

**Problème:**
```
Unable to connect to database
```

**Solution:**
```bash
# Vérifier le statut de PostgreSQL
sudo systemctl status postgresql

# Redémarrer PostgreSQL
sudo systemctl restart postgresql

# Vérifier les connexions
psql -U postgres -c "\l"
```

---

### 3. Erreur Maven / Java

**Problème:**
```
Could not find or load main class
```

**Solution:**
```bash
# Nettoyer et rebuild le projet Maven
cd /home/sahar/Bureau/ERp/backend/<service-name>
mvn clean install

# Puis redémarrer
mvn spring-boot:run
```

---

### 4. Erreur npm / Node.js

**Problème:**
```
Module not found
```

**Solution:**
```bash
cd /home/sahar/Bureau/ERp/frontend/erp-ui

# Supprimer node_modules et package-lock.json
rm -rf node_modules package-lock.json

# Réinstaller les dépendances
npm install

# Redémarrer
npm start
```

---

### 5. Erreur Python / AI Services

**Problème:**
```
ModuleNotFoundError: No module named 'fastapi'
```

**Solution:**
```bash
# Installer les dépendances Python
pip3 install fastapi uvicorn pydantic scikit-learn joblib numpy

# Ou avec requirements.txt si disponible
cd /home/sahar/Bureau/ERp/ai/<service-name>
pip3 install -r requirements.txt
```

---

### 6. Voir les logs en temps réel

```bash
# Tous les logs
tail -f /home/sahar/Bureau/ERp/logs/*.log

# Log spécifique
tail -f /home/sahar/Bureau/ERp/logs/auth-service.log

# Dernières 100 lignes d'un log
tail -n 100 /home/sahar/Bureau/ERp/logs/hr-service.log
```

---

## 📊 Récapitulatif des Services

| Service | Type | Port | Commande | URL |
|---------|------|------|----------|-----|
| **Auth Service** | Spring Boot | 8081 | `mvn spring-boot:run` | http://localhost:8081 |
| **HR Service** | Spring Boot | 8082 | `mvn spring-boot:run` | http://localhost:8082 |
| **Budget Service** | Spring Boot | 8083 | `mvn spring-boot:run` | http://localhost:8083 |
| **Claims Service** | Spring Boot | 8084 | `mvn spring-boot:run` | http://localhost:8084 |
| **Reports Service** | Spring Boot | 8085 | `mvn spring-boot:run` | http://localhost:8085 |
| **AI Security** | FastAPI | 9001 | `uvicorn main:app --host 0.0.0.0 --port 9001` | http://localhost:9001 |
| **AI Analytics** | FastAPI | 9002 | `uvicorn main:app --host 0.0.0.0 --port 9002` | http://localhost:9002 |
| **AI Budget** | FastAPI | 9003 | `uvicorn main:app --host 0.0.0.0 --port 9003` | http://localhost:9003 |
| **AI Claims** | FastAPI | 9004 | `uvicorn main:app --host 0.0.0.0 --port 9004` | http://localhost:9004 |
| **AI RH** | FastAPI | 9005 | `uvicorn main:app --host 0.0.0.0 --port 9005` | http://localhost:9005 |
| **Frontend** | Angular | 4200 | `npm start` | http://localhost:4200 |

---

## 🎯 Scénarios d'utilisation

### Développement Backend uniquement
```bash
# Démarrer uniquement les services backend nécessaires
cd /home/sahar/Bureau/ERp/backend/auth-service && mvn spring-boot:run &
cd /home/sahar/Bureau/ERp/backend/hr-service && mvn spring-boot:run &
```

### Développement Frontend uniquement
```bash
# Utiliser start-frontend-only.sh si les backends sont déjà démarrés
cd /home/sahar/Bureau/ERp
./start-frontend-only.sh
```

### Test d'un service AI spécifique
```bash
# Exemple: tester uniquement le service AI Budget
cd /home/sahar/Bureau/ERp/ai/ai-budget
uvicorn main:app --host 0.0.0.0 --port 9003 --reload
```

---

## 📞 Support

**Email:** sahargaiche6@gmail.com

**Documentation supplémentaire:**
- `QUICKSTART.md` - Guide de démarrage rapide
- `ARCHITECTURE.md` - Architecture détaillée
- `TROUBLESHOOTING.md` - Guide de dépannage complet

---

**Dernière mise à jour:** 2025-11-06
