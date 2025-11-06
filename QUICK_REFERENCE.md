# 🚀 Référence Rapide - ERP Municipal

## Démarrage Express

```bash
# Démarrer TOUS les services
./start-all.sh

# Vérifier les services
./verify-services.sh

# Arrêter TOUS les services
./stop-all.sh
```

---

## 📋 Commandes Rapides par Service

### Backend Services (Spring Boot)

```bash
# Auth Service (8081)
cd backend/auth-service && mvn spring-boot:run

# HR Service (8082)
cd backend/hr-service && mvn spring-boot:run

# Budget Service (8083)
cd backend/budget-service && mvn spring-boot:run

# Claims Service (8084)
cd backend/claims-service && mvn spring-boot:run

# Reports Service (8085)
cd backend/reports-service && mvn spring-boot:run
```

### AI Services (FastAPI)

```bash
# AI Security (9001)
cd ai/ai-security && uvicorn main:app --host 0.0.0.0 --port 9001

# AI Analytics (9002)
cd ai/ai-analytics && uvicorn main:app --host 0.0.0.0 --port 9002

# AI Budget (9003)
cd ai/ai-budget && uvicorn main:app --host 0.0.0.0 --port 9003

# AI Claims (9004)
cd ai/ai-claims && uvicorn main:app --host 0.0.0.0 --port 9004

# AI RH (9005)
cd ai/ai-rh && uvicorn main:app --host 0.0.0.0 --port 9005
```

### Frontend (Angular)

```bash
# Frontend (4200)
cd frontend/erp-ui && npm start
```

---

## 🔍 Vérification Rapide

```bash
# Backend
curl http://localhost:8081/actuator/health  # Auth
curl http://localhost:8082/api/employees    # HR
curl http://localhost:8083/api/budgets      # Budget
curl http://localhost:8084/api/claims       # Claims
curl http://localhost:8085/api/reports/dashboard/stats  # Reports

# AI Services
curl http://localhost:9001/health  # AI Security
curl http://localhost:9002/health  # AI Analytics
curl http://localhost:9003/health  # AI Budget
curl http://localhost:9004/health  # AI Claims
curl http://localhost:9005/health  # AI RH

# Frontend
curl http://localhost:4200  # Application web
```

---

## 📊 Ports

| Service | Port |
|---------|------|
| Auth Service | 8081 |
| HR Service | 8082 |
| Budget Service | 8083 |
| Claims Service | 8084 |
| Reports Service | 8085 |
| AI Security | 9001 |
| AI Analytics | 9002 |
| AI Budget | 9003 |
| AI Claims | 9004 |
| AI RH | 9005 |
| Frontend | 4200 |

---

## 🛑 Arrêter un Service

```bash
# Par port
sudo kill -9 $(sudo lsof -t -i:8081)  # Exemple: Auth Service

# Par PID (si démarré avec start-all.sh)
kill $(cat .pids/auth-service.pid)

# Tous les services
./stop-all.sh
```

---

## 📝 Voir les Logs

```bash
# Tous les logs
tail -f logs/*.log

# Log spécifique
tail -f logs/auth-service.log
tail -f logs/hr-service.log
tail -f logs/frontend.log
```

---

## 🔧 Dépannage Express

```bash
# Port occupé
sudo kill -9 $(sudo lsof -t -i:PORT)

# PostgreSQL
sudo systemctl restart postgresql

# Rebuild Maven
cd backend/<service> && mvn clean install

# Réinstaller npm
cd frontend/erp-ui && rm -rf node_modules && npm install
```

---

## 🌐 URLs

- **Application:** http://localhost:4200
- **Documentation complète:** [GUIDE_DEMARRAGE_SERVEURS.md](./GUIDE_DEMARRAGE_SERVEURS.md)
- **Dépannage:** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
