import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePalmaCoordinates1700000000005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    try {
      // Actualizar coordenadas de los buses en Palma
      await queryRunner.query(`
        UPDATE buses 
        SET 
          latitude = 39.5696,
          longitude = 2.6502
        WHERE id = '2001';  -- Plaza España

        UPDATE buses 
        SET 
          latitude = 39.5679,
          longitude = 2.6483
        WHERE id = '2002';  -- Catedral

        UPDATE buses 
        SET 
          latitude = 39.5589,
          longitude = 2.6214
        WHERE id = '2003';  -- Puerto
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
      // Restaurar coordenadas originales
      await queryRunner.query(`
        UPDATE buses 
        SET 
          latitude = 39.5696,
          longitude = 2.6502
        WHERE id IN ('2001', '2002', '2003');
      `);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }
} 