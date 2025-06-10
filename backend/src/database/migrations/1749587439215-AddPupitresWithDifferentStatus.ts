import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPupitresWithDifferentStatus1749587439215 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Pupitre con GPS en KO
    await queryRunner.query(`
      INSERT INTO pupitres (
        id, bus_id, qr_status, rfid_status, emv_status, printer_status, modem_status, gps_status, "createdAt", "updatedAt"
      ) VALUES (
        'PUPGPS', 'BUS1', 'OK', 'OK', 'OK', 'OK', 'OK', 'KO', NOW(), NOW()
      )
    `);

    // Pupitre con QR en KO
    await queryRunner.query(`
      INSERT INTO pupitres (
        id, bus_id, qr_status, rfid_status, emv_status, printer_status, modem_status, gps_status, "createdAt", "updatedAt"
      ) VALUES (
        'PUPQR', 'BUS1', 'KO', 'OK', 'OK', 'OK', 'OK', 'OK', NOW(), NOW()
      )
    `);

    // Pupitre con RFID en KO
    await queryRunner.query(`
      INSERT INTO pupitres (
        id, bus_id, qr_status, rfid_status, emv_status, printer_status, modem_status, gps_status, "createdAt", "updatedAt"
      ) VALUES (
        'PUPRFID', 'BUS1', 'OK', 'KO', 'OK', 'OK', 'OK', 'OK', NOW(), NOW()
      )
    `);

    // Pupitre con EMV en KO
    await queryRunner.query(`
      INSERT INTO pupitres (
        id, bus_id, qr_status, rfid_status, emv_status, printer_status, modem_status, gps_status, "createdAt", "updatedAt"
      ) VALUES (
        'PUPEMV', 'BUS1', 'OK', 'OK', 'KO', 'OK', 'OK', 'OK', NOW(), NOW()
      )
    `);

    // Pupitre con EMV y RFID en KO
    await queryRunner.query(`
      INSERT INTO pupitres (
        id, bus_id, qr_status, rfid_status, emv_status, printer_status, modem_status, gps_status, "createdAt", "updatedAt"
      ) VALUES (
        'PUPEMRF', 'BUS1', 'OK', 'KO', 'KO', 'OK', 'OK', 'OK', NOW(), NOW()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM pupitres 
      WHERE id IN ('PUPGPS', 'PUPQR', 'PUPRFID', 'PUPEMV', 'PUPEMRF')
    `);
  }
} 