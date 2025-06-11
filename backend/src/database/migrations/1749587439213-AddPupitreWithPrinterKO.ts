import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPupitreWithPrinterKO1749587439213 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO pupitres (
        id, bus_id, qr_status, rfid_status, emv_status, printer_status, modem_status, gps_status, "createdAt", "updatedAt"
      ) VALUES (
        'PUPPRNKO', 'BUS1', 'OK', 'OK', 'OK', 'KO', 'OK', 'OK', NOW(), NOW()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM pupitres WHERE id = 'PUPPRNKO'`);
  }
} 