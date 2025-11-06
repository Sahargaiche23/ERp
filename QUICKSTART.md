# Guide de Démarrage Rapide - ERP Municipal

## Installation en 5 minutes

### 1. Vérifier les prérequis

```bash
# Vérifier PostgreSQL
psql --version

# Vérifier Java
java --version

# Vérifier Maven
mvn --version

# Vérifier Node.js
node --version

# Vérifier Python
python3 --version
```

Si l'un de ces outils manque, suivez les instructions dans le README.md principal.

### 2. Configuration automatique

```bash
cd /home/sahar/Bureau/ERp
./setup-local.sh
```

### 3. Installer les dépendances

```bash
# Frontend
cd frontend/erp-ui
npm install
cd ../..

# AI Services (installation rapide)
pip install fastapi uvicorn pydantic scikit-learn joblib numpy
```

### 4. Configuration de l'email (important!)

Éditez le fichier:
```
backend/auth-service/src/main/resources/application.properties
```

Remplacez:
```properties
spring.mail.username=sahargaiche6@gmail.com
spring.mail.password=your-app-password
```

Par vos propres credentials Gmail avec un mot de passe d'application.

### 5. Démarrer l'application

```bash
./start-all.sh
```

Attendez environ 2-3 minutes que tous les services démarrent.

### 6. Accéder à l'application

Ouvrez votre navigateur: **http://localhost:4200**

## Credentials de test

Par défaut, vous devrez créer un compte utilisateur via la base de données ou utiliser l'API d'inscription.

### Créer un utilisateur admin manuellement

```sql
-- Connectez-vous à PostgreSQL
psql -U postgres -d erp_auth

-- Insérer un utilisateur test (mot de passe: "admin123")
INSERT INTO users (id, username, email, full_name, password, role, created_at)
VALUES (
  gen_random_uuid(),
  'admin',
  'admin@erp.com',
  'Administrateur',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'ADMIN',
  NOW()
);
```

Mot de passe: `admin123`

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

### 3. Vérifier le frontend

Ouvrez http://localhost:4200 - vous devriez voir la page de login.

## Arrêter l'application

```bash
./stop-all.sh
```

## Dépannage rapide

### Port déjà utilisé
```bash
# Arrêter tous les services
./stop-all.sh

# Vérifier qu'aucun processus n'utilise les ports
sudo lsof -i :4200
sudo lsof -i :8081
# etc.
```

### Base de données non accessible
```bash
# Redémarrer PostgreSQL
sudo systemctl restart postgresql

# Vérifier le statut
sudo systemctl status postgresql
```

### Logs des erreurs
```bash
# Voir les logs d'un service
tail -f logs/auth-service.log
tail -f logs/hr-service.log
tail -f logs/frontend.log
```

## Modules disponibles

Une fois connecté, vous aurez accès à:
- 📊 **Tableau de bord** - Vue d'ensemble
- 👥 **RH** - Employés, congés, pointage
- 💰 **Budget & Projets** - Gestion budgétaire
- 📝 **Réclamations** - Gestion des réclamations
- 📈 **Rapports** - Génération de rapports

## Support

Pour toute question: sahargaiche6@gmail.com
