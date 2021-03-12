import {ConnectionOptions} from 'typeorm';

const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'test',
  synchronize: true,
  logging: true,
  entities: ['dist/entities/**/*.js'],
};

export default connectionOptions;
