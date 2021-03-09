import express, {Router} from 'express';
import * as alarmController from '../../../controllers/alarm.controller';

const router: Router = express.Router();

router.get('/', alarmController.getAlarm);
router.get('/my', alarmController.getMyAlarm);
router.get('/:alarmId', alarmController.getIndividualAlarm);

export default router;
