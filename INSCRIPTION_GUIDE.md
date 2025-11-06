# Guide d'Inscription - ERP Municipalité de Tunis

## ✅ Fonctionnalité Complétée

La page d'inscription a été ajoutée avec succès au frontend et est connectée au backend existant.

## 🎯 Composants Créés

### Frontend (Angular)

#### 1. Composant d'Inscription
- **Fichier**: `/frontend/erp-ui/src/app/auth/register.component.ts`
- **Template**: `/frontend/erp-ui/src/app/auth/register.component.html`
- **Route**: `http://localhost:4200/register`

#### 2. Fonctionnalités
- ✅ Formulaire de validation avec:
  - Nom d'utilisateur (min 3 caractères)
  - Email (validation format email)
  - Mot de passe (min 6 caractères)
  - Confirmation du mot de passe
- ✅ Validation côté client
- ✅ Messages d'erreur détaillés
- ✅ Redirection automatique vers la page de connexion après inscription réussie
- ✅ Design cohérent avec le reste de l'application

#### 3. Intégrations
- Ajout dans `app.module.ts` (déclarations)
- Ajout dans `app.routing.ts` (route `/register`)
- Lien ajouté sur la page de connexion
- Service `AuthService` étendu avec la méthode `register()`

### Backend (Spring Boot)

Le backend était déjà configuré avec:
- **Endpoint**: `POST /api/auth/register`
- **Port**: 8081
- **Service**: `auth-service`
- Enregistrement des utilisateurs dans la base PostgreSQL
- Hashage automatique des mots de passe (BCrypt)
- Rôle par défaut: `CITIZEN`

## 📋 Modèles de Données

### RegisterRequest (Frontend)
```typescript
{
  username: string;
  email: string;
  password: string;
  role?: string; // Optionnel, par défaut: 'CITIZEN'
}
```

### User (Backend)
```java
- UUID id
- String username (unique)
- String passwordHash
- String email (unique)
- String phone
- String role (CITIZEN, AGENT, CHIEF, ADMIN)
- String status (ACTIVE, LOCKED)
- OffsetDateTime createdAt
```

## 🚀 Comment Utiliser

### 1. Accéder à la Page d'Inscription
```
http://localhost:4200/register
```

### 2. Remplir le Formulaire
- Entrer un nom d'utilisateur (minimum 3 caractères)
- Entrer une adresse email valide
- Choisir un mot de passe (minimum 6 caractères)
- Confirmer le mot de passe

### 3. Après Inscription
- Message de succès affiché
- Redirection automatique vers `/login` après 2 secondes
- L'utilisateur peut alors se connecter avec ses identifiants

## 🔗 Navigation

### Depuis la Page de Connexion
Lien "Créer un compte" dans le footer → Redirige vers `/register`

### Depuis la Page d'Inscription
Lien "Vous avez déjà un compte? Se connecter" dans le footer → Redirige vers `/login`

## 🎨 Style

Le composant utilise les mêmes styles que les autres pages d'authentification:
- Design moderne avec gradient violet
- Carte centrée avec ombre portée
- Formulaire responsive
- Messages d'erreur/succès colorés

## 🔒 Sécurité

- ✅ Validation côté client (format, longueur)
- ✅ Validation côté serveur
- ✅ Hashage des mots de passe (BCrypt)
- ✅ Unicité username/email garantie en base de données
- ✅ Protection CORS configurée

## 📊 Statut des Services

### Services Backend en Cours
- ✅ auth-service (port 8081)
- ✅ hr-service
- ✅ budget-service
- ✅ claims-service
- ✅ reports-service

### Frontend
- ✅ Angular Dev Server (port 4200)

## 🧪 Test Manuel

Pour tester l'inscription via curl:
```bash
curl -X POST http://localhost:8081/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "nouveau_user",
    "email": "nouveau@example.com",
    "password": "motdepasse123",
    "role": "CITIZEN"
  }'
```

## 📝 Notes Techniques

1. Le composant utilise `ReactiveFormsModule` pour la gestion des formulaires
2. Les validateurs Angular intégrés sont utilisés (required, email, minLength)
3. La méthode `markFormGroupTouched()` assure l'affichage des erreurs
4. Le rôle est automatiquement défini à 'CITIZEN' pour les nouvelles inscriptions
5. L'endpoint backend retourne un `ResponseEntity<Void>` (succès = 200 OK)

## 🎯 Prochaines Améliorations Possibles

- [ ] Validation email par OTP
- [ ] Force de mot de passe (indicateur visuel)
- [ ] Captcha anti-bot
- [ ] Upload photo de profil
- [ ] Sélection du département
- [ ] Acceptation des conditions d'utilisation
