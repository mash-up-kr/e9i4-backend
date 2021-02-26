import express, {Request, Response, Router} from 'express';
import apiV1Router from './api/v1';

const router: Router = express.Router();

router.use('/api/v1', apiV1Router);
router.get('/', (req: Request, res: Response) => {
  res.send('OK');
});

export default router;
