# Guide de Dépannage - ERP Municipal

## Problème: "mvn : commande introuvable"

### Cause
Maven n'est pas installé sur votre système.

### Solution

```bash
# Installer Maven
sudo apt update
sudo apt install maven -y

# Vérifier l'installation
mvn --version
```

Vous devriez voir quelque chose comme:
```
Apache Maven 3.x.x
Maven home: /usr/share/maven
Java version: 17.x.x
```

## Problème: Services ne démarrent pas

### Vérifier PostgreSQL

```bash
# Vérifier le statut
systemctl status postgresql

# Démarrer si nécessaire
sudo systemctl start postgresql

# Activer au démarrage
sudo systemctl enable postgresql
```

### Créer les bases de données

```bash
# Se connecter à PostgreSQL
sudo -u postgres psql

# Dans psql, créer les bases:
CREATE DATABASE erp_auth;
CREATE DATABASE erp_hr;
CREATE DATABASE erp_budget;
CREATE DATABASE erp_claims;
CREATE DATABASE erp_reports;

# Quitter
\q
```

## Problème: Port déjà utilisé

### Trouver et tuer le processus

```bash
# Trouver le processus utilisant le port 8081 (par exemple)
sudo lsof -i :8081

# Tuer le processus
kill -9 <PID>
```

### Ou utiliser le script d'arrêt

```bash
./stop-all.sh
```

## Problème: "Cannot connect to database"

### Vérifier les credentials PostgreSQL

Éditez les fichiers `backend/*/src/main/resources/application.properties`:

```properties
spring.datasource.username=postgres
spring.datasource.password=votre_mot_de_passe
```

### Réinitialiser le mot de passe PostgreSQL

```bash
sudo -u postgres psql

ALTER USER postgres PASSWORD 'nouveau_mot_de_passe';
```

## Problème: Frontend ne démarre pas

### Réinstaller les dépendances

```bash
cd frontend/erp-ui
rm -rf node_modules package-lock.json
npm install
npm start
```

## Problème: Erreur de compilation Java

### Vérifier la version de Java

```bash
java --version
```

Doit être Java 17 ou supérieur.

### Installer Java 17 si nécessaire

```bash
sudo apt install openjdk-17-jdk -y

# Définir comme version par défaut
sudo update-alternatives --config java
```

## Problème: Services AI ne démarrent pas

### Installer les dépendances Python

```bash
pip install fastapi uvicorn pydantic scikit-learn joblib numpy
```

### Ou pour chaque service:

```bash
cd ai/ai-security
pip install -r requirements.txt
```

## Vérifier que tout fonctionne

### 1. Vérifier les services backend

```bash
# Auth Service
curl http://localhost:8081/actuator/health

# HR Service  
curl http://localhost:8082/api/employees

# Budget Service
curl http://localhost:8083/api/budgets

# Claims Service
curl http://localhost:8084/api/claims

# Reports Service
curl http://localhost:8085/api/reports/dashboard/stats
```

### 2. Vérifier les services AI

```bash
curl http://localhost:9001/health
curl http://localhost:9002/health
curl http://localhost:9003/health
curl http://localhost:9004/health
curl http://localhost:9005/health
```

### 3. Vérifier le frontend

Ouvrez http://localhost:4200 dans votre navigateur.

## Logs

### Voir les logs en temps réel

```bash
# Auth service
tail -f logs/auth-service.log

# HR service
tail -f logs/hr-service.log

# Frontend
tail -f logs/frontend.log
```

### Logs détaillés

Les logs de chaque service sont dans le dossier `logs/`:
- `logs/auth-service.log`
- `logs/hr-service.log`
- `logs/budget-service.log`
- `logs/claims-service.log`
- `logs/reports-service.log`
- `logs/ai-*.log`
- `logs/frontend.log`

## Réinitialisation complète

Si rien ne fonctionne:

```bash
# 1. Arrêter tout
./stop-all.sh

# 2. Nettoyer
rm -rf logs/*
rm -rf .pids

# 3. Nettoyer les builds Maven
cd backend/auth-service && mvn clean && cd ../..
cd backend/hr-service && mvn clean && cd ../..
cd backend/budget-service && mvn clean && cd ../..
cd backend/claims-service && mvn clean && cd ../..
cd backend/reports-service && mvn clean && cd ../..

# 4. Reconstruire et démarrer
./start-all.sh
```

## Support

Si le problème persiste:
1. Vérifiez les logs dans `logs/`
2. Assurez-vous que tous les prérequis sont installés (voir README.md)
3. Contactez: sahargaiche6@gmail.com
