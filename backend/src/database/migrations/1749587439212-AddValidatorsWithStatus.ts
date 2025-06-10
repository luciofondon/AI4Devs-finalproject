import { MigrationInterface, QueryRunner } from 'typeorm';
import { ReaderStatus } from '../../entities/validator.entity';

export class AddValidatorsWithStatus1749587439212 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Validadora con RFID en KO
    await queryRunner.query(`
      INSERT INTO validators (id, bus_id, rfid_status, emv_status, "createdAt", "updatedAt")
      VALUES ('VAL00001', 'BUS1', '${ReaderStatus.KO}', '${ReaderStatus.OK}', NOW(), NOW())
    `);

    // Validadora con EMV en KO
    await queryRunner.query(`
      INSERT INTO validators (id, bus_id, rfid_status, emv_status, "createdAt", "updatedAt")
      VALUES ('VAL00002', 'BUS1', '${ReaderStatus.OK}', '${ReaderStatus.KO}', NOW(), NOW())
    `);

    // Validadora con ambos componentes en KO
    await queryRunner.query(`
      INSERT INTO validators (id, bus_id, rfid_status, emv_status, "createdAt", "updatedAt")
      VALUES ('VAL00003', 'BUS1', '${ReaderStatus.KO}', '${ReaderStatus.KO}', NOW(), NOW())
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM validators WHERE id IN ('VAL00001', 'VAL00002', 'VAL00003')`);
  }
} 