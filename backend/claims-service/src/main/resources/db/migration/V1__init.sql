CREATE SCHEMA IF NOT EXISTS claims;

CREATE TABLE IF NOT EXISTS claims.claims (
    id UUID PRIMARY KEY,
    citizen_name VARCHAR(200) NOT NULL,
    citizen_email VARCHAR(200),
    category VARCHAR(120) NOT NULL,
    priority VARCHAR(30) NOT NULL DEFAULT 'NORMAL',
    description TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'OPEN',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS claims.claim_events (
    id UUID PRIMARY KEY,
    claim_id UUID REFERENCES claims.claims(id) ON DELETE CASCADE,
    status VARCHAR(30) NOT NULL,
    note TEXT,
    ts TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
