import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateBus9012Coordinates1700000000009 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Actualizar las coordenadas del bus 9012 a una ubicación en Palma de Mallorca
    // Coordenadas aproximadas de la Plaza Mayor de Palma
    await queryRunner.query(`
      UPDATE buses 
      SET latitude = 39.5696, 
          longitude = 2.6502,
          "updatedAt" = NOW()
      WHERE id = '9012';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Restaurar las coordenadas originales (Madrid)
    await queryRunner.query(`
      UPDATE buses 
      SET latitude = 40.4168, 
          longitude = -3.7038,
          "updatedAt" = NOW()
      WHERE id = '9012';
    `);
  }
} 