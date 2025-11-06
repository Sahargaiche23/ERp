#!/bin/bash

echo "================================"
echo "Création des bases de données"
echo "================================"

# Créer les bases de données
sudo -u postgres psql << EOF
CREATE DATABASE erp_auth;
CREATE DATABASE erp_hr;
CREATE DATABASE erp_budget;
CREATE DATABASE erp_claims;
CREATE DATABASE erp_reports;
EOF

echo ""
echo "✓ Bases de données créées!"
echo ""
