import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePupitreStatus1749587439212 implements MigrationInterface {
    name = 'UpdatePupitreStatus1749587439212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE pupitres 
            SET 
                qr_status = 'KO',
                rfid_status = 'KO',
                emv_status = 'KO',
                printer_status = 'KO',
                modem_status = 'KO',
                gps_status = 'KO'
            WHERE id = 'PUP67890'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE pupitres 
            SET 
                qr_status = 'OK',
                rfid_status = 'OK',
                emv_status = 'OK',
                printer_status = 'OK',
                modem_status = 'OK',
                gps_status = 'OK'
            WHERE id = 'PUP67890'
        `);
    }
} 