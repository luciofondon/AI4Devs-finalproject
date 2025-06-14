import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateValidatorStatus1700000000007 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    try {
      // Actualizar algunas validadoras a estado KO
      await queryRunner.query(`
        UPDATE validators 
        SET 
          status = 'KO',
          rfid_status = 'KO',
          emv_status = 'KO'
        WHERE id IN (
          'VAL2003',  -- Validadora del bus 2003
          'VAL2006',  -- Validadora del bus 2006
          'VAL2009',  -- Validadora del bus 2009
          'VAL2012',  -- Validadora del bus 2012
          'VAL2015',  -- Validadora del bus 2015
          'VAL2018'   -- Validadora del bus 2018
        );
      `);

      // Actualizar el estado de los buses correspondientes a WARNING
      await queryRunner.query(`
        UPDATE buses 
        SET status = 'WARNING'
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
          status = 'WARNING',
          rfid_status = 'WARNING',
          emv_status = 'OK'
        WHERE id IN (
          'VAL2003',
          'VAL2006',
          'VAL2009',
          'VAL2012',
          'VAL2015',
          'VAL2018'
        );
      `);

      // Restaurar el estado original de los buses
      await queryRunner.query(`
        UPDATE buses 
        SET status = 'WARNING'
        WHERE id IN ('2003', '2006', '2009', '2012', '2015', '2018');
      `);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }
} 