-- Script SQL pour insérer des données de test
-- Exécutez ce script après avoir démarré l'application

-- ===========================================
-- BASE DE DONNÉES: erp_auth
-- ===========================================
\c erp_auth;

-- Créer des utilisateurs de test
-- Mot de passe pour tous: "test123"
-- Hash BCrypt de "test123": $2a$10$rLZ3xqH8DYqH3yMKWGxMXeqPzqY6bXj3zVQXqYqZ7YqZ7YqZ7YqZ7u

INSERT INTO users (id, username, email, full_name, password, role, department, created_at)
VALUES 
  (gen_random_uuid(), 'admin', 'admin@erp.com', 'Administrateur Principal', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ADMIN', 'DIRECTION', NOW()),
  (gen_random_uuid(), 'rh_manager', 'rh@erp.com', 'Manager RH', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'HR_MANAGER', 'RH', NOW()),
  (gen_random_uuid(), 'budget_manager', 'budget@erp.com', 'Manager Budget', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'BUDGET_MANAGER', 'FINANCE', NOW())
ON CONFLICT DO NOTHING;

-- ===========================================
-- BASE DE DONNÉES: erp_hr
-- ===========================================
\c erp_hr;

-- Insérer des employés de test
INSERT INTO employees (id, matricule, first_name, last_name, email, phone, department, position, hire_date, salary, status)
VALUES 
  (1, 'EMP001', 'Ahmed', 'Ben Salem', 'ahmed.bensalem@erp.com', '+216 20 123 456', 'RH', 'Directeur RH', '2020-01-15', 4500.00, 'ACTIVE'),
  (2, 'EMP002', 'Fatma', 'Trabelsi', 'fatma.trabelsi@erp.com', '+216 20 234 567', 'FINANCE', 'Chef Comptable', '2019-03-20', 4000.00, 'ACTIVE'),
  (3, 'EMP003', 'Mohamed', 'Sfar', 'mohamed.sfar@erp.com', '+216 20 345 678', 'IT', 'Développeur', '2021-06-10', 3500.00, 'ACTIVE'),
  (4, 'EMP004', 'Leila', 'Gharbi', 'leila.gharbi@erp.com', '+216 20 456 789', 'RH', 'Assistant RH', '2022-02-01', 2800.00, 'ACTIVE'),
  (5, 'EMP005', 'Karim', 'Hamdi', 'karim.hamdi@erp.com', '+216 20 567 890', 'SERVICES', 'Agent Municipal', '2018-09-15', 2500.00, 'ON_LEAVE')
ON CONFLICT DO NOTHING;

-- Insérer des demandes de congés
INSERT INTO leaves (employee_id, type, start_date, end_date, days, status, reason, created_at)
VALUES 
  (1, 'ANNUAL', '2025-12-20', '2025-12-30', 10, 'APPROVED', 'Vacances de fin d''année', NOW()),
  (2, 'SICK', '2025-11-10', '2025-11-12', 3, 'APPROVED', 'Grippe', NOW()),
  (3, 'ANNUAL', '2025-11-25', '2025-11-29', 5, 'PENDING', 'Congé personnel', NOW()),
  (4, 'ANNUAL', '2025-12-15', '2025-12-22', 8, 'PENDING', 'Vacances', NOW())
ON CONFLICT DO NOTHING;

-- ===========================================
-- BASE DE DONNÉES: erp_budget
-- ===========================================
\c erp_budget;

-- Insérer des budgets
INSERT INTO budgets (id, department, year, total_allocated, total_spent, remaining, status, created_at, updated_at)
VALUES 
  (1, 'RH', 2025, 500000.00, 320000.00, 180000.00, 'IN_PROGRESS', NOW(), NOW()),
  (2, 'INFRASTRUCTURE', 2025, 2000000.00, 1450000.00, 550000.00, 'IN_PROGRESS', NOW(), NOW()),
  (3, 'SERVICES', 2025, 800000.00, 520000.00, 280000.00, 'IN_PROGRESS', NOW(), NOW()),
  (4, 'CULTURE', 2025, 300000.00, 180000.00, 120000.00, 'IN_PROGRESS', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insérer des projets
INSERT INTO projects (id, name, description, department, budget, spent, start_date, end_date, status, progress, manager)
VALUES 
  (1, 'Rénovation Parc Central', 'Rénovation complète du parc central de la ville', 'INFRASTRUCTURE', 500000.00, 320000.00, '2025-01-01', '2025-12-31', 'IN_PROGRESS', 65, 'Ahmed Ben Salem'),
  (2, 'Modernisation Éclairage Public', 'Remplacement des lampadaires par LED', 'INFRASTRUCTURE', 800000.00, 450000.00, '2025-03-01', '2025-11-30', 'IN_PROGRESS', 55, 'Fatma Trabelsi'),
  (3, 'Digitalisation Services', 'Mise en place ERP et services en ligne', 'IT', 200000.00, 120000.00, '2025-02-01', '2025-12-31', 'IN_PROGRESS', 60, 'Mohamed Sfar'),
  (4, 'Festival Culturel Annuel', 'Organisation du festival culturel 2025', 'CULTURE', 150000.00, 80000.00, '2025-06-01', '2025-09-30', 'PLANNING', 30, 'Leila Gharbi'),
  (5, 'Amélioration Collecte Déchets', 'Optimisation du système de collecte', 'SERVICES', 300000.00, 150000.00, '2025-04-01', '2025-10-31', 'IN_PROGRESS', 50, 'Karim Hamdi')
ON CONFLICT DO NOTHING;

-- ===========================================
-- BASE DE DONNÉES: erp_claims
-- ===========================================
\c erp_claims;

-- Insérer des réclamations
INSERT INTO claims (id, citizen_name, citizen_email, citizen_phone, category, priority, subject, description, address, status, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'Salah Mansour', 'salah.mansour@gmail.com', '+216 98 123 456', 'INFRASTRUCTURE', 'HIGH', 'Nid de poule avenue Habib Bourguiba', 'Il y a un grand nid de poule dangereux sur l''avenue Habib Bourguiba près de la pharmacie centrale', 'Avenue Habib Bourguiba, Tunis', 'NEW', NOW(), NOW()),
  (gen_random_uuid(), 'Amira Sassi', 'amira.sassi@gmail.com', '+216 98 234 567', 'LIGHTING', 'MEDIUM', 'Lampadaire cassé rue de la République', 'Le lampadaire au coin de la rue de la République ne fonctionne plus depuis une semaine', 'Rue de la République, Tunis', 'IN_PROGRESS', NOW(), NOW()),
  (gen_random_uuid(), 'Hedi Jlassi', 'hedi.jlassi@gmail.com', '+216 98 345 678', 'SANITATION', 'URGENT', 'Fuite d''eau importante', 'Fuite d''eau importante devant l''immeuble, risque d''inondation', 'Rue Ibn Khaldoun, Tunis', 'NEW', NOW(), NOW()),
  (gen_random_uuid(), 'Sonia Ferchichi', 'sonia.f@gmail.com', '+216 98 456 789', 'ADMINISTRATIVE', 'LOW', 'Demande de certificat de résidence', 'Je souhaite obtenir un certificat de résidence pour mes démarches administratives', 'Mairie Centrale, Tunis', 'RESOLVED', NOW(), NOW()),
  (gen_random_uuid(), 'Riadh Khelifi', 'riadh.kh@gmail.com', '+216 98 567 890', 'SECURITY', 'HIGH', 'Passage piéton dangereux', 'Le passage piéton devant l''école primaire n''est pas visible, très dangereux pour les enfants', 'Avenue de la Liberté, Tunis', 'IN_PROGRESS', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Message de confirmation
SELECT 'Données de test insérées avec succès!' as message;
