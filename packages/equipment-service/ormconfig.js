module.exports = {
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'test',
  password: process.env.DB_PASSWORD || 'test',
  database: process.env.DB_NAME || 'equipment_service',
  logging: true,
  synchronize: false,
  entities: ['src/**/**.entity.ts'],
  migrations: ['src/database/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts']
};
