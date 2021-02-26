import {ConnectionOptions} from 'typeorm';

const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'test',
  synchronize: true,
  logging: true,
  entities: ['dist/entities/*.js'],
};

export default connectionOptions;
