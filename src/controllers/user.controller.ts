// 이곳은 req, res만을 관리함 (controller)
// req로부터 params 및 body를 꺼내서 service 영역으로 전달 & service로부터 데이터를 받아옴
import {Request, Response} from 'express';
import {PlatformType} from '../entities/user.entity';
import * as userService from '../services/user.service';

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await userService.getUsers();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send('Error while find users');
  }
}

export async function getUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const user = await userService.getUser(id);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send('Error while find user');
  }
}

export async function addUser(req: Request, res: Response) {
  try {
    const nickname: string = req.body.nickname;
    const platformType: PlatformType = req.body.platformType;
    if (!nickname) {
      throw Error('Invalid body');
    }
    const user = await userService.addUser(nickname, platformType);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(`Error while add user (${err.message})`);
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const nickname: string = req.body.nickname;
    if (!nickname) {
      throw Error('Invalid body');
    }
    if (!id) {
      throw Error('Invalid params');
    }
    const user = await userService.updateUser(id, nickname);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(`Error while update user (${err.message})`);
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (!id) {
      throw Error('Invalid params');
    }
    const user = await userService.deleteUser(id);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(`Error while delete user (${err.message})`);
  }
}
