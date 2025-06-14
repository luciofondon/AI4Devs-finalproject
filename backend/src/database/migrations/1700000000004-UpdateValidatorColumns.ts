import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateValidatorColumns1700000000004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    try {
      // Eliminar la columna reader_status
      await queryRunner.query(`
        ALTER TABLE validators DROP COLUMN IF EXISTS reader_status;
      `);

      // Agregar las columnas rfid_status y emv_status
      await queryRunner.query(`
        ALTER TABLE validators 
        ADD COLUMN IF NOT EXISTS rfid_status validator_status DEFAULT 'OK',
        ADD COLUMN IF NOT EXISTS emv_status validator_status DEFAULT 'OK';
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
      // Eliminar las columnas rfid_status y emv_status
      await queryRunner.query(`
        ALTER TABLE validators 
        DROP COLUMN IF EXISTS rfid_status,
        DROP COLUMN IF EXISTS emv_status;
      `);

      // Restaurar la columna reader_status
      await queryRunner.query(`
        ALTER TABLE validators 
        ADD COLUMN IF NOT EXISTS reader_status validator_status DEFAULT 'OK';
      `);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }
} 