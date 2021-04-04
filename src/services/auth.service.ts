import {PlatformType, User} from '../entities/user.entity';
import * as jwt from 'jsonwebtoken';
export async function addUser(
  sub: string,
  email: string,
  nickname: string,
  platformType: PlatformType
) {
  const user: User = new User();
  user.sub = sub;
  user.nickname = nickname;
  user.email = email;
  user.platformType = platformType;
  await user.save();
  return user;
}

export async function getUserBySub(sub: string) {
  const user: User = await User.findOne({sub: sub});
  return user;
}

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
