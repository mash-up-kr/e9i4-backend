import express, {application, Request, Response, Router} from 'express';
import apiV1Router from './api/v1';
import fs from 'fs';
import path from 'path';

import AppleAuth from 'apple-auth';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const auth = new AppleAuth(
  {
    client_id: 'kr.co.mashup.e9i4.Rrrr.authentication',
    team_id: 'CHL8Y83Z89',
    key_id: '2HZYGS7RSJ',
    redirect_uri: 'https://apple-auth.example.com/auth',
    scope: 'name',
  },
  fs.readFileSync(path.join(__dirname, '../config/AuthKey.p8')).toString(),
  'text'
);

const router: Router = express.Router();

router.use('/api/v1', apiV1Router);

router.get('/', (req, res) => {
  console.log(Date().toString() + 'GET /');
  console.log(
    fs.readFileSync(path.join(__dirname, '../config/AuthKey.p8')).toString()
  );
  res.send(`<a href="${auth.loginURL()}">Sign in with Apple</a>`);
  // res.send('OK');
});

router.get('/token', (req, res) => {
  res.send(auth._tokenGenerator.generate());
  console.log(
    'con',
    auth._tokenGenerator.generate().then(res => console.log(res))
  );
});

interface User {
  [key: string]: any;
}

router.post('/auth', bodyParser(), async (req, res) => {
  try {
    console.log(Date().toString() + 'GET /auth');
    const response = await auth.accessToken(req.body.code);
    console.log(response);
    const idToken = jwt.decode(response.id_token);

    const user: User = {};
    user.id = idToken.sub;

    if (req.body.user) {
      const {name} = JSON.parse(req.body.user);
      user.name = name;
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.send('An error occurred!');
  }
});

export default router;
