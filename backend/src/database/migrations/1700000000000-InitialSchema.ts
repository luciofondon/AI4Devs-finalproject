import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    try {
      // Crear todos los tipos enum en una sola transacción
      await queryRunner.query(`
        DO $$ BEGIN
          CREATE TYPE bus_status AS ENUM ('OK', 'WARNING', 'KO');
          CREATE TYPE pupitre_status AS ENUM ('OK', 'WARNING', 'KO');
          CREATE TYPE validator_status AS ENUM ('OK', 'WARNING', 'KO');
          CREATE TYPE camera_status AS ENUM ('OK', 'KO');
          CREATE TYPE connection_status AS ENUM ('CONNECTED', 'DISCONNECTED');
          CREATE TYPE quality_status AS ENUM ('GOOD', 'MEDIUM', 'POOR');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `);

      // Crear todas las tablas con sus índices y restricciones
      await queryRunner.query(`
        -- Tabla de buses
        CREATE TABLE IF NOT EXISTS buses (
          id VARCHAR(4) PRIMARY KEY,
          status bus_status NOT NULL DEFAULT 'OK',
          coordinates POINT,
          "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
        );

        -- Tabla de pupitres
        CREATE TABLE IF NOT EXISTS pupitres (
          id VARCHAR(8) PRIMARY KEY,
          status pupitre_status NOT NULL DEFAULT 'OK',
          bus_id VARCHAR(4) NOT NULL,
          printer_status pupitre_status,
          modem_status pupitre_status,
          "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
          FOREIGN KEY (bus_id) REFERENCES buses(id) ON DELETE CASCADE,
          CONSTRAINT fk_pupitre_bus FOREIGN KEY (bus_id) REFERENCES buses(id)
        );

        -- Tabla de validadoras
        CREATE TABLE IF NOT EXISTS validators (
          id VARCHAR(8) PRIMARY KEY,
          status validator_status NOT NULL DEFAULT 'OK',
          bus_id VARCHAR(4) NOT NULL,
          reader_status validator_status,
          "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
          CONSTRAINT fk_validator_bus FOREIGN KEY (bus_id) REFERENCES buses(id) ON DELETE CASCADE
        );

        -- Tabla de cámaras
        CREATE TABLE IF NOT EXISTS cameras (
          id VARCHAR(8) PRIMARY KEY,
          status camera_status NOT NULL DEFAULT 'OK',
          connection connection_status NOT NULL DEFAULT 'CONNECTED',
          quality quality_status NOT NULL DEFAULT 'GOOD',
          bus_id VARCHAR(4) NOT NULL,
          "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
          CONSTRAINT fk_camera_bus FOREIGN KEY (bus_id) REFERENCES buses(id) ON DELETE CASCADE
        );

        -- Crear índices para mejorar el rendimiento
        CREATE INDEX IF NOT EXISTS idx_buses_status ON buses(status);
        CREATE INDEX IF NOT EXISTS idx_pupitres_bus_id ON pupitres(bus_id);
        CREATE INDEX IF NOT EXISTS idx_validators_bus_id ON validators(bus_id);
        CREATE INDEX IF NOT EXISTS idx_cameras_bus_id ON cameras(bus_id);
      `);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    try {
      // Eliminar índices
      await queryRunner.query(`
        DROP INDEX IF EXISTS idx_cameras_bus_id;
        DROP INDEX IF EXISTS idx_validators_bus_id;
        DROP INDEX IF EXISTS idx_pupitres_bus_id;
        DROP INDEX IF EXISTS idx_buses_status;
      `);

      // Eliminar tablas
      await queryRunner.query(`
        DROP TABLE IF EXISTS cameras;
        DROP TABLE IF EXISTS validators;
        DROP TABLE IF EXISTS pupitres;
        DROP TABLE IF EXISTS buses;
      `);

      // Eliminar tipos enum
      await queryRunner.query(`
        DROP TYPE IF EXISTS quality_status;
        DROP TYPE IF EXISTS connection_status;
        DROP TYPE IF EXISTS camera_status;
        DROP TYPE IF EXISTS validator_status;
        DROP TYPE IF EXISTS pupitre_status;
        DROP TYPE IF EXISTS bus_status;
      `);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }
} 