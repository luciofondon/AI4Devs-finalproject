import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateBus5678Coordinates1700000000011 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Actualizar las coordenadas del bus 5678 a una ubicación en Palma de Mallorca
    // Coordenadas aproximadas de la Catedral de Palma
    await queryRunner.query(`
      UPDATE buses 
      SET latitude = 39.5673, 
          longitude = 2.6482,
          "updatedAt" = NOW()
      WHERE id = '5678';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Restaurar las coordenadas originales (Madrid)
    await queryRunner.query(`
      UPDATE buses 
      SET latitude = 40.4168, 
          longitude = -3.7038,
          "updatedAt" = NOW()
      WHERE id = '5678';
    `);
  }
} 