import {User} from '../entities/user.entity';
import * as jwt from 'jsonwebtoken';

export function createJwtToken(user: User) {
  return new Promise((resolve, reject) => {
    if (process.env.JWT_SECRET_KEY === undefined) {
      reject(new Error("Can't find JWT_SECRET_KEY"));
      return;
    }
    const payload = {
      id: user.id,
      nickname: user.nickname,
      email: user.email,
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '300d',
      },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
}
