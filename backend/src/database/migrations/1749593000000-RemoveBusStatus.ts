import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveBusStatus1749593000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Eliminar el campo status de la tabla buses
    await queryRunner.query(`
      ALTER TABLE buses DROP COLUMN IF EXISTS status;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Restaurar el campo status en la tabla buses
    await queryRunner.query(`
      ALTER TABLE buses ADD COLUMN IF NOT EXISTS status bus_status DEFAULT 'OK';
    `);
  }
} 