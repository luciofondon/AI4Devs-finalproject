import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBusWithWarningPupitre1749602000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Insertar un bus sin dispositivos
    await queryRunner.query(`
      INSERT INTO buses (id, latitude, longitude, "createdAt", "updatedAt")
      VALUES ('WARNING02', 39.5696, 2.6502, NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;
    `);

    // Insertar un pupitre en estado 'WARNING' y asignarlo al bus
    await queryRunner.query(`
      INSERT INTO pupitres (id, bus_id, status, "createdAt", "updatedAt")
      VALUES ('PUPWARNING01', 'WARNING02', 'WARNING', NOW(), NOW())
      ON CONFLICT (id) DO UPDATE SET status = 'WARNING';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Eliminar el pupitre en estado 'WARNING'
    await queryRunner.query(`
      DELETE FROM pupitres WHERE id = 'PUPWARNING01';
    `);

    // Eliminar el bus
    await queryRunner.query(`
      DELETE FROM buses WHERE id = 'WARNING02';
    `);
  }
} 