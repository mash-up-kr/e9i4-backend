import express, {Router} from 'express';
import * as alarmController from '../../../controllers/alarm.controller';

const router: Router = express.Router();

router.get('/', alarmController.getAlarm);
router.get('/my', alarmController.getMyAlarm);
router.get('/:alarmId', alarmController.getIndividualAlarm);
router.put('/:alarmId', alarmController.updateAlarm);
router.post('/', alarmController.addAlarm);
router.delete('/:alarmId', alarmController.deleteAlarm);
router.post('/:alarmId/like', alarmController.toggleLike);

export default router;
