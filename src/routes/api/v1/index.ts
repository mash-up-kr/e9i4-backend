// /api/v1 라우팅
import express, {Router} from 'express';
import userRouter from './user.router';
import categoryRouter from './category.router';
import alarmRouter from './alarm.router';
import authRouter from './auth.router';
import jwtMiddleware from '../../../middlewares/jwtMiddleware';

const router: Router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use(jwtMiddleware);
router.use('/category', categoryRouter);
router.use('/alarms', alarmRouter);

export default router;
