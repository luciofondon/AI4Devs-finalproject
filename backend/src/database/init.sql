-- Crear tipos enum
CREATE TYPE bus_status AS ENUM ('OK', 'WARNING', 'KO');
CREATE TYPE pupitre_status AS ENUM ('OK', 'WARNING', 'KO');
CREATE TYPE validator_status AS ENUM ('OK', 'WARNING', 'KO');
CREATE TYPE camera_status AS ENUM ('OK', 'KO');
CREATE TYPE connection_status AS ENUM ('CONNECTED', 'DISCONNECTED');
CREATE TYPE quality_status AS ENUM ('GOOD', 'MEDIUM', 'POOR');

-- Insertar datos de prueba para autobuses
INSERT INTO buses (id, status, "createdAt", "updatedAt") VALUES
('1234', 'OK', NOW(), NOW()),
('5678', 'WARNING', NOW(), NOW()),
('9012', 'OK', NOW(), NOW());

-- Insertar datos de prueba para pupitres
INSERT INTO pupitres (id, status, "busId", "createdAt", "updatedAt") VALUES
('PUP12345', 'OK', '1234', NOW(), NOW()),
('PUP67890', 'WARNING', '5678', NOW(), NOW()),
('PUP24680', 'OK', '9012', NOW(), NOW());

-- Insertar datos de prueba para validadoras
INSERT INTO validators (id, status, "busId", "createdAt", "updatedAt") VALUES
('VAL12345', 'OK', '1234', NOW(), NOW()),
('VAL67890', 'OK', '1234', NOW(), NOW()),
('VAL24680', 'WARNING', '5678', NOW(), NOW()),
('VAL13579', 'OK', '9012', NOW(), NOW());

-- Insertar datos de prueba para cámaras
INSERT INTO cameras (id, status, connection, quality, "busId", "createdAt", "updatedAt") VALUES
('CAM12345', 'OK', 'CONNECTED', 'GOOD', '1234', NOW(), NOW()),
('CAM67890', 'OK', 'CONNECTED', 'MEDIUM', '1234', NOW(), NOW()),
('CAM24680', 'KO', 'DISCONNECTED', 'POOR', '5678', NOW(), NOW()),
('CAM13579', 'OK', 'CONNECTED', 'GOOD', '9012', NOW(), NOW()); 