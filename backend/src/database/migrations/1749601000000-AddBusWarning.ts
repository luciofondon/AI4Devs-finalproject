import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBusWarning1749601000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Insertar un bus en estado 'WARNING'
    await queryRunner.query(`
      INSERT INTO buses (id, latitude, longitude, status, "createdAt", "updatedAt")
      VALUES ('WARNING01', 39.5696, 2.6502, 'WARNING', NOW(), NOW())
      ON CONFLICT (id) DO UPDATE SET status = 'WARNING';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Eliminar el bus en estado 'WARNING'
    await queryRunner.query(`
      DELETE FROM buses WHERE id = 'WARNING01';
    `);
  }
} 