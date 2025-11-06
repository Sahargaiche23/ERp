# Tests API - ERP Municipal

## ✅ URLs à utiliser

### Application Principale
```
http://localhost:4200  → Interface web (Angular)
```

### Endpoints API Backend (pour tests)

#### Auth Service (8081)
```bash
# Health check
curl http://localhost:8081/actuator/health

# Endpoints API
curl http://localhost:8081/api/auth/...
```

#### HR Service (8082)
```bash
# Liste des employés
curl http://localhost:8082/api/employees

# Health check
curl http://localhost:8082/actuator/health
```

#### Budget Service (8083)
```bash
# Liste des budgets
curl http://localhost:8083/api/budgets

# Health check
curl http://localhost:8083/actuator/health
```

#### Claims Service (8084)
```bash
# Liste des réclamations
curl http://localhost:8084/api/claims

# Health check
curl http://localhost:8084/actuator/health
```

#### Reports Service (8085)
```bash
# Statistiques dashboard
curl http://localhost:8085/api/reports/dashboard/stats

# Health check
curl http://localhost:8085/actuator/health
```

### Services AI (9001-9005)
```bash
# AI Security
curl http://localhost:9001/health

# AI Analytics
curl http://localhost:9002/health

# AI Budget
curl http://localhost:9003/health

# AI Claims
curl http://localhost:9004/health

# AI RH
curl http://localhost:9005/health
```

---

## ⚠️ IMPORTANT

**NE PAS accéder aux services backend directement dans le navigateur !**

Les services backend (8081-8085) sont des **API REST** qui :
- Répondent en JSON
- N'ont pas d'interface web
- Sont utilisés par le frontend Angular

**Utilisez toujours :**
```
http://localhost:4200
```

---

## 🧪 Test Complet

```bash
# 1. Vérifier tous les services
./verify-services.sh

# 2. Tester les API avec curl
curl http://localhost:8081/actuator/health
curl http://localhost:8082/api/employees
curl http://localhost:9001/health

# 3. Ouvrir le navigateur
firefox http://localhost:4200
# ou
google-chrome http://localhost:4200
```

---

## 📝 Debugging

Si vous rencontrez des problèmes :

```bash
# Voir les logs en temps réel
tail -f logs/frontend.log
tail -f logs/auth-service.log
tail -f logs/hr-service.log

# Redémarrer un service spécifique
./stop-service.sh frontend
./start-service.sh frontend
```
