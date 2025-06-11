import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReassignOrphanDevices1749598000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Reasignar pupitres huérfanos al bus OK01
    await queryRunner.query(`
      UPDATE pupitres SET bus_id = 'OK01' WHERE bus_id = 'BUS1';
    `);

    // Reasignar validadores huérfanos al bus OK01
    await queryRunner.query(`
      UPDATE validators SET bus_id = 'OK01' WHERE bus_id = 'BUS1';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revertir pupitres a bus_id = 'BUS1'
    await queryRunner.query(`
      UPDATE pupitres SET bus_id = 'BUS1' WHERE bus_id = 'OK01';
    `);

    // Revertir validadores a bus_id = 'BUS1'
    await queryRunner.query(`
      UPDATE validators SET bus_id = 'BUS1' WHERE bus_id = 'OK01';
    `);
  }
} 