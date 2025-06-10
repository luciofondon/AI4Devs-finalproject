import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddValidatorReaders1710000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Crear el tipo enum si no existe
    await queryRunner.query(`
      DO $$ BEGIN
        CREATE TYPE reader_status AS ENUM ('OK', 'KO');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // Añadir las columnas a la tabla validators
    await queryRunner.query(`
      ALTER TABLE validators
      ADD COLUMN IF NOT EXISTS rfid_status reader_status NOT NULL DEFAULT 'OK',
      ADD COLUMN IF NOT EXISTS emv_status reader_status NOT NULL DEFAULT 'OK';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Eliminar las columnas
    await queryRunner.query(`
      ALTER TABLE validators
      DROP COLUMN IF EXISTS rfid_status,
      DROP COLUMN IF EXISTS emv_status;
    `);

    // Eliminar el tipo enum
    await queryRunner.query(`
      DROP TYPE IF EXISTS reader_status;
    `);
  }
} 