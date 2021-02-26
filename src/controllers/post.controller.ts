// 이곳은 req, res만을 관리함 (controller)
// req로부터 params 및 body를 꺼내서 service 영역으로 전달 & service로부터 데이터를 받아옴
import {Request, Response, NextFunction} from 'express';
import * as postService from '../services/post.service';

export async function getPosts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const posts = await postService.getPosts();
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send('Error while find posts');
  }
}

export async function addPost(req: Request, res: Response, next: NextFunction) {
  try {
    const title: string = req.body.title;
    const content: string = req.body.content;
    const hashtags: string[] = req.body.hashtags || [];
    if (!title || !content) {
      throw Error('Invalid body');
    }
    const post = await postService.addPost(title, content, hashtags);
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send(`Error while add post (${err.message})`);
  }
}

export async function updatePost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    const title: string = req.body.title;
    const content: string = req.body.content;
    if (!title && !content) {
      throw Error('Invalid body');
    }
    if (!id) {
      throw Error('Invalid params');
    }
    const post = await postService.updatePost(id, title, content);
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send(`Error while update post (${err.message})`);
  }
}

export async function deletePost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    if (!id) {
      throw Error('Invalid params');
    }
    const post = await postService.deletePost(id);
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send(`Error while delete post (${err.message})`);
  }
}
