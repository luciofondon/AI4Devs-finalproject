import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateValidatorReaders1700000000008 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    try {
      // Validadoras con ambos lectores OK
      await queryRunner.query(`
        UPDATE validators 
        SET 
          status = 'OK',
          rfid_status = 'OK',
          emv_status = 'OK'
        WHERE id IN (
          'VAL2001',  -- Bus 2001
          'VAL2002',  -- Bus 2002
          'VAL2004',  -- Bus 2004
          'VAL2005',  -- Bus 2005
          'VAL2007',  -- Bus 2007
          'VAL2008'   -- Bus 2008
        );
      `);

      // Validadoras con RFID KO y EMV OK
      await queryRunner.query(`
        UPDATE validators 
        SET 
          status = 'WARNING',
          rfid_status = 'KO',
          emv_status = 'OK'
        WHERE id IN (
          'VAL2010',  -- Bus 2010
          'VAL2011',  -- Bus 2011
          'VAL2013',  -- Bus 2013
          'VAL2014'   -- Bus 2014
        );
      `);

      // Validadoras con RFID OK y EMV KO
      await queryRunner.query(`
        UPDATE validators 
        SET 
          status = 'WARNING',
          rfid_status = 'OK',
          emv_status = 'KO'
        WHERE id IN (
          'VAL2016',  -- Bus 2016
          'VAL2017',  -- Bus 2017
          'VAL2019',  -- Bus 2019
          'VAL2020'   -- Bus 2020
        );
      `);

      // Validadoras con ambos lectores KO
      await queryRunner.query(`
        UPDATE validators 
        SET 
          status = 'KO',
          rfid_status = 'KO',
          emv_status = 'KO'
        WHERE id IN (
          'VAL2003',  -- Bus 2003
          'VAL2006',  -- Bus 2006
          'VAL2009',  -- Bus 2009
          'VAL2012',  -- Bus 2012
          'VAL2015',  -- Bus 2015
          'VAL2018'   -- Bus 2018
        );
      `);

      // Actualizar el estado de los buses según el estado de sus validadoras
      await queryRunner.query(`
        UPDATE buses 
        SET status = 'OK'
        WHERE id IN ('2001', '2002', '2004', '2005', '2007', '2008');

        UPDATE buses 
        SET status = 'WARNING'
        WHERE id IN ('2010', '2011', '2013', '2014', '2016', '2017', '2019', '2020');

        UPDATE buses 
        SET status = 'KO'
        WHERE id IN ('2003', '2006', '2009', '2012', '2015', '2018');
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
      // Restaurar el estado original de las validadoras
      await queryRunner.query(`
        UPDATE validators 
        SET 
          status = 'OK',
          rfid_status = 'OK',
          emv_status = 'OK'
        WHERE id LIKE 'VAL20%';
      `);

      // Restaurar el estado original de los buses
      await queryRunner.query(`
        UPDATE buses 
        SET status = 'OK'
        WHERE id LIKE '20%';
      `);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }
} 