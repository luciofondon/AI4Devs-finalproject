import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMoreBuses1700000000006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    try {
      // Insertar 20 autobuses más con coordenadas en Palma de Mallorca
      await queryRunner.query(`
        INSERT INTO buses (id, status, latitude, longitude, "createdAt", "updatedAt") VALUES
        ('2001', 'OK', 39.5789, 2.6445, NOW(), NOW()),    -- Son Espases
        ('2002', 'OK', 39.5772, 2.6412, NOW(), NOW()),    -- Son Espases Norte
        ('2003', 'WARNING', 39.5756, 2.6389, NOW(), NOW()), -- Son Espases Sur
        ('2004', 'OK', 39.5734, 2.6356, NOW(), NOW()),    -- Son Espases Este
        ('2005', 'OK', 39.5712, 2.6323, NOW(), NOW()),    -- Son Espases Oeste
        ('2006', 'WARNING', 39.5690, 2.6290, NOW(), NOW()), -- Son Espases Centro
        ('2007', 'OK', 39.5668, 2.6257, NOW(), NOW()),    -- Son Espases Sur
        ('2008', 'OK', 39.5646, 2.6224, NOW(), NOW()),    -- Son Espases Norte
        ('2009', 'WARNING', 39.5624, 2.6191, NOW(), NOW()), -- Son Espases Este
        ('2010', 'OK', 39.5602, 2.6158, NOW(), NOW()),    -- Son Espases Oeste
        ('2011', 'OK', 39.5580, 2.6125, NOW(), NOW()),    -- Son Espases Centro
        ('2012', 'WARNING', 39.5558, 2.6092, NOW(), NOW()), -- Son Espases Sur
        ('2013', 'OK', 39.5536, 2.6059, NOW(), NOW()),    -- Son Espases Norte
        ('2014', 'OK', 39.5514, 2.6026, NOW(), NOW()),    -- Son Espases Este
        ('2015', 'WARNING', 39.5492, 2.5993, NOW(), NOW()), -- Son Espases Oeste
        ('2016', 'OK', 39.5470, 2.5960, NOW(), NOW()),    -- Son Espases Centro
        ('2017', 'OK', 39.5448, 2.5927, NOW(), NOW()),    -- Son Espases Sur
        ('2018', 'WARNING', 39.5426, 2.5894, NOW(), NOW()), -- Son Espases Norte
        ('2019', 'OK', 39.5404, 2.5861, NOW(), NOW()),    -- Son Espases Este
        ('2020', 'OK', 39.5382, 2.5828, NOW(), NOW())     -- Son Espases Oeste
        ON CONFLICT (id) DO NOTHING;
      `);

      // Insertar pupitres para los nuevos autobuses
      await queryRunner.query(`
        INSERT INTO pupitres (id, status, bus_id, printer_status, modem_status, "createdAt", "updatedAt") VALUES
        ('PUP2001', 'OK', '2001', 'OK', 'OK', NOW(), NOW()),
        ('PUP2002', 'OK', '2002', 'OK', 'OK', NOW(), NOW()),
        ('PUP2003', 'WARNING', '2003', 'WARNING', 'OK', NOW(), NOW()),
        ('PUP2004', 'OK', '2004', 'OK', 'OK', NOW(), NOW()),
        ('PUP2005', 'OK', '2005', 'OK', 'OK', NOW(), NOW()),
        ('PUP2006', 'WARNING', '2006', 'WARNING', 'OK', NOW(), NOW()),
        ('PUP2007', 'OK', '2007', 'OK', 'OK', NOW(), NOW()),
        ('PUP2008', 'OK', '2008', 'OK', 'OK', NOW(), NOW()),
        ('PUP2009', 'WARNING', '2009', 'WARNING', 'OK', NOW(), NOW()),
        ('PUP2010', 'OK', '2010', 'OK', 'OK', NOW(), NOW()),
        ('PUP2011', 'OK', '2011', 'OK', 'OK', NOW(), NOW()),
        ('PUP2012', 'WARNING', '2012', 'WARNING', 'OK', NOW(), NOW()),
        ('PUP2013', 'OK', '2013', 'OK', 'OK', NOW(), NOW()),
        ('PUP2014', 'OK', '2014', 'OK', 'OK', NOW(), NOW()),
        ('PUP2015', 'WARNING', '2015', 'WARNING', 'OK', NOW(), NOW()),
        ('PUP2016', 'OK', '2016', 'OK', 'OK', NOW(), NOW()),
        ('PUP2017', 'OK', '2017', 'OK', 'OK', NOW(), NOW()),
        ('PUP2018', 'WARNING', '2018', 'WARNING', 'OK', NOW(), NOW()),
        ('PUP2019', 'OK', '2019', 'OK', 'OK', NOW(), NOW()),
        ('PUP2020', 'OK', '2020', 'OK', 'OK', NOW(), NOW())
        ON CONFLICT (id) DO NOTHING;
      `);

      // Insertar validadoras para los nuevos autobuses
      await queryRunner.query(`
        INSERT INTO validators (id, status, bus_id, rfid_status, emv_status, "createdAt", "updatedAt") VALUES
        ('VAL2001', 'OK', '2001', 'OK', 'OK', NOW(), NOW()),
        ('VAL2002', 'OK', '2002', 'OK', 'OK', NOW(), NOW()),
        ('VAL2003', 'WARNING', '2003', 'WARNING', 'OK', NOW(), NOW()),
        ('VAL2004', 'OK', '2004', 'OK', 'OK', NOW(), NOW()),
        ('VAL2005', 'OK', '2005', 'OK', 'OK', NOW(), NOW()),
        ('VAL2006', 'WARNING', '2006', 'WARNING', 'OK', NOW(), NOW()),
        ('VAL2007', 'OK', '2007', 'OK', 'OK', NOW(), NOW()),
        ('VAL2008', 'OK', '2008', 'OK', 'OK', NOW(), NOW()),
        ('VAL2009', 'WARNING', '2009', 'WARNING', 'OK', NOW(), NOW()),
        ('VAL2010', 'OK', '2010', 'OK', 'OK', NOW(), NOW()),
        ('VAL2011', 'OK', '2011', 'OK', 'OK', NOW(), NOW()),
        ('VAL2012', 'WARNING', '2012', 'WARNING', 'OK', NOW(), NOW()),
        ('VAL2013', 'OK', '2013', 'OK', 'OK', NOW(), NOW()),
        ('VAL2014', 'OK', '2014', 'OK', 'OK', NOW(), NOW()),
        ('VAL2015', 'WARNING', '2015', 'WARNING', 'OK', NOW(), NOW()),
        ('VAL2016', 'OK', '2016', 'OK', 'OK', NOW(), NOW()),
        ('VAL2017', 'OK', '2017', 'OK', 'OK', NOW(), NOW()),
        ('VAL2018', 'WARNING', '2018', 'WARNING', 'OK', NOW(), NOW()),
        ('VAL2019', 'OK', '2019', 'OK', 'OK', NOW(), NOW()),
        ('VAL2020', 'OK', '2020', 'OK', 'OK', NOW(), NOW())
        ON CONFLICT (id) DO NOTHING;
      `);

      // Insertar cámaras para los nuevos autobuses
      await queryRunner.query(`
        INSERT INTO cameras (id, status, connection, quality, bus_id, "createdAt", "updatedAt") VALUES
        ('CAM2001', 'OK', 'CONNECTED', 'GOOD', '2001', NOW(), NOW()),
        ('CAM2002', 'OK', 'CONNECTED', 'GOOD', '2002', NOW(), NOW()),
        ('CAM2003', 'KO', 'DISCONNECTED', 'POOR', '2003', NOW(), NOW()),
        ('CAM2004', 'OK', 'CONNECTED', 'GOOD', '2004', NOW(), NOW()),
        ('CAM2005', 'OK', 'CONNECTED', 'GOOD', '2005', NOW(), NOW()),
        ('CAM2006', 'KO', 'DISCONNECTED', 'POOR', '2006', NOW(), NOW()),
        ('CAM2007', 'OK', 'CONNECTED', 'GOOD', '2007', NOW(), NOW()),
        ('CAM2008', 'OK', 'CONNECTED', 'GOOD', '2008', NOW(), NOW()),
        ('CAM2009', 'KO', 'DISCONNECTED', 'POOR', '2009', NOW(), NOW()),
        ('CAM2010', 'OK', 'CONNECTED', 'GOOD', '2010', NOW(), NOW()),
        ('CAM2011', 'OK', 'CONNECTED', 'GOOD', '2011', NOW(), NOW()),
        ('CAM2012', 'KO', 'DISCONNECTED', 'POOR', '2012', NOW(), NOW()),
        ('CAM2013', 'OK', 'CONNECTED', 'GOOD', '2013', NOW(), NOW()),
        ('CAM2014', 'OK', 'CONNECTED', 'GOOD', '2014', NOW(), NOW()),
        ('CAM2015', 'KO', 'DISCONNECTED', 'POOR', '2015', NOW(), NOW()),
        ('CAM2016', 'OK', 'CONNECTED', 'GOOD', '2016', NOW(), NOW()),
        ('CAM2017', 'OK', 'CONNECTED', 'GOOD', '2017', NOW(), NOW()),
        ('CAM2018', 'KO', 'DISCONNECTED', 'POOR', '2018', NOW(), NOW()),
        ('CAM2019', 'OK', 'CONNECTED', 'GOOD', '2019', NOW(), NOW()),
        ('CAM2020', 'OK', 'CONNECTED', 'GOOD', '2020', NOW(), NOW())
        ON CONFLICT (id) DO NOTHING;
      `);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    try {
      // Eliminar los datos en orden inverso
      await queryRunner.query(`DELETE FROM cameras WHERE id LIKE 'CAM20%';`);
      await queryRunner.query(`DELETE FROM validators WHERE id LIKE 'VAL20%';`);
      await queryRunner.query(`DELETE FROM pupitres WHERE id LIKE 'PUP20%';`);
      await queryRunner.query(`DELETE FROM buses WHERE id LIKE '20%';`);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }
} 