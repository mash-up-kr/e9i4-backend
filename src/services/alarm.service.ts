import {Alarm} from '../entities/alarm.entity';
import {AlarmState} from '../entities/alarmState.entity';
import {Category} from '../entities/category.entity';
import {User} from '../entities/user.entity';

export async function addAlarm(
  title: string,
  description: string,
  isActive: boolean,
  isHidden: boolean,
  alarmType: any,
  id: number,
  categoryIds: number[]
) {
  const alarm: Alarm = new Alarm();
  alarm.title = title;
  alarm.description = description;
  alarm.userId = id;
  await alarm.save();
  const alarmState: AlarmState = new AlarmState();
  alarmState.alarm = alarm;
  alarmState.isActive = isActive;
  alarmState.isHidden = isHidden;
  alarmState.alarmType = alarmType;
  await alarmState.save();

  const categoryEntities: Category[] = [];
  for (const category of categoryIds) {
    const categoryEntity: Category = await Category.findOne({
      where: {
        id: category,
      },
    });
    if (!categoryEntity) {
      throw Error('Category does not exist');
    }
    categoryEntities.push(categoryEntity);
  }
  alarm.categories = categoryEntities;
  await alarm.save();

  const alarmInfo: Alarm = await Alarm.findOne({
    where: {
      id: alarm.id,
    },
    relations: ['user', 'categories', 'alarmState'],
  });
  return alarmInfo;
}

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
    relations: ['user', 'categories', 'alarmState'],
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

export async function updateAlarm(
  id: number,
  title: string,
  description: string,
  isActive: boolean,
  isHidden: boolean,
  alarmType: any
) {
  const alarm: Alarm = await Alarm.findOne({
    where: {id: id},
    relations: ['user', 'categories'],
  });
  const alarmState: AlarmState = await AlarmState.findOne({
    where: {alarmId: id},
  });
  alarm.title = title;
  alarm.description = description;
  alarmState.isActive = isActive;
  alarmState.isHidden = isHidden;
  alarmState.alarmType = alarmType;
  await alarm.save();
  await alarmState.save();
  return alarm;
}

export async function deleteAlarm(id: number) {
  const alarm: Alarm = await Alarm.findOne({
    where: {id: id},
  });
  await alarm.remove();
  return id;
}
