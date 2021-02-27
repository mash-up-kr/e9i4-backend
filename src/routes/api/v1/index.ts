// /api/v1 라우팅
import express, {Router} from 'express';
import userRouter from './user.router';
import categoryRouter from './category.router';

const router: Router = express.Router();

router.use('/user', userRouter);
router.use('/category', categoryRouter);

export default router;
