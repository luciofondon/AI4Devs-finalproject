import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePupitreColumns1700000000005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    try {
      // Agregar las columnas faltantes
      await queryRunner.query(`
        ALTER TABLE pupitres 
        ADD COLUMN IF NOT EXISTS qr_status validator_status DEFAULT 'OK',
        ADD COLUMN IF NOT EXISTS rfid_status validator_status DEFAULT 'OK',
        ADD COLUMN IF NOT EXISTS emv_status validator_status DEFAULT 'OK',
        ADD COLUMN IF NOT EXISTS gps_status validator_status DEFAULT 'OK';
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
      // Eliminar las columnas agregadas
      await queryRunner.query(`
        ALTER TABLE pupitres 
        DROP COLUMN IF EXISTS qr_status,
        DROP COLUMN IF EXISTS rfid_status,
        DROP COLUMN IF EXISTS emv_status,
        DROP COLUMN IF EXISTS gps_status;
      `);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }
} 