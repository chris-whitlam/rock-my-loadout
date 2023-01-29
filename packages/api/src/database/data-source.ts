import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'test',
  password: process.env.DB_PASSWORD || 'test',
  database: process.env.DB_NAME || 'equipment_service',
  logging: false,
  synchronize: false,
  entities: ['src/**/**.entity.ts'],
  migrations: ['src/database/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts']
});

dataSource.initialize();

export default dataSource;
