import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateBusOK01Coordinates1749600000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Actualizar las coordenadas del bus OK01 a la Isla de Mallorca
    await queryRunner.query(`
      UPDATE buses SET latitude = 39.5696, longitude = 2.6502 WHERE id = 'OK01';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revertir las coordenadas del bus OK01 a Madrid
    await queryRunner.query(`
      UPDATE buses SET latitude = 40.4168, longitude = -3.7038 WHERE id = 'OK01';
    `);
  }
} 