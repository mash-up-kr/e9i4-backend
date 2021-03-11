import {Request, Response} from 'express';
import * as categoryService from '../services/category.service';

export async function getCategories(req: Request, res: Response) {
  try {
    const categories = await categoryService.getCategories();
    res.status(200).send(categories);
  } catch (err) {
    res.status(500).send('Error while find categories');
  }
}
