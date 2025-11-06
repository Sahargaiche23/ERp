# ERP Intelligent – Municipalité de Tunis

Système ERP complet pour la gestion municipale avec modules RH, Budget, Projets, Réclamations et Rapports.

## Architecture

### Backend Services (Spring Boot)
- **Auth Service** (port 8081): Authentification, JWT, OTP email
- **HR Service** (port 8082): Gestion des employés, congés, pointage
- **Budget Service** (port 8083): Gestion des budgets et projets
- **Claims Service** (port 8084): Gestion des réclamations citoyennes
- **Reports Service** (port 8085): Rapports et tableaux de bord

### AI Services (FastAPI)
- **AI Security** (port 9001): Détection d'anomalies (IsolationForest)
- **AI Analytics** (port 9002): Analyses et prévisions
- **AI Budget** (port 9003): Prédictions budgétaires
- **AI Claims** (port 9004): Classification et sentiment des réclamations
- **AI RH** (port 9005): Prévisions RH

### Frontend (Angular 17)
- **Application Web** (port 4200): Interface utilisateur moderne et responsive

## Prérequis

### Logiciels requis
- **PostgreSQL** 14+ (base de données)
- **Java** 17+ (backend services)
- **Maven** 3.8+ (build backend)
- **Node.js** 18+ et npm (frontend)
- **Python** 3.9+ et pip (AI services)
- **Redis** (optionnel, pour auth-service)

### Installation des prérequis (Ubuntu/Debian)

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

# Redis (optionnel)
sudo apt install redis-server
```

## 🚀 Démarrage Rapide

### Méthode 1: Démarrer tous les services

```bash
# Installation et configuration initiale
./setup-local.sh

# Démarrer tous les services
./start-all.sh

# Vérifier que tout fonctionne
./verify-services.sh

# Accéder à l'application
# http://localhost:4200
```

### Méthode 2: Démarrer un service individuel

```bash
# Démarrer un service spécifique
./start-service.sh auth
./start-service.sh hr
./start-service.sh frontend
# etc.

# Arrêter un service spécifique
./stop-service.sh auth
```

### Arrêter tous les services

```bash
./stop-all.sh
```

## 📚 Documentation

- **[GUIDE_DEMARRAGE_SERVEURS.md](./GUIDE_DEMARRAGE_SERVEURS.md)** - Guide détaillé pour démarrer chaque serveur
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Référence rapide des commandes
- **[QUICKSTART.md](./QUICKSTART.md)** - Installation en 5 minutes
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Architecture détaillée du système
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Guide de dépannage

## 🛠️ Scripts Utiles

| Script | Description |
|--------|-------------|
| `start-all.sh` | Démarre tous les services (backend, AI, frontend) |
| `start-service.sh` | Démarre un service individuel |
| `stop-all.sh` | Arrête tous les services |
| `stop-service.sh` | Arrête un service individuel |
| `verify-services.sh` | Vérifie l'état de tous les services |
| `setup-local.sh` | Configuration initiale des bases de données |

## 📞 Support

**Email:** sahargaiche6@gmail.com
