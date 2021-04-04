import * as jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

function decodeToken(token) {
  return new Promise((resolve, reject) => {
    if (process.env.JWT_SECRET_KEY === undefined) {
      reject(new Error("Can't find JWT_SECRET_KEY"));
      return;
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
      if (error) reject(error);
      resolve(decoded);
    });
  });
}

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const encodedToken = req.headers['authorization'];
  if (!encodedToken) {
    return res.status(401).send({
      error:
        "Can't find authorization token from headers (Need 'authorization' header)",
    });
  }

  const user = await decodeToken(encodedToken);
  if (Date.now() / 1000 > user['exp']) {
    res.status(401).send({
      error: `Token is expired!! (exp:${user['exp']}, now:${
        Date.now() / 1000
      })`,
    });
    return;
  }
  req.user = user;
  return next();
}
