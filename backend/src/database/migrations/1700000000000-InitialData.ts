import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialData1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Iniciar transacción
    await queryRunner.startTransaction();

    try {
      // Crear tipos enum si no existen
      await queryRunner.query(`
        DO $$ BEGIN
          CREATE TYPE bus_status AS ENUM ('OK', 'WARNING', 'KO');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `);

      await queryRunner.query(`
        DO $$ BEGIN
          CREATE TYPE pupitre_status AS ENUM ('OK', 'WARNING', 'KO');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `);

      await queryRunner.query(`
        DO $$ BEGIN
          CREATE TYPE validator_status AS ENUM ('OK', 'WARNING', 'KO');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `);

      await queryRunner.query(`
        DO $$ BEGIN
          CREATE TYPE camera_status AS ENUM ('OK', 'KO');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `);

      await queryRunner.query(`
        DO $$ BEGIN
          CREATE TYPE connection_status AS ENUM ('CONNECTED', 'DISCONNECTED');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `);

      await queryRunner.query(`
        DO $$ BEGIN
          CREATE TYPE quality_status AS ENUM ('GOOD', 'MEDIUM', 'POOR');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `);

      // Crear tabla de buses
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS buses (
          id VARCHAR(4) PRIMARY KEY,
          status bus_status NOT NULL DEFAULT 'OK',
          "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
        );
      `);

      // Crear tabla de pupitres
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS pupitres (
          id VARCHAR(8) PRIMARY KEY,
          status pupitre_status NOT NULL DEFAULT 'OK',
          bus_id VARCHAR(4) NOT NULL,
          "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
          FOREIGN KEY (bus_id) REFERENCES buses(id)
        );
      `);

      // Crear tabla de validadoras
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS validators (
          id VARCHAR(8) PRIMARY KEY,
          status validator_status NOT NULL DEFAULT 'OK',
          bus_id VARCHAR(4) NOT NULL,
          "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
          FOREIGN KEY (bus_id) REFERENCES buses(id)
        );
      `);

      // Crear tabla de cámaras
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS cameras (
          id VARCHAR(8) PRIMARY KEY,
          status camera_status NOT NULL DEFAULT 'OK',
          connection connection_status NOT NULL DEFAULT 'CONNECTED',
          quality quality_status NOT NULL DEFAULT 'GOOD',
          bus_id VARCHAR(4) NOT NULL,
          "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
          FOREIGN KEY (bus_id) REFERENCES buses(id)
        );
      `);

      // Primero, asegurarnos de que los buses existen
      await queryRunner.query(`
        INSERT INTO buses (id, status, "createdAt", "updatedAt") VALUES
        ('1234', 'OK', NOW(), NOW()),
        ('5678', 'WARNING', NOW(), NOW()),
        ('9012', 'OK', NOW(), NOW())
        ON CONFLICT (id) DO NOTHING;
      `);

      // Esperar un momento para asegurar que los buses se han creado
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Luego insertar los pupitres
      await queryRunner.query(`
        INSERT INTO pupitres (id, status, bus_id, "createdAt", "updatedAt") VALUES
        ('PUP12345', 'OK', '1234', NOW(), NOW()),
        ('PUP67890', 'WARNING', '5678', NOW(), NOW()),
        ('PUP24680', 'OK', '9012', NOW(), NOW())
        ON CONFLICT (id) DO NOTHING;
      `);

      // Insertar validadoras
      await queryRunner.query(`
        INSERT INTO validators (id, status, bus_id, "createdAt", "updatedAt") VALUES
        ('VAL12345', 'OK', '1234', NOW(), NOW()),
        ('VAL67890', 'OK', '1234', NOW(), NOW()),
        ('VAL24680', 'WARNING', '5678', NOW(), NOW()),
        ('VAL13579', 'OK', '9012', NOW(), NOW())
        ON CONFLICT (id) DO NOTHING;
      `);

      // Insertar cámaras
      await queryRunner.query(`
        INSERT INTO cameras (id, status, connection, quality, bus_id, "createdAt", "updatedAt") VALUES
        ('CAM12345', 'OK', 'CONNECTED', 'GOOD', '1234', NOW(), NOW()),
        ('CAM67890', 'OK', 'CONNECTED', 'MEDIUM', '1234', NOW(), NOW()),
        ('CAM24680', 'KO', 'DISCONNECTED', 'POOR', '5678', NOW(), NOW()),
        ('CAM13579', 'OK', 'CONNECTED', 'GOOD', '9012', NOW(), NOW())
        ON CONFLICT (id) DO NOTHING;
      `);

      // Confirmar transacción
      await queryRunner.commitTransaction();
    } catch (error) {
      // Si hay error, revertir transacción
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Iniciar transacción
    await queryRunner.startTransaction();

    try {
      // Eliminar datos en orden inverso
      await queryRunner.query(`DELETE FROM cameras WHERE id IN ('CAM12345', 'CAM67890', 'CAM24680', 'CAM13579');`);
      await queryRunner.query(`DELETE FROM validators WHERE id IN ('VAL12345', 'VAL67890', 'VAL24680', 'VAL13579');`);
      await queryRunner.query(`DELETE FROM pupitres WHERE id IN ('PUP12345', 'PUP67890', 'PUP24680');`);
      await queryRunner.query(`DELETE FROM buses WHERE id IN ('1234', '5678', '9012');`);

      // Eliminar tablas
      await queryRunner.query(`DROP TABLE IF EXISTS cameras;`);
      await queryRunner.query(`DROP TABLE IF EXISTS validators;`);
      await queryRunner.query(`DROP TABLE IF EXISTS pupitres;`);
      await queryRunner.query(`DROP TABLE IF EXISTS buses;`);

      // Confirmar transacción
      await queryRunner.commitTransaction();
    } catch (error) {
      // Si hay error, revertir transacción
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }
} 