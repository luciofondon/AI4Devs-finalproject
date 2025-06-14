import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialData1700000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    try {
      // Insertar buses
      await queryRunner.query(`
        INSERT INTO buses (id, status, coordinates, "createdAt", "updatedAt") VALUES
        ('1234', 'OK', POINT(40.4168, -3.7038), NOW(), NOW()),
        ('5678', 'WARNING', POINT(40.4168, -3.7038), NOW(), NOW()),
        ('9012', 'OK', POINT(40.4168, -3.7038), NOW(), NOW())
        ON CONFLICT (id) DO NOTHING;
      `);

      // Insertar pupitres
      await queryRunner.query(`
        INSERT INTO pupitres (id, status, bus_id, printer_status, modem_status, "createdAt", "updatedAt") VALUES
        ('PUP12345', 'OK', '1234', 'OK', 'OK', NOW(), NOW()),
        ('PUP67890', 'WARNING', '5678', 'WARNING', 'OK', NOW(), NOW()),
        ('PUP24680', 'OK', '9012', 'OK', 'OK', NOW(), NOW())
        ON CONFLICT (id) DO NOTHING;
      `);

      // Insertar validadoras
      await queryRunner.query(`
        INSERT INTO validators (id, status, bus_id, reader_status, "createdAt", "updatedAt") VALUES
        ('VAL12345', 'OK', '1234', 'OK', NOW(), NOW()),
        ('VAL67890', 'OK', '1234', 'OK', NOW(), NOW()),
        ('VAL24680', 'WARNING', '5678', 'WARNING', NOW(), NOW()),
        ('VAL13579', 'OK', '9012', 'OK', NOW(), NOW())
        ON CONFLICT (id) DO NOTHING;
      `);

      // Insertar cámaras
      await queryRunner.query(`
        INSERT INTO cameras (id, status, connection, quality, bus_id, "createdAt", "updatedAt") VALUES
        ('CAM12345', 'OK', 'CONNECTED', 'GOOD', '1234', NOW(), NOW()),
        ('CAM67890', 'OK', 'CONNECTED', 'MEDIUM', '1234', NOW(), NOW()),
        ('CAM24680', 'KO', 'DISCONNECTED', 'POOR', '5678', NOW(), NOW()),
        ('CAM13579', 'OK', 'CONNECTED', 'GOOD', '9012', NOW(), NOW())
        ON CONFLICT (id) DO NOTHING;
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
      // Eliminar datos en orden inverso
      await queryRunner.query(`DELETE FROM cameras;`);
      await queryRunner.query(`DELETE FROM validators;`);
      await queryRunner.query(`DELETE FROM pupitres;`);
      await queryRunner.query(`DELETE FROM buses;`);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }
} 