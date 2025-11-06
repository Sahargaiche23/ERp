-- =====================================================
-- Script d'insertion de données de test pour ERP Tunis
-- =====================================================

-- ===================
-- BASE: erp_hr (Employés)
-- ===================

\c erp_hr;

-- Supprimer les données existantes
TRUNCATE TABLE employees CASCADE;
TRUNCATE TABLE leaves CASCADE;
TRUNCATE TABLE attendance CASCADE;

-- Insérer des employés
INSERT INTO employees (id, matricule, first_name, last_name, email, phone, department, position, hire_date, salary, status, created_at, updated_at) VALUES
(1, 'EMP001', 'Mohamed', 'Ben Ali', 'mohamed.benali@tunis.tn', '+216 20 123 456', 'Travaux Publics', 'Ingénieur', '2020-01-15', 2500.00, 'ACTIVE', NOW(), NOW()),
(2, 'EMP002', 'Fatma', 'Trabelsi', 'fatma.trabelsi@tunis.tn', '+216 20 234 567', 'Finances', 'Comptable', '2019-03-20', 2000.00, 'ACTIVE', NOW(), NOW()),
(3, 'EMP003', 'Ahmed', 'Khelifi', 'ahmed.khelifi@tunis.tn', '+216 20 345 678', 'RH', 'Responsable RH', '2018-06-10', 3000.00, 'ACTIVE', NOW(), NOW()),
(4, 'EMP004', 'Sana', 'Gharbi', 'sana.gharbi@tunis.tn', '+216 20 456 789', 'Travaux Publics', 'Chef de Projet', '2021-02-01', 2800.00, 'ACTIVE', NOW(), NOW()),
(5, 'EMP005', 'Karim', 'Mansour', 'karim.mansour@tunis.tn', '+216 20 567 890', 'Services Techniques', 'Technicien', '2020-09-15', 1800.00, 'ACTIVE', NOW(), NOW()),
(6, 'EMP006', 'Leila', 'Ben Salem', 'leila.bensalem@tunis.tn', '+216 20 678 901', 'Communication', 'Chargée de Communication', '2021-07-01', 2200.00, 'ACTIVE', NOW(), NOW()),
(7, 'EMP007', 'Youssef', 'Amri', 'youssef.amri@tunis.tn', '+216 20 789 012', 'Travaux Publics', 'Agent de Terrain', '2022-01-10', 1500.00, 'ACTIVE', NOW(), NOW()),
(8, 'EMP008', 'Amira', 'Jaber', 'amira.jaber@tunis.tn', '+216 20 890 123', 'Finances', 'Analyste Financier', '2019-11-20', 2400.00, 'ACTIVE', NOW(), NOW());

-- Insérer des demandes de congés
INSERT INTO leaves (id, employee_id, leave_type, start_date, end_date, reason, status, created_at, updated_at) VALUES
(1, 1, 'ANNUAL', '2025-12-20', '2025-12-31', 'Vacances de fin d''année', 'APPROVED', NOW(), NOW()),
(2, 2, 'SICK', '2025-11-01', '2025-11-03', 'Grippe', 'APPROVED', NOW(), NOW()),
(3, 3, 'ANNUAL', '2025-11-15', '2025-11-22', 'Vacances familiales', 'PENDING', NOW(), NOW()),
(4, 5, 'SICK', '2025-11-07', '2025-11-08', 'Consultation médicale', 'PENDING', NOW(), NOW());

-- Insérer des présences
INSERT INTO attendance (id, employee_id, date, check_in, check_out, status, created_at) VALUES
(1, 1, CURRENT_DATE, '08:00:00', '17:00:00', 'PRESENT', NOW()),
(2, 2, CURRENT_DATE, '08:15:00', '17:15:00', 'PRESENT', NOW()),
(3, 3, CURRENT_DATE, '08:30:00', '17:30:00', 'LATE', NOW()),
(4, 4, CURRENT_DATE, '08:00:00', '17:00:00', 'PRESENT', NOW()),
(5, 5, CURRENT_DATE, NULL, NULL, 'ABSENT', NOW()),
(6, 6, CURRENT_DATE, '08:00:00', '17:00:00', 'PRESENT', NOW()),
(7, 7, CURRENT_DATE, '07:45:00', '16:45:00', 'PRESENT', NOW()),
(8, 8, CURRENT_DATE, '08:00:00', '17:00:00', 'PRESENT', NOW());

-- ===================
-- BASE: erp_budget (Budgets et Projets)
-- ===================

\c erp_budget;

-- Supprimer les données existantes
TRUNCATE TABLE budgets CASCADE;
TRUNCATE TABLE projects CASCADE;

-- Insérer des budgets
INSERT INTO budgets (id, department, year, total_allocated, total_spent, remaining, status, created_at, updated_at) VALUES
(1, 'Travaux Publics', 2025, 5000000.00, 3200000.00, 1800000.00, 'IN_PROGRESS', NOW(), NOW()),
(2, 'Services Techniques', 2025, 2000000.00, 800000.00, 1200000.00, 'IN_PROGRESS', NOW(), NOW()),
(3, 'Finances', 2025, 1000000.00, 450000.00, 550000.00, 'IN_PROGRESS', NOW(), NOW()),
(4, 'RH', 2025, 800000.00, 600000.00, 200000.00, 'IN_PROGRESS', NOW(), NOW()),
(5, 'Communication', 2025, 500000.00, 200000.00, 300000.00, 'APPROVED', NOW(), NOW());

-- Insérer des projets
INSERT INTO projects (id, name, description, department, budget, spent, start_date, end_date, status, progress, manager, created_at, updated_at) VALUES
(1, 'Rénovation Avenue Habib Bourguiba', 'Réfection complète de la chaussée et des trottoirs', 'Travaux Publics', 1500000.00, 900000.00, '2025-01-15', '2025-12-31', 'IN_PROGRESS', 60, 'Mohamed Ben Ali', NOW(), NOW()),
(2, 'Éclairage Public LED', 'Remplacement de l''éclairage public par des LED', 'Services Techniques', 800000.00, 400000.00, '2025-03-01', '2025-11-30', 'IN_PROGRESS', 50, 'Karim Mansour', NOW(), NOW()),
(3, 'Digitalisation des Services', 'Mise en place du système ERP municipal', 'Services Techniques', 500000.00, 350000.00, '2025-01-01', '2025-12-31', 'IN_PROGRESS', 70, 'Sana Gharbi', NOW(), NOW()),
(4, 'Aménagement Parc Central', 'Création d''espaces verts et aires de jeux', 'Travaux Publics', 1200000.00, 600000.00, '2025-04-01', '2026-03-31', 'IN_PROGRESS', 40, 'Mohamed Ben Ali', NOW(), NOW()),
(5, 'Campagne de Communication', 'Sensibilisation citoyenne aux services municipaux', 'Communication', 200000.00, 150000.00, '2025-02-01', '2025-11-30', 'IN_PROGRESS', 75, 'Leila Ben Salem', NOW(), NOW()),
(6, 'Réfection Réseaux d''Eau', 'Modernisation du réseau d''eau potable', 'Travaux Publics', 2000000.00, 500000.00, '2025-06-01', '2026-12-31', 'PLANNING', 10, 'Sana Gharbi', NOW(), NOW());

-- ===================
-- BASE: erp_claims (Réclamations)
-- ===================

\c erp_claims;

-- Supprimer les données existantes
TRUNCATE TABLE claims CASCADE;

-- Insérer des réclamations
INSERT INTO claims (id, citizen_id, citizen_name, citizen_email, title, description, category, priority, status, location, address, created_at, updated_at, assigned_to, response, resolved_at) VALUES
(1, 'a8bbd76b-ee61-4d78-bcbe-cdecc80eeee1', 'Test User', 'test@test.com', 'Nid de poule Avenue de la République', 'Un grand nid de poule s''est formé sur l''Avenue de la République, très dangereux pour les véhicules', 'VOIRIE', 'HIGH', 'NOUVEAU', '36.8065,10.1815', 'Avenue de la République, Tunis', '2025-11-01 10:30:00', '2025-11-01 10:30:00', NULL, NULL, NULL),
(2, 'a8bbd76b-ee61-4d78-bcbe-cdecc80eeee2', 'Akram Akram', 'haythem@gmail.com', 'Éclairage public défaillant', 'Plusieurs lampadaires ne fonctionnent plus rue de Marseille', 'ECLAIRAGE', 'MEDIUM', 'NOUVEAU', '36.8025,10.1795', 'Rue de Marseille, Tunis', '2025-11-02 14:20:00', '2025-11-02 14:20:00', NULL, NULL, NULL),
(3, 'a8bbd76b-ee61-4d78-bcbe-cdecc80eeee3', 'Linda Linda', 'ahmed@gmail.com', 'Collecte des ordures irrégulière', 'Les ordures ne sont pas collectées régulièrement dans notre quartier', 'PROPRETE', 'HIGH', 'EN_COURS', '36.8045,10.1825', 'Rue Ibn Khaldoun, Tunis', '2025-11-03 09:15:00', '2025-11-05 11:00:00', 'sahar_agent', 'Nous avons transmis votre réclamation au service de la propreté. Une équipe interviendra dans les 48h.', NULL),
(4, 'a8bbd76b-ee61-4d78-bcbe-cdecc80eeee4', 'Sahar Citizen', 'sahargaiche23@gmail.com', 'Fuite d''eau importante', 'Fuite d''eau sur la canalisation principale rue Charles de Gaulle', 'EAU', 'URGENT', 'EN_COURS', '36.8055,10.1805', 'Rue Charles de Gaulle, Tunis', '2025-11-04 16:45:00', '2025-11-05 08:30:00', 'sahar_agent', 'Équipe technique dépêchée sur place. Intervention en cours.', NULL),
(5, 'a8bbd76b-ee61-4d78-bcbe-cdecc80eeee1', 'Test User', 'test@test.com', 'Demande d''élagage', 'Des branches d''arbres obstruent la vue à un carrefour', 'ESPACES_VERTS', 'LOW', 'RESOLU', '36.8035,10.1795', 'Avenue Mongi Slim, Tunis', '2025-10-28 11:00:00', '2025-11-04 15:00:00', 'sahar_agent', 'Élagage effectué le 04/11/2025. Merci pour votre signalement.', '2025-11-04 15:00:00'),
(6, 'a8bbd76b-ee61-4d78-bcbe-cdecc80eeee5', 'Test Login', 'testlogin@test.com', 'Panneau de signalisation manquant', 'Le panneau stop a disparu au croisement Rue de la Liberté', 'SIGNALISATION', 'HIGH', 'RESOLU', '36.8075,10.1835', 'Rue de la Liberté, Tunis', '2025-10-30 13:20:00', '2025-11-03 10:00:00', 'sahar_agent', 'Panneau remplacé. Situation résolue.', '2025-11-03 10:00:00'),
(7, 'a8bbd76b-ee61-4d78-bcbe-cdecc80eeee2', 'Akram Akram', 'haythem@gmail.com', 'Dégradation du parc municipal', 'Les équipements du parc sont vandalisés et nécessitent réparation', 'ESPACES_VERTS', 'MEDIUM', 'REFUSE', '36.8015,10.1775', 'Parc Bellevue, Tunis', '2025-11-01 08:00:00', '2025-11-02 16:00:00', 'sahar_chief', 'Cette demande relève de la police municipale. Veuillez contacter le commissariat.', NULL),
(8, 'a8bbd76b-ee61-4d78-bcbe-cdecc80eeee6', 'Sahar Sahar', 'sahargaiche6@gmail.com', 'Bruit excessif chantier', 'Le chantier voisin fait du bruit tôt le matin', 'AUTRE', 'LOW', 'EN_ATTENTE', '36.8065,10.1845', 'Rue du Japon, Tunis', '2025-11-05 07:30:00', '2025-11-05 07:30:00', NULL, NULL, NULL);

-- Réinitialiser les séquences
SELECT setval('employees_id_seq', (SELECT MAX(id) FROM employees));
SELECT setval('leaves_id_seq', (SELECT MAX(id) FROM leaves));
SELECT setval('attendance_id_seq', (SELECT MAX(id) FROM attendance));
SELECT setval('budgets_id_seq', (SELECT MAX(id) FROM budgets));
SELECT setval('projects_id_seq', (SELECT MAX(id) FROM projects));
SELECT setval('claims_id_seq', (SELECT MAX(id) FROM claims));

-- Afficher les résultats
\c erp_hr;
SELECT 'Employés insérés: ' || COUNT(*) as result FROM employees;

\c erp_budget;
SELECT 'Budgets insérés: ' || COUNT(*) as result FROM budgets;
SELECT 'Projets insérés: ' || COUNT(*) as result FROM projects;

\c erp_claims;
SELECT 'Réclamations insérées: ' || COUNT(*) as result FROM claims;
