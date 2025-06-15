import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateBusCoordinates1700000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    try {
      // Agregar las columnas latitude y longitude
      await queryRunner.query(`
        ALTER TABLE buses 
        ADD COLUMN IF NOT EXISTS latitude DECIMAL(10,8),
        ADD COLUMN IF NOT EXISTS longitude DECIMAL(11,8);
      `);

      // Convertir las coordenadas del tipo POINT a las columnas latitude y longitude
      await queryRunner.query(`
        UPDATE buses 
        SET 
          latitude = (coordinates[0])::decimal,
          longitude = (coordinates[1])::decimal
        WHERE coordinates IS NOT NULL;
      `);

      // Eliminar la columna coordinates después de la conversión
      await queryRunner.query(`
        ALTER TABLE buses DROP COLUMN IF EXISTS coordinates;
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
      // Restaurar la columna coordinates
      await queryRunner.query(`
        ALTER TABLE buses 
        ADD COLUMN IF NOT EXISTS coordinates POINT;
      `);

      // Convertir las columnas latitude y longitude de vuelta al tipo POINT
      await queryRunner.query(`
        UPDATE buses 
        SET coordinates = POINT(latitude, longitude)
        WHERE latitude IS NOT NULL AND longitude IS NOT NULL;
      `);

      // Eliminar las columnas latitude y longitude
      await queryRunner.query(`
        ALTER TABLE buses 
        DROP COLUMN IF EXISTS latitude,
        DROP COLUMN IF EXISTS longitude;
      `);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }
} 