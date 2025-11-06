CREATE SCHEMA IF NOT EXISTS budget;

CREATE TABLE IF NOT EXISTS budget.budgets (
    id UUID PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    year INT NOT NULL,
    total_amount NUMERIC(18,2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS budget.budget_lines (
    id UUID PRIMARY KEY,
    budget_id UUID REFERENCES budget.budgets(id) ON DELETE CASCADE,
    category VARCHAR(200) NOT NULL,
    allocated NUMERIC(18,2) NOT NULL,
    spent NUMERIC(18,2) NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS budget.projects (
    id UUID PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    budget_line_id UUID REFERENCES budget.budget_lines(id) ON DELETE SET NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PLANNED',
    progress INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS budget.expenses (
    id UUID PRIMARY KEY,
    project_id UUID REFERENCES budget.projects(id) ON DELETE CASCADE,
    amount NUMERIC(18,2) NOT NULL,
    description TEXT,
    ts TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
