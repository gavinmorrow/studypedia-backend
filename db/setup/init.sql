\set APP_DB_USER 'app'
\set APP_DB_NAME 'app_db'

CREATE USER :APP_DB_USER WITH PASSWORD 'password';
CREATE DATABASE :APP_DB_NAME;
GRANT ALL PRIVILEGES ON DATABASE :APP_DB_NAME TO :APP_DB_USER;

\connect :APP_DB_NAME :APP_DB_USER
BEGIN;
-- Create tables here
COMMIT;
