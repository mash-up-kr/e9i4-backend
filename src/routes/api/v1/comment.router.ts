import express, {Router} from 'express';
import * as commentController from '../../../controllers/comment.controller';

const router: Router = express.Router();

router.delete('/:postId/comments/:commentId', commentController.deleteComment);
router.post('/:postId/comments', commentController.addComment);

export default router;
