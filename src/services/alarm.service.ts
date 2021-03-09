import {Alarm} from '../entities/alarm.entity';
import {User} from '../entities/user.entity';

export async function getAlarms() {
  const alarms: Alarm[] = await Alarm.find({
    relations: ['user', 'categories'],
  });
  return alarms;
}

export async function getMyAlarms(userId: number) {
  const user: User = await User.findOne({
    where: {id: userId},
  });
  const myAlarms: Alarm[] = await Alarm.find({
    where: {userId: user},
    relations: ['user', 'categories', 'alarmStates'],
  });
  return myAlarms;
}

export async function getIndividualAlarm(alarmId: number) {
  const alarm: Alarm = await Alarm.findOne({
    where: {id: alarmId},
    relations: ['user', 'categories'],
  });
  return alarm;
}
