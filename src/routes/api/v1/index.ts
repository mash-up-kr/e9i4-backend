// /api/v1 라우팅
import express, {Router} from 'express';
import userRouter from './user.router';

const router: Router = express.Router();

router.use('/user', userRouter);

export default router;
