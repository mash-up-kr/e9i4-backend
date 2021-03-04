// /api/v1 라우팅
import express, {Router} from 'express';
import userRouter from './user.router';
import categoryRouter from './category.router';
import authRouter from './auth.router';

const router: Router = express.Router();

router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/auth', authRouter);

export default router;
