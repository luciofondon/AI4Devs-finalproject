import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBusCoordinates1749589000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Añadir columnas de latitud y longitud
        await queryRunner.query(`
            ALTER TABLE buses 
            ADD COLUMN latitude DECIMAL(10,8),
            ADD COLUMN longitude DECIMAL(11,8)
        `);

        // Actualizar algunos buses con coordenadas de ejemplo (Palma de Mallorca)
        await queryRunner.query(`
            UPDATE buses 
            SET 
                latitude = 39.569600,
                longitude = 2.650160
            WHERE id = '1234'
        `);

        await queryRunner.query(`
            UPDATE buses 
            SET 
                latitude = 39.571000,
                longitude = 2.652000
            WHERE id = '5678'
        `);

        await queryRunner.query(`
            UPDATE buses 
            SET 
                latitude = 39.573000,
                longitude = 2.654000
            WHERE id = '9012'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Eliminar las columnas de latitud y longitud
        await queryRunner.query(`
            ALTER TABLE buses 
            DROP COLUMN latitude,
            DROP COLUMN longitude
        `);
    }
} 