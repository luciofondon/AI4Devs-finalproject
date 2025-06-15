import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateBus1234Coordinates1700000000012 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Actualizar las coordenadas del bus 1234 a una ubicación en Palma de Mallorca
    // Coordenadas aproximadas del Puerto de Palma
    await queryRunner.query(`
      UPDATE buses 
      SET latitude = 39.5583, 
          longitude = 2.6222,
          "updatedAt" = NOW()
      WHERE id = '1234';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Restaurar las coordenadas originales (Madrid)
    await queryRunner.query(`
      UPDATE buses 
      SET latitude = 40.4168, 
          longitude = -3.7038,
          "updatedAt" = NOW()
      WHERE id = '1234';
    `);
  }
} 