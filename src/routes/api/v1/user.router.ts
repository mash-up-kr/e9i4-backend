// /api/v1/user/~~~ 라우팅
// 라우터는 HTTP Method + path만을 관리함
import express, {Router} from 'express';
import * as userController from '../../../controllers/user.controller';
import jwtMiddleware from '../../../middlewares/jwtMiddleware';

const router: Router = express.Router();

router.post('/', userController.addUser); // POST /api/v1/user
router.get('/', userController.getUser); // GET /api/v1/user

router.put('/', jwtMiddleware, userController.updateUser); // PUT /api/v1/user
router.delete('/', jwtMiddleware, userController.deleteUser); // DELETE /api/v1/user

export default router;
