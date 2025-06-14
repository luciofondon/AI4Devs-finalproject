import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePalmaCoordinates1700000000005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    try {
      // Actualizar coordenadas de los autobuses con ubicaciones de Palma de Mallorca
      await queryRunner.query(`
        UPDATE buses 
        SET 
          latitude = CASE id
            WHEN '1234' THEN 39.5696  -- Plaza España
            WHEN '5678' THEN 39.5712  -- Catedral
            WHEN '9012' THEN 39.5743  -- Puerto
          END,
          longitude = CASE id
            WHEN '1234' THEN 2.6502   -- Plaza España
            WHEN '5678' THEN 2.6484   -- Catedral
            WHEN '9012' THEN 2.6392   -- Puerto
          END
        WHERE id IN ('1234', '5678', '9012');
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
      // Restaurar las coordenadas originales
      await queryRunner.query(`
        UPDATE buses 
        SET 
          latitude = 40.4168,
          longitude = -3.7038
        WHERE id IN ('1234', '5678', '9012');
      `);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }
} 