// /api/v1 라우팅
import express, {Router} from 'express';
import postRouter from './post.router';
import commentRouter from './comment.router';

const router: Router = express.Router();

router.use('/post', postRouter);
router.use('/post', commentRouter);

export default router;
