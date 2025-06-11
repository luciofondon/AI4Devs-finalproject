import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateValidatorReaders1710000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Crear los nuevos tipos enum
    await queryRunner.query(`
      DO $$ BEGIN
        CREATE TYPE validators_rfid_status_enum AS ENUM ('OK', 'KO');
        CREATE TYPE validators_emv_status_enum AS ENUM ('OK', 'KO');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // Eliminar los valores por defecto de las columnas
    await queryRunner.query(`ALTER TABLE validators ALTER COLUMN rfid_status DROP DEFAULT;`);
    await queryRunner.query(`ALTER TABLE validators ALTER COLUMN emv_status DROP DEFAULT;`);

    // Cambiar el tipo de las columnas
    await queryRunner.query(`ALTER TABLE validators ALTER COLUMN rfid_status TYPE validators_rfid_status_enum USING rfid_status::text::validators_rfid_status_enum;`);
    await queryRunner.query(`ALTER TABLE validators ALTER COLUMN emv_status TYPE validators_emv_status_enum USING emv_status::text::validators_emv_status_enum;`);

    // Restaurar los valores por defecto
    await queryRunner.query(`ALTER TABLE validators ALTER COLUMN rfid_status SET DEFAULT 'OK';`);
    await queryRunner.query(`ALTER TABLE validators ALTER COLUMN emv_status SET DEFAULT 'OK';`);

    // Eliminar el tipo enum antiguo si existe
    await queryRunner.query(`DROP TYPE IF EXISTS reader_status;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Crear el tipo enum antiguo
    await queryRunner.query(`
      DO $$ BEGIN
        CREATE TYPE reader_status AS ENUM ('OK', 'KO');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // Eliminar los valores por defecto de las columnas
    await queryRunner.query(`ALTER TABLE validators ALTER COLUMN rfid_status DROP DEFAULT;`);
    await queryRunner.query(`ALTER TABLE validators ALTER COLUMN emv_status DROP DEFAULT;`);

    // Revertir las columnas al tipo antiguo
    await queryRunner.query(`ALTER TABLE validators ALTER COLUMN rfid_status TYPE reader_status USING rfid_status::text::reader_status;`);
    await queryRunner.query(`ALTER TABLE validators ALTER COLUMN emv_status TYPE reader_status USING emv_status::text::reader_status;`);

    // Restaurar los valores por defecto
    await queryRunner.query(`ALTER TABLE validators ALTER COLUMN rfid_status SET DEFAULT 'OK';`);
    await queryRunner.query(`ALTER TABLE validators ALTER COLUMN emv_status SET DEFAULT 'OK';`);

    // Eliminar los tipos enum nuevos
    await queryRunner.query(`DROP TYPE IF EXISTS validators_rfid_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS validators_emv_status_enum;`);
  }
} 