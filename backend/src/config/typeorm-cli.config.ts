import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Bus } from '../entities/bus.entity';
import { Pupitre } from '../entities/pupitre.entity';
import { Validator } from '../entities/validator.entity';
import { Camera } from '../entities/camera.entity';

config();

const isProduction = process.env.NODE_ENV === 'production';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'devices_monitoring',
  entities: isProduction 
    ? ['dist/entities/*.entity.js']
    : ['src/entities/*.entity.ts'],
  migrations: isProduction 
    ? ['dist/database/migrations/*.js']
    : ['src/database/migrations/*.ts'],
  synchronize: false,
}); 