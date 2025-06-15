import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePupitreColumns1700000000005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    try {
      // Verificar si las columnas existen antes de crearlas
      const table = await queryRunner.getTable('pupitres');
      const columns = table?.columns.map(col => col.name) || [];

      const columnsToAdd: string[] = [];
      if (!columns.includes('qr_status')) {
        columnsToAdd.push('ADD COLUMN qr_status validator_status DEFAULT \'OK\'');
      }
      if (!columns.includes('rfid_status')) {
        columnsToAdd.push('ADD COLUMN rfid_status validator_status DEFAULT \'OK\'');
      }
      if (!columns.includes('emv_status')) {
        columnsToAdd.push('ADD COLUMN emv_status validator_status DEFAULT \'OK\'');
      }
      if (!columns.includes('gps_status')) {
        columnsToAdd.push('ADD COLUMN gps_status validator_status DEFAULT \'OK\'');
      }

      if (columnsToAdd.length > 0) {
        await queryRunner.query(`
          ALTER TABLE pupitres 
          ${columnsToAdd.join(',\n')};
        `);
      }

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