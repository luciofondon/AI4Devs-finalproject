import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPupitreWithModemKO1749587439214 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO pupitres (
        id, bus_id, qr_status, rfid_status, emv_status, printer_status, modem_status, gps_status, "createdAt", "updatedAt"
      ) VALUES (
        'PUPMDMKO', 'BUS1', 'OK', 'OK', 'OK', 'OK', 'KO', 'OK', NOW(), NOW()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM pupitres WHERE id = 'PUPMDMKO'`);
  }
} 