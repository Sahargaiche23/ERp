CREATE SCHEMA IF NOT EXISTS hr;

CREATE TABLE IF NOT EXISTS hr.employees (
    id              UUID PRIMARY KEY,
    first_name      VARCHAR(120) NOT NULL,
    last_name       VARCHAR(120) NOT NULL,
    email           VARCHAR(200) UNIQUE NOT NULL,
    department      VARCHAR(120),
    role_title      VARCHAR(120),
    hired_at        DATE,
    status          VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hr.attendance (
    id              UUID PRIMARY KEY,
    employee_id     UUID REFERENCES hr.employees(id) ON DELETE CASCADE,
    day             DATE NOT NULL,
    check_in        TIMESTAMPTZ,
    check_out       TIMESTAMPTZ,
    status          VARCHAR(30) -- PRESENT, ABSENT, LATE
);

CREATE TABLE IF NOT EXISTS hr.leaves (
    id              UUID PRIMARY KEY,
    employee_id     UUID REFERENCES hr.employees(id) ON DELETE CASCADE,
    type            VARCHAR(50) NOT NULL, -- ANNUAL, SICK, UNPAID
    start_date      DATE NOT NULL,
    end_date        DATE NOT NULL,
    status          VARCHAR(30) NOT NULL DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
