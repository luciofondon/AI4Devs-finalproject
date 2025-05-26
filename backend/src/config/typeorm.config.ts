import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Bus } from '../entities/bus.entity';
import { Pupitre } from '../entities/pupitre.entity';
import { Validator } from '../entities/validator.entity';
import { Camera } from '../entities/camera.entity';

export default registerAs('typeorm', (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Bus, Pupitre, Validator, Camera],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV !== 'production',
})); 