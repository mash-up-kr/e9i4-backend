import router from './routes';
import connectionOptions from './config/orm_config';
import express, {Application, Request, Response, NextFunction} from 'express';
import {createConnection} from 'typeorm';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import {normalize} from 'path';

//use env_values
dotenv.config();

createConnection(connectionOptions).then(connection => {
  const app: Application = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
  app.use(
    process.env.NODE_ENV === 'production' ? logger('combined') : logger('dev')
  );
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  // Express variables
  app.set('port', normalize(process.env.PORT || '3000'));

  // Routing
  app.use(router);

  // Start server
  app.listen(app.get('port'), () => {
    console.log(
      `!!!App is running at http://localhost:${app.get('port')} in ${app.get(
        'env'
      )} mode!!!`
    );
  });
});
