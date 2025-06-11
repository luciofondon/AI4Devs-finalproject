import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPupitreWithQRKO1749603000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Insertar un pupitre con el lector QR en estado 'KO' y asignarlo al bus 6789
    await queryRunner.query(`
      INSERT INTO pupitres (id, bus_id, qr_status, "createdAt", "updatedAt")
      VALUES ('PUPQRKO01', '6789', 'KO', NOW(), NOW())
      ON CONFLICT (id) DO UPDATE SET qr_status = 'KO';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Eliminar el pupitre con el lector QR en estado 'KO'
    await queryRunner.query(`
      DELETE FROM pupitres WHERE id = 'PUPQRKO01';
    `);
  }
} 