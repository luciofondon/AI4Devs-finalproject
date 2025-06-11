import { MigrationInterface, QueryRunner } from 'typeorm';

export class CheckOrphanDevices1749597000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Pupitres huérfanos
    const orphanPupitres = await queryRunner.query(`
      SELECT id, bus_id FROM pupitres WHERE bus_id NOT IN (SELECT id FROM buses);
    `);
    if (orphanPupitres.length > 0) {
      console.log('Pupitres huérfanos (sin bus válido):', orphanPupitres);
    } else {
      console.log('Todos los pupitres están asignados a un bus existente.');
    }

    // Validadores huérfanos
    const orphanValidators = await queryRunner.query(`
      SELECT id, bus_id FROM validators WHERE bus_id NOT IN (SELECT id FROM buses);
    `);
    if (orphanValidators.length > 0) {
      console.log('Validadores huérfanos (sin bus válido):', orphanValidators);
    } else {
      console.log('Todos los validadores están asignados a un bus existente.');
    }

    // Cámaras huérfanas
    const orphanCameras = await queryRunner.query(`
      SELECT id, bus_id FROM cameras WHERE bus_id NOT IN (SELECT id FROM buses);
    `);
    if (orphanCameras.length > 0) {
      console.log('Cámaras huérfanas (sin bus válido):', orphanCameras);
    } else {
      console.log('Todas las cámaras están asignadas a un bus existente.');
    }
  }

  public async down(): Promise<void> {
    // No es necesario revertir esta migración
  }
} 