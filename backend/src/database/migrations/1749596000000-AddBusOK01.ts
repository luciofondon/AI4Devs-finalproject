import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBusOK011749596000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Insertar el bus
    await queryRunner.query(`
      INSERT INTO buses (id, latitude, longitude, "createdAt", "updatedAt")
      VALUES ('OK01', 40.4168, -3.7038, NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;
    `);

    // Insertar pupitre
    await queryRunner.query(`
      INSERT INTO pupitres (id, bus_id, qr_status, rfid_status, emv_status, printer_status, modem_status, gps_status, "createdAt", "updatedAt")
      VALUES ('PUPOK01', 'OK01', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;
    `);

    // Insertar validador
    await queryRunner.query(`
      INSERT INTO validators (id, bus_id, rfid_status, emv_status, "createdAt", "updatedAt")
      VALUES ('VALOK01', 'OK01', 'OK', 'OK', NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;
    `);

    // Insertar cámara
    await queryRunner.query(`
      INSERT INTO cameras (id, bus_id, status, connection, quality, "createdAt", "updatedAt")
      VALUES ('CAMOK01', 'OK01', 'OK', 'CONNECTED', 'GOOD', NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM cameras WHERE id = 'CAMOK01';`);
    await queryRunner.query(`DELETE FROM validators WHERE id = 'VALOK01';`);
    await queryRunner.query(`DELETE FROM pupitres WHERE id = 'PUPOK01';`);
    await queryRunner.query(`DELETE FROM buses WHERE id = 'OK01';`);
  }
} 