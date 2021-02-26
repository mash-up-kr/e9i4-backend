// /api/v1/user/~~~ 라우팅
// 라우터는 HTTP Method + path만을 관리함
import express, {Router} from 'express';
import * as userController from '../../../controllers/user.controller';

const router: Router = express.Router();

router.get('/', userController.getUsers); // GET /api/v1/users
router.get('/:id', userController.getUser); // GET /api/v1/user/:id
router.post('/', userController.addUser); // POST /api/v1/user
router.put('/:id', userController.updateUser); // PUT /api/v1/user/:id
router.delete('/:id', userController.deleteUser); // DELETE /api/v1/user/:id

export default router;
