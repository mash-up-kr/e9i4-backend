import {Request, Response} from 'express';
import {PlatformType} from '../entities/user.entity';
import * as authService from '../services/auth.service';

export async function signUp(req: Request, res: Response) {
  try {
    const sub: string = req.body.sub;
    const email: string = req.body.email;
    const nickname: string = req.body.nickname;
    const platformType: PlatformType = req.body.platformType;

    if (!sub || !email || !nickname || !platformType) {
      throw Error('Invalid body');
    }
    const user = await authService.addUser(sub, email, nickname, platformType);
    const accessToken = await authService.createJwtToken(user);
    res.status(200).send({
      data: {
        user: user,
        accessToken: accessToken,
      },
    });
  } catch (err) {
    res.status(500).send(`Error while sign up (${err.message})`);
  }
}

export async function signIn(req: Request, res: Response) {
  try {
    const sub: string = req.body.sub;
    if (!sub) {
      throw Error('Invalid body');
    }
    const user = await authService.getUserBySub(sub);
    const accessToken = await authService.createJwtToken(user);
    res.status(200).send({
      data: {
        user: user,
        accessToken: accessToken,
      },
    });
  } catch (err) {
    res.status(500).send(`Error while sign in (${err.message})`);
  }
}
