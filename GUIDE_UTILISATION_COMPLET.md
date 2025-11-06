# 📖 Guide d'Utilisation Complet - ERP Municipal Tunis

## 🚀 Démarrage Rapide

### 1. Démarrer tous les services
```bash
cd /home/sahar/Bureau/ERp
./start-all.sh
```

### 2. Accéder à l'application
Ouvrez votre navigateur: **http://localhost:4200**

### 3. Se connecter
Utilisez l'un des comptes suivants selon votre rôle:

| Rôle | Username | Password |
|------|----------|----------|
| **Admin** | `sahar_admin` | `test123` |
| **Chef** | `sahar_chief` | `test123` |
| **Agent** | `sahar_agent` | `test123` |
| **Citoyen** | `sahar_citizen` | `test123` |

---

## 👤 Guide par Rôle

### 🔴 ADMIN (Administrateur)

#### Dashboard
Au login, vous voyez:
- **Utilisateurs Total**: 10 utilisateurs (7 citoyens, 1 agent, 1 chief, 1 admin)
- **Budget Total**: 8,000,000 € (3 budgets départementaux)
- **Réclamations en cours**: 4 réclamations
- **Projets Actifs**: 4 projets

#### Actions Rapides
1. **➕ Nouvelle Réclamation** - Créer une réclamation
2. **👥 Nouvel Employé** - Ajouter un employé
3. **💰 Nouveau Budget** - Créer un budget
4. **🏗️ Nouveau Projet** - Lancer un projet

#### Gestion des Réclamations
**Navigation**: Sidebar > Réclamations

**Tableau des réclamations**:
- Colonnes: ID, Citoyen, Catégorie, Sujet, Priorité, Statut, Date, Actions
- Statistiques en haut: Total, Nouvelles, En cours, Résolues, Refusées

**Actions disponibles**:
1. **✅ Accepter** - Change le statut à "EN_COURS"
   - Peut assigner à un agent
   - Peut ajouter une réponse
   
2. **❌ Refuser** - Change le statut à "REFUSE"
   - Obligatoire: Ajouter une raison

3. **💬 Répondre** - Envoyer un message au citoyen
   - La réponse est visible par le citoyen

4. **👁️ Voir** - Voir les détails complets

**Exemple d'utilisation**:
```
1. Citoyen signale "Nid de poule Avenue République"
2. Admin clique sur "Accepter"
3. Sélectionne agent: "sahar_agent"
4. Ajoute réponse: "Équipe envoyée sur place dans les 24h"
5. Le citoyen reçoit la notification
```

#### Gestion des Employés
**Navigation**: Sidebar > Gestion Équipe > Gestion des Employés

**Affichage**:
- Liste de 5 employés actuels
- Colonnes: Matricule, Nom, Email, Département, Poste, Statut

**Actions**:
- **+ Nouvel Employé** - Formulaire complet
  - Matricule (auto ou manuel)
  - Nom, Prénom
  - Email, Téléphone
  - Département
  - Poste
  - Date d'embauche
  - Salaire
  - Statut (ACTIVE/INACTIVE)

- **✏️ Modifier** - Éditer un employé existant
- **🗑️ Supprimer** - Supprimer un employé

#### Gestion des Budgets
**Navigation**: Sidebar > Budget & Projets

**Section Budgets**:
- **Année**: Sélecteur d'année (2023-2026)
- Affichage des 3 budgets départementaux:
  - Travaux Publics: 5,000,000 € (64% utilisé)
  - Services Techniques: 2,000,000 € (40% utilisé)
  - Finances: 1,000,000 € (45% utilisé)

**Actions**:
- **+ Nouveau Budget** - Créer un budget
  - Département
  - Année
  - Montant alloué
  - Statut

#### Gestion des Projets
**Navigation**: Sidebar > Budget & Projets > Onglet Projets

**Projets actifs**:
1. **Rénovation Avenue Habib Bourguiba**
   - Budget: 1,500,000 €
   - Dépensé: 900,000 € (60%)
   - Manager: Mohamed Ben Ali
   - Progrès: 60%

2. **Éclairage Public LED**
   - Budget: 800,000 €
   - Dépensé: 400,000 € (50%)
   - Manager: Karim Mansour
   - Progrès: 50%

3. **Digitalisation des Services**
   - Budget: 500,000 €
   - Dépensé: 350,000 € (70%)
   - Manager: Sana Gharbi
   - Progrès: 70%

4. **Aménagement Parc Central**
   - Budget: 1,200,000 €
   - Dépensé: 600,000 € (40%)
   - Manager: Mohamed Ben Ali
   - Progrès: 40%

**Actions sur projets**:
- **+ Nouveau Projet** - Formulaire complet
- **Voir détails** - Afficher les informations complètes
- **Modifier** - Mettre à jour le projet
- **Suivre progrès** - Graphiques et timeline

---

### 🟡 CHIEF (Chef de Service)

#### Dashboard
- Vue similaire à l'admin mais focalisée sur son département
- Statistiques de son équipe
- Réclamations à valider

#### Responsabilités Principales
1. **Assigner les réclamations** aux agents de son équipe
2. **Valider** les réclamations traitées
3. **Approuver ou refuser** les demandes
4. **Gérer son équipe** d'agents

#### Workflow Type
```
1. Nouvelle réclamation arrive
2. Chief l'examine
3. Accepte et assigne à un agent compétent
4. Agent traite la réclamation
5. Chief valide la résolution
6. Réclamation clôturée
```

---

### 🔵 AGENT (Agent Municipal)

#### Dashboard
- **Mes Réclamations Assignées**: Liste des réclamations à traiter
- **Tâches en cours**: Nombre de tâches actives
- **Tâches terminées**: Historique

#### Traitement d'une Réclamation

**Étape 1: Prendre en charge**
- Cliquer sur une réclamation assignée
- Changer statut à "EN_COURS"
- Ajouter un commentaire: "Prise en charge de la demande"

**Étape 2: Intervention**
- Traiter le problème sur le terrain
- Mettre à jour le statut régulièrement
- Ajouter des photos/commentaires

**Étape 3: Résolution**
- Cliquer sur "Résoudre"
- Ajouter la résolution: "Problème résolu le XX/XX/XXXX"
- Ajouter une réponse au citoyen

**Exemple complet**:
```
Réclamation: "Nid de poule Avenue République"
Agent: sahar_agent

Actions:
1. [10h00] Accepté: "Équipe dépêchée sur place"
2. [14h30] Commentaire: "Intervention en cours"
3. [17h00] Résolu: "Nid de poule comblé. Route praticable."
4. Réponse citoyen: "Merci pour votre signalement!"
```

---

### 🟢 CITIZEN (Citoyen)

#### Dashboard
- **Mes Réclamations**: Vue de toutes ses réclamations
- **Créer une réclamation**: Bouton principal

#### Créer une Réclamation

**Étape 1: Cliquer sur "+ Nouvelle Réclamation"**

**Étape 2: Remplir le formulaire**
- **Titre**: Court et descriptif (ex: "Nid de poule rue X")
- **Catégorie**: Choisir parmi:
  - Voirie
  - Éclairage
  - Propreté
  - Eau
  - Espaces Verts
  - Signalisation
  - Autre

- **Priorité**:
  - BASSE (LOW)
  - MOYENNE (MEDIUM)
  - HAUTE (HIGH)
  - URGENTE (URGENT)

- **Description**: Détails du problème
- **Adresse**: Localisation précise
- **Photos** (optionnel): Joindre des images

**Étape 3: Soumettre**
- Cliquer sur "Soumettre"
- Recevoir une confirmation avec numéro de réclamation

#### Suivre une Réclamation

**Dans "Mes Réclamations"**, chaque réclamation affiche:
- **Statut**: 
  - 🆕 NOUVEAU - Pas encore traitée
  - ⏳ EN_COURS - En cours de traitement
  - ✅ RESOLU - Problème résolu
  - ❌ REFUSE - Demande refusée
  - ⏸️ EN_ATTENTE - En attente d'information

- **Réponse**: Message de l'administration (si disponible)
- **Date de résolution**: Si applicable
- **Agent assigné**: Nom de l'agent qui traite

**Exemple d'affichage**:
```
┌─────────────────────────────────────────────┐
│ Réclamation #1234                           │
│                                             │
│ Titre: Nid de poule Avenue République      │
│ Statut: ✅ RESOLU                          │
│ Date: 01/11/2025                           │
│                                             │
│ Réponse:                                    │
│ "Votre signalement a été traité le         │
│ 06/11/2025. Le nid de poule a été comblé.  │
│ Merci pour votre contribution!"            │
│                                             │
│ Résolu le: 06/11/2025 à 17:00             │
│ Par: sahar_agent                           │
└─────────────────────────────────────────────┘
```

---

## 🔄 Workflows Complets

### Workflow 1: Réclamation Acceptée et Résolue

```
1. CITOYEN (sahar_citizen)
   └─> Crée réclamation "Fuite d'eau rue X"
   
2. ADMIN/CHIEF (sahar_admin)
   └─> Voit la réclamation (Statut: NOUVEAU)
   └─> Clique "Accepter"
   └─> Assigne à: sahar_agent
   └─> Ajoute réponse: "Équipe envoyée sous 24h"
   └─> Statut: EN_COURS

3. AGENT (sahar_agent)
   └─> Voit la réclamation dans "Mes tâches"
   └─> Se rend sur place
   └─> Ajoute commentaire: "Intervention en cours"
   └─> Répare la fuite
   └─> Clique "Résoudre"
   └─> Ajoute résolution: "Fuite réparée"
   └─> Statut: RESOLU

4. CITOYEN (sahar_citizen)
   └─> Voit le statut "RESOLU"
   └─> Lit la réponse de l'agent
   └─> Peut donner un feedback (étoiles)
```

### Workflow 2: Réclamation Refusée

```
1. CITOYEN
   └─> Crée réclamation "Problème avec voisin bruyant"
   
2. CHIEF (sahar_chief)
   └─> Examine la réclamation
   └─> Constate que ce n'est pas de la compétence municipale
   └─> Clique "Refuser"
   └─> Ajoute réponse: "Cette demande relève de la police. 
       Veuillez contacter le commissariat au XXX"
   └─> Statut: REFUSE

3. CITOYEN
   └─> Voit le statut "REFUSE"
   └─> Lit l'explication
   └─> Comprend et contacte le bon service
```

---

## 📊 Statistiques et Rapports

### Pour ADMIN/CHIEF

**Navigation**: Sidebar > Rapports

#### Rapport Dashboard
- **Période**: Sélection (Ce mois, Ce trimestre, Cette année)
- **Métriques**:
  - Total réclamations
  - Taux de résolution
  - Temps moyen de traitement
  - Satisfaction citoyenne

#### Rapport par Catégorie
- Graphique en camembert des réclamations par catégorie
- Top 3 des catégories les plus fréquentes
- Tendances mensuelles

#### Rapport par Agent
- Performance de chaque agent
- Nombre de réclamations traitées
- Temps moyen de résolution
- Taux de satisfaction

#### Export
- **PDF**: Rapport complet formaté
- **Excel**: Données brutes
- **CSV**: Pour analyse personnalisée

---

## 🔐 Sécurité et Confidentialité

### Données Personnelles
- Les citoyens ne voient QUE leurs réclamations
- Les agents voient les réclamations assignées
- Les chiefs voient toutes les réclamations de leur département
- Les admins voient tout

### Mot de Passe
**Changer son mot de passe**:
1. Cliquer sur profil (coin supérieur droit)
2. Paramètres > Sécurité
3. Entrer ancien mot de passe
4. Entrer nouveau mot de passe (min 8 caractères)
5. Confirmer

### Déconnexion
- Cliquer sur profil > Déconnexion
- Ou attendre expiration session (15 min d'inactivité)

---

## 📱 Responsive Design

L'application fonctionne sur:
- 💻 **Desktop**: Expérience complète
- 📱 **Tablette**: Interface adaptée
- 📲 **Mobile**: Vue optimisée pour smartphone

---

## 🆘 Résolution de Problèmes

### Problème: "Je ne peux pas me connecter"
**Solutions**:
1. Vérifier username/password
2. Essayer avec un compte de test (voir début du guide)
3. Contacter l'administrateur

### Problème: "Les données ne s'affichent pas"
**Solutions**:
1. Rafraîchir la page (F5)
2. Vider le cache du navigateur
3. Vérifier que les services backend sont démarrés

### Problème: "Erreur 500"
**Solutions**:
1. Vérifier les logs: `logs/[service]-service.log`
2. Redémarrer le service concerné
3. Contacter le support technique

---

## 📞 Support

**Email**: sahargaiche6@gmail.com  
**Tél**: [À compléter]  
**Heures**: Lun-Ven 8h-17h

---

## 🎓 Tutoriels Vidéo (À venir)

1. 🎥 Créer sa première réclamation (Citoyen)
2. 🎥 Traiter une réclamation (Agent)
3. 🎥 Gérer son équipe (Chief)
4. 🎥 Administrer le système (Admin)

---

**Dernière mise à jour**: 6 Novembre 2025  
**Version**: 1.0.0
