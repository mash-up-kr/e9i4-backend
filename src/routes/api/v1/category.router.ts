import express, {Router} from 'express';
import * as categoryController from '../../../controllers/category.controller';

const router: Router = express.Router();

router.get('/', categoryController.getCategories); // GET /api/v1/category

export default router;
