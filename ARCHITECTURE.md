# Architecture ERP Municipal

## Vue d'ensemble

L'application ERP Municipal est une application distribuée composée de microservices backend (Spring Boot), de services d'intelligence artificielle (FastAPI/Python), et d'une interface utilisateur frontend (Angular).

## Architecture Technique

### Backend - Microservices Spring Boot

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Angular)                       │
│                    http://localhost:4200                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ HTTP/REST
                       │
        ┌──────────────┴──────────────┐
        │                             │
        ▼                             ▼
┌───────────────┐            ┌────────────────┐
│  Auth Service │            │  Other Services│
│   Port 8081   │            │  Ports 8082-85 │
└───────┬───────┘            └────────┬───────┘
        │                             │
        ├─────────────────────────────┤
        │                             │
        ▼                             ▼
┌─────────────────┐          ┌──────────────┐
│   PostgreSQL    │          │    Redis     │
│   Port 5432     │          │  Port 6379   │
└─────────────────┘          └──────────────┘
```

### Services Backend

#### 1. Auth Service (Port 8081)
**Responsabilité**: Authentification et autorisation
- Gestion des utilisateurs
- Login avec JWT
- OTP par email (MFA)
- Réinitialisation de mot de passe
- Logs des connexions

**Technologies**:
- Spring Security
- JWT (JSON Web Tokens)
- BCrypt pour hash des mots de passe
- JavaMail pour OTP
- Redis (optionnel) pour sessions

**Endpoints principaux**:
- `POST /api/auth/login` - Connexion
- `POST /api/auth/verify-otp` - Vérification OTP
- `POST /api/auth/reset-password` - Réinitialisation

#### 2. HR Service (Port 8082)
**Responsabilité**: Gestion des ressources humaines
- CRUD Employés
- Gestion des congés
- Système de pointage

**Endpoints principaux**:
- `GET/POST /api/employees` - Gestion employés
- `GET/POST /api/leaves` - Gestion congés
- `GET/POST /api/attendances` - Pointage

#### 3. Budget Service (Port 8083)
**Responsabilité**: Gestion budgétaire et projets
- Budgets par département
- Gestion des projets
- Transactions financières

**Endpoints principaux**:
- `GET/POST /api/budgets` - Gestion budgets
- `GET/POST /api/projects` - Gestion projets
- `GET/POST /api/transactions` - Transactions

#### 4. Claims Service (Port 8084)
**Responsabilité**: Gestion des réclamations citoyennes
- Enregistrement réclamations
- Suivi et affectation
- Statistiques

**Endpoints principaux**:
- `GET/POST /api/claims` - CRUD réclamations
- `GET /api/claims/stats` - Statistiques
- `PATCH /api/claims/{id}/status` - Mise à jour statut

#### 5. Reports Service (Port 8085)
**Responsabilité**: Rapports et analytics
- Tableaux de bord
- Génération de rapports
- Statistiques globales

**Endpoints principaux**:
- `GET /api/reports/dashboard/stats` - Stats dashboard
- `GET /api/reports/hr` - Rapports RH
- `POST /api/reports/generate` - Génération rapports

### Services AI (FastAPI/Python)

#### 1. AI Security (Port 9001)
**Algorithme**: Isolation Forest
- Détection d'anomalies de connexion
- Scoring de risque
- Suggestions de blocage

#### 2. AI Analytics (Port 9002)
- Analyses statistiques
- Prévisions de tendances
- Forecasting

#### 3. AI Budget (Port 9003)
- Prédiction de coûts
- Optimisation budgétaire

#### 4. AI Claims (Port 9004)
- Classification automatique
- Analyse de sentiment
- Catégorisation

#### 5. AI RH (Port 9005)
- Prévisions d'effectifs
- Analyse des congés

### Frontend (Angular 17)

**Structure des modules**:

```
erp-ui/
├── src/
│   ├── app/
│   │   ├── auth/              # Module authentification
│   │   │   ├── login.component
│   │   │   ├── otp.component
│   │   │   └── reset.component
│   │   ├── dashboard/         # Layout principal
│   │   │   └── home/          # Tableau de bord
│   │   ├── hr/                # Module RH
│   │   │   ├── employees/
│   │   │   ├── leaves/
│   │   │   └── attendance/
│   │   ├── budget/            # Module Budget
│   │   │   ├── budgets/
│   │   │   └── projects/
│   │   ├── claims/            # Module Réclamations
│   │   │   └── claims-list/
│   │   ├── reports/           # Module Rapports
│   │   ├── services/          # Services Angular
│   │   ├── models/            # Modèles TypeScript
│   │   ├── guards/            # Guards de route
│   │   └── interceptors/      # HTTP Interceptors
│   └── styles.css             # Styles globaux
```

**Fonctionnalités**:
- Authentification JWT avec refresh
- Guards de route pour protection
- HTTP Interceptor pour tokens
- Services réutilisables
- Composants modulaires

## Base de Données

### Schéma par service

**erp_auth**:
- users (id, username, email, password, role, department)
- otp_codes (id, user_id, code, expires_at)
- login_events (id, user_id, ip_address, success, timestamp)

**erp_hr**:
- employees (id, matricule, first_name, last_name, email, department, position, salary, status)
- leaves (id, employee_id, type, start_date, end_date, days, status)
- attendances (id, employee_id, date, check_in, check_out, hours_worked, status)

**erp_budget**:
- budgets (id, department, year, total_allocated, total_spent, remaining, status)
- projects (id, name, department, budget, spent, start_date, end_date, status, progress)
- budget_lines (id, budget_id, category, allocated, spent)
- transactions (id, project_id, date, amount, type, category, status)

**erp_claims**:
- claims (id, citizen_name, citizen_email, category, priority, subject, description, status, created_at)
- claim_comments (id, claim_id, author, comment, created_at)

**erp_reports**:
- reports (id, name, type, generated_at, generated_by, file_path)

## Flux de Données

### Exemple: Authentification avec OTP

```
1. User → Frontend: Saisie username/password
2. Frontend → Auth Service: POST /api/auth/login
3. Auth Service → DB: Vérification credentials
4. Auth Service → Mail: Envoi code OTP
5. Auth Service → Frontend: {requiresOtp: true, sessionId: "..."}
6. User → Frontend: Saisie code OTP
7. Frontend → Auth Service: POST /api/auth/verify-otp
8. Auth Service → DB: Vérification code
9. Auth Service → Frontend: {accessToken: "...", user: {...}}
10. Frontend: Stockage token + redirection dashboard
```

## Sécurité

### Mesures de sécurité implémentées

1. **Authentification**:
   - JWT avec expiration (24h par défaut)
   - MFA avec OTP email
   - Hash BCrypt pour mots de passe

2. **Autorisation**:
   - Guards de route frontend
   - Vérification JWT côté backend
   - Rôles utilisateurs (ADMIN, MANAGER, USER)

3. **Communication**:
   - CORS configuré pour localhost:4200
   - HTTPS recommandé en production
   - Validation des entrées

4. **Base de données**:
   - Connexions sécurisées
   - Credentials en fichiers de config
   - Isolation par service

## Scalabilité

### Options de scalabilité

1. **Horizontal scaling**:
   - Chaque service peut être déployé en plusieurs instances
   - Load balancer devant les services

2. **Base de données**:
   - PostgreSQL peut être répliqué
   - Read replicas pour les lectures
   - Partitionnement par service (déjà fait)

3. **Cache**:
   - Redis pour cache de sessions
   - Cache applicatif pour données fréquentes

4. **Files de messages**:
   - RabbitMQ peut être ajouté pour async
   - Événements entre services

## Monitoring et Logs

### Logs
- Chaque service écrit dans `logs/[service-name].log`
- Format structuré pour parsing
- Niveaux: DEBUG, INFO, WARN, ERROR

### Métriques
- Spring Actuator pour health checks
- Endpoints `/actuator/health`
- Métriques personnalisées possibles

## Déploiement

### Environnement de développement (actuel)
- PostgreSQL local
- Redis local (optionnel)
- Services sur localhost
- Hot reload activé

### Environnement de production (recommandé)
- PostgreSQL managé (ex: AWS RDS)
- Redis managé (ex: AWS ElastiCache)
- Services conteneurisés (Kubernetes)
- Load balancer
- HTTPS avec certificats
- Monitoring (Prometheus/Grafana)
- Backup automatique DB

## Technologies Utilisées

### Backend
- Java 17
- Spring Boot 3.3.4
- Spring Security
- Spring Data JPA
- PostgreSQL
- Redis
- Maven

### Frontend
- Angular 17
- TypeScript
- RxJS
- HTML5/CSS3

### AI
- Python 3.9+
- FastAPI
- scikit-learn
- NumPy
- Pydantic

### Infrastructure
- PostgreSQL 14+
- Redis 6+
- Node.js 18+
