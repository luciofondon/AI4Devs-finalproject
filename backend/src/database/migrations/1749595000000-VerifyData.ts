import { MigrationInterface, QueryRunner } from 'typeorm';

export class VerifyData1749595000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Verificar datos de pupitres
    const pupitres = await queryRunner.query(`
      SELECT p.id, p.bus_id, p.qr_status, p.rfid_status, p.emv_status, p.printer_status, p.modem_status, p.gps_status
      FROM pupitres p
      ORDER BY p.bus_id;
    `);
    console.log('Pupitres:', pupitres);

    // Verificar datos de validadores
    const validators = await queryRunner.query(`
      SELECT v.id, v.bus_id, v.rfid_status, v.emv_status
      FROM validators v
      ORDER BY v.bus_id;
    `);
    console.log('Validadores:', validators);

    // Verificar datos de cámaras
    const cameras = await queryRunner.query(`
      SELECT c.id, c.bus_id, c.status, c.connection, c.quality
      FROM cameras c
      ORDER BY c.bus_id;
    `);
    console.log('Cámaras:', cameras);

    // Verificar datos de buses
    const buses = await queryRunner.query(`
      SELECT b.id, b.latitude, b.longitude
      FROM buses b
      ORDER BY b.id;
    `);
    console.log('Buses:', buses);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // No es necesario revertir esta migración ya que solo verifica datos
  }
} 