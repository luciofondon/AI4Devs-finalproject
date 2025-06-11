import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPupitreReaders1749587439210 implements MigrationInterface {
    name = 'AddPupitreReaders1749587439210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."pupitres_qr_status_enum" AS ENUM('OK', 'KO')`);
        await queryRunner.query(`ALTER TABLE "pupitres" ADD "qr_status" "public"."pupitres_qr_status_enum" NOT NULL DEFAULT 'OK'`);
        await queryRunner.query(`CREATE TYPE "public"."pupitres_rfid_status_enum" AS ENUM('OK', 'KO')`);
        await queryRunner.query(`ALTER TABLE "pupitres" ADD "rfid_status" "public"."pupitres_rfid_status_enum" NOT NULL DEFAULT 'OK'`);
        await queryRunner.query(`CREATE TYPE "public"."pupitres_emv_status_enum" AS ENUM('OK', 'KO')`);
        await queryRunner.query(`ALTER TABLE "pupitres" ADD "emv_status" "public"."pupitres_emv_status_enum" NOT NULL DEFAULT 'OK'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pupitres" DROP COLUMN "emv_status"`);
        await queryRunner.query(`DROP TYPE "public"."pupitres_emv_status_enum"`);
        await queryRunner.query(`ALTER TABLE "pupitres" DROP COLUMN "rfid_status"`);
        await queryRunner.query(`DROP TYPE "public"."pupitres_rfid_status_enum"`);
        await queryRunner.query(`ALTER TABLE "pupitres" DROP COLUMN "qr_status"`);
        await queryRunner.query(`DROP TYPE "public"."pupitres_qr_status_enum"`);
    }

}
