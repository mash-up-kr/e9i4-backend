// 이곳은 req, res만을 관리함 (controller)
// req로부터 params 및 body를 꺼내서 service 영역으로 전달 & service로부터 데이터를 받아옴
import {Request, Response} from 'express';
import {PlatformType} from '../entities/user.entity';
import * as userService from '../services/user.service';
import * as authService from '../services/auth.service';

export async function getUser(req: Request, res: Response) {
  try {
    const sub = String(req.query.sub);
    if (!sub) {
      throw Error("Can't find sub from query string");
    }
    const user = await userService.getUserBySub(sub);
    const accessToken = await authService.createJwtToken(user);
    res.status(200).send({
      data: {
        user: user,
        accessToken: accessToken,
      },
    });
  } catch (err) {
    res.status(500).send('Error while find user');
  }
}

export async function addUser(req: Request, res: Response) {
  try {
    const sub: string = req.body.sub;
    const email: string = req.body.email;
    const nickname: string = req.body.nickname || `user${Date.now()}`;
    const platformType: PlatformType = req.body.platformType;

    if (!sub || !email || !nickname || !platformType) {
      throw Error('Invalid body');
    }
    const user = await userService.addUser(sub, email, nickname, platformType);
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

export async function updateUser(req: Request, res: Response) {
  try {
    const userId = Number(req.user['id']);
    const nickname: string = req.body.nickname;
    if (!nickname) {
      throw Error('Invalid body');
    }
    if (!userId) {
      throw Error("Can't find user from authorization");
    }
    const user = await userService.updateUser(userId, nickname);
    res.status(200).send({
      data: {
        user: user,
      },
    });
  } catch (err) {
    res.status(500).send(`Error while update user (${err.message})`);
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const userId = Number(req.user['id']);
    if (!userId) {
      throw Error("Can't find user from authorization");
    }
    const user = await userService.deleteUser(userId);
    res.status(200).send({
      data: {
        user: user,
      },
    });
  } catch (err) {
    res.status(500).send(`Error while delete user (${err.message})`);
  }
}

export async function getRandomNickname(req: Request, res: Response) {
  try {
    const nickname = await userService.getRandomNickname();
    res.status(200).send({
      data: {
        nickname: nickname,
      },
    });
  } catch (err) {
    res.status(500).send('Error while get random nickname');
  }
}
