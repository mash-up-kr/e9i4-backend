import {Alarm} from '../entities/alarm.entity';
import {AlarmState} from '../entities/alarmState.entity';
import {Category} from '../entities/category.entity';
import {User} from '../entities/user.entity';
import {CalendarCondition} from '../entities/calendarCondition.entity';
import {DayOfWeek} from '../entities/dayOfWeek.entity';
import {AlarmLike} from '../entities/alarmLike.entity';

export async function addAlarm(
  title: string,
  year: number,
  month: number,
  dayOfMonth: number,
  dayOfWeek: number[],
  hour: number,
  minute: number,
  second: number,
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
  const calendarCondition: CalendarCondition = new CalendarCondition();
  calendarCondition.alarmId = alarm.id;
  calendarCondition.year = year;
  calendarCondition.month = month;
  calendarCondition.dayOfMonth = dayOfMonth;
  calendarCondition.hour = hour;
  calendarCondition.minute = minute;
  calendarCondition.second = second;
  await calendarCondition.save();

  const dayOfWeekEntities: DayOfWeek[] = [];
  for (const week of dayOfWeek) {
    const dayOfWeekEntity: DayOfWeek = new DayOfWeek();
    dayOfWeekEntity.calendarCondition = calendarCondition;
    dayOfWeekEntity.dayOfWeek = week;
    dayOfWeekEntity.alarm = alarm;
    await dayOfWeekEntity.save();
    dayOfWeekEntities.push(dayOfWeekEntity);
  }

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
    relations: [
      'calendarCondition',
      'calendarCondition.dayOfWeeks',
      'user',
      'categories',
      'alarmState',
    ],
  });
  const dayOfWeekArray = alarmInfo.calendarCondition.dayOfWeeks.map(
    v => v.dayOfWeek
  );
  return {
    ...alarmInfo,
    calendarCondition: {
      ...alarmInfo.calendarCondition,
      dayOfWeeks: dayOfWeekArray,
    },
  };
}

export async function getAlarms() {
  const alarms: Alarm[] = await Alarm.find({
    relations: [
      'user',
      'categories',
      'alarmState',
      'calendarCondition',
      'calendarCondition.dayOfWeeks',
    ],
  });
  const newFormatAlarms = alarms.map(v => ({
    ...v,
    calendarCondition: {
      ...v.calendarCondition,
      dayOfWeeks: v.calendarCondition?.dayOfWeeks.map(v => v.dayOfWeek),
    },
  }));
  return newFormatAlarms;
}

export async function getMyAlarms(userId: number) {
  const user: User = await User.findOne({
    where: {id: userId},
  });
  const myAlarms: Alarm[] = await Alarm.find({
    where: {userId: user},
    relations: [
      'user',
      'categories',
      'alarmState',
      'calendarCondition',
      'calendarCondition.dayOfWeeks',
    ],
  });
  const newFormatAlarms = myAlarms.map(v => ({
    ...v,
    calendarCondition: {
      ...v.calendarCondition,
      dayOfWeeks: v.calendarCondition?.dayOfWeeks.map(v => v.dayOfWeek),
    },
  }));
  return newFormatAlarms;
}

export async function getIndividualAlarm(alarmId: number) {
  const alarm: Alarm = await Alarm.findOne({
    where: {id: alarmId},
    relations: [
      'user',
      'categories',
      'alarmState',
      'calendarCondition',
      'calendarCondition.dayOfWeeks',
    ],
  });
  const dayOfWeekArray = alarm.calendarCondition.dayOfWeeks.map(
    v => v.dayOfWeek
  );
  return {
    ...alarm,
    calendarCondition: {...alarm.calendarCondition, dayOfWeeks: dayOfWeekArray},
  };
}

export async function updateAlarm(
  id: number,
  title: string,
  description: string,
  isActive: boolean,
  isHidden: boolean,
  alarmType: any,
  year: number,
  month: number,
  dayOfMonth: number,
  dayOfWeek: number[],
  hour: number,
  minute: number,
  second: number
) {
  const alarm: Alarm = await Alarm.findOne({
    where: {id: id},
  });
  if (!alarm) {
    throw Error('no alarm');
  }
  const alarmState: AlarmState = await AlarmState.findOne({
    where: {alarmId: id},
  });
  const matchedDayOfWeek: DayOfWeek[] = await DayOfWeek.find({
    where: {alarm: {id: id}},
  });
  const calendarCondition: CalendarCondition = await CalendarCondition.findOne({
    where: {alarmId: id},
  });
  let dayOfWeekEntities: DayOfWeek[] = matchedDayOfWeek;
  // Delete dayOfWeek if it exists in DB but not in request array.
  for (const week of matchedDayOfWeek) {
    if (!dayOfWeek.includes(week.dayOfWeek)) {
      await week.remove();
      dayOfWeekEntities = dayOfWeekEntities.filter(v =>
        dayOfWeek.includes(v.dayOfWeek)
      );
    }
  }
  // Create a new dayOfWeek if does not exist existed in DB but in request array.
  for (const week of dayOfWeek) {
    if (matchedDayOfWeek.findIndex(value => value.dayOfWeek === week) === -1) {
      const dayOfWeekEntity = new DayOfWeek();
      dayOfWeekEntity.dayOfWeek = week;
      dayOfWeekEntity.alarm = alarm;
      dayOfWeekEntity.calendarCondition = calendarCondition;
      await dayOfWeekEntity.save();
      dayOfWeekEntities.push(dayOfWeekEntity);
    }
  }
  alarm.title = title;
  alarm.description = description;
  alarmState.isActive = isActive;
  alarmState.isHidden = isHidden;
  alarmState.alarmType = alarmType;
  // Use JSON.parse and JSON.stringify to deep copy array.
  alarm.dayOfWeeks = JSON.parse(JSON.stringify(dayOfWeekEntities));
  calendarCondition.year = year;
  calendarCondition.month = month;
  calendarCondition.dayOfMonth = dayOfMonth;
  calendarCondition.hour = hour;
  calendarCondition.minute = minute;
  calendarCondition.second = second;

  await alarm.save();
  await alarmState.save();
  await calendarCondition.save();
  const alarmInfo: Alarm = await Alarm.findOne({
    where: {id: id},
    relations: [
      'calendarCondition',
      'calendarCondition.dayOfWeeks',
      'user',
      'categories',
      'alarmState',
    ],
  });
  const dayOfWeekArray = alarmInfo.calendarCondition.dayOfWeeks.map(
    v => v.dayOfWeek
  );
  return {
    ...alarmInfo,
    calendarCondition: {
      ...alarmInfo.calendarCondition,
      dayOfWeeks: dayOfWeekArray,
    },
  };
}

export async function deleteAlarm(id: number) {
  const alarm: Alarm = await Alarm.findOne({
    where: {id: id},
  });
  await alarm.remove();
  return id;
}

export async function toggleLike(userId: number, alarmId: number) {
  // TODO: Need transaction
  const alarm: Alarm = await Alarm.findOne({
    where: {id: alarmId},
    relations: [
      'calendarCondition',
      'calendarCondition.dayOfWeeks',
      'user',
      'categories',
      'alarmState',
    ],
  });
  if (!alarm) {
    throw Error(`Can't find alarm (${alarmId})`);
  }
  const user: User = await User.findOne({
    where: {id: userId},
  });
  if (!user) {
    throw Error(`Can't find user (${userId})`);
  }

  const like = await AlarmLike.findOne({
    where: {alarm: alarm, user: user},
  });

  if (like) {
    // Toggle off
    await like.remove();
    return false;
  } else {
    // Toggle on
    const alarmLike: AlarmLike = new AlarmLike();
    alarmLike.alarm = alarm;
    alarmLike.user = user;
    await alarmLike.save();
    return true;
  }
}
