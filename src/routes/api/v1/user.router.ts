// /api/v1/user/~~~ 라우팅
// 라우터는 HTTP Method + path만을 관리함
import express, {Router} from 'express';
import * as userController from '../../../controllers/user.controller';
import jwtMiddleware from '../../../middlewares/jwtMiddleware';

const router: Router = express.Router();

// router.get('/', userController.getUsers); // GET /api/v1/users
router.post('/', userController.addUser); // POST /api/v1/user
router.get('/', jwtMiddleware, userController.getUser); // GET /api/v1/user/:id

router.put('/', jwtMiddleware, userController.updateUser); // PUT /api/v1/user/:id
router.delete('/', jwtMiddleware, userController.deleteUser); // DELETE /api/v1/user/:id

export default router;
