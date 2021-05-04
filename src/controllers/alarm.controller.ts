import {Request, Response} from 'express';
import * as alarmService from '../services/alarm.service';

export async function addAlarm(req: Request, res: Response) {
  try {
    const title: string = req.body.alarm.title;
    const year: number = req.body.alarm.calendarCondition.year;
    const month: number = req.body.alarm.calendarCondition.month;
    const dayOfMonth: number = req.body.alarm.calendarCondition.dayOfMonth;
    const dayOfWeek: number[] =
      req.body.alarm.calendarCondition.dayOfWeeks || [];
    const hour: number = req.body.alarm.calendarCondition.hour;
    const minute: number = req.body.alarm.calendarCondition.minute;
    const second: number = req.body.alarm.calendarCondition.second;
    const description: string = req.body.alarm.description;
    const url: string | null = req.body.alarm.url || null;
    const isActive: boolean = req.body.alarm.alarmState.isActive;
    const isHidden: boolean = req.body.alarm.alarmState.isHidden;
    const alarmType: 'enum' = req.body.alarm.alarmState.alarmType;
    const userId = Number(req.user['id']);
    const categoryIds: number[] = req.body.alarm.categoryIds || [];
    const alarm = await alarmService.addAlarm(
      title,
      year,
      month,
      dayOfMonth,
      dayOfWeek,
      hour,
      minute,
      second,
      description,
      isActive,
      isHidden,
      alarmType,
      userId,
      categoryIds,
      url
    );
    res.status(200).json({data: alarm});
  } catch (err) {
    res.status(500).send(`Error while add alarm (${err.message})`);
  }
}

export async function getAlarm(req: Request, res: Response) {
  try {
    const alarms = await alarmService.getAlarms();
    res.status(200).json({data: alarms});
  } catch (err) {
    res.status(500).send(`Error while get alarm (${err.message})`);
  }
}

export async function getMyAlarm(req: Request, res: Response) {
  try {
    const userId = Number(req.user['id']);
    if (!userId) {
      throw Error('Invalid headers');
    }
    const myAlarms = await alarmService.getMyAlarms(userId);
    res.status(200).json({data: myAlarms});
  } catch (err) {
    res.status(500).send(`Error while get myAlarm (${err.message})`);
  }
}

export async function getIndividualAlarm(req: Request, res: Response) {
  try {
    const alarmId = Number(req.params.alarmId);
    if (!alarmId) {
      throw Error('Invalid params');
    }
    const individualAlarm = await alarmService.getIndividualAlarm(alarmId);
    if (!individualAlarm) {
      throw Error('There is no alarm');
    }
    res.status(200).json({data: individualAlarm});
  } catch (err) {
    res.status(500).send(`Error while get individualAlarm (${err.message})`);
  }
}

export async function getPopularAlarms(req: Request, res: Response) {
  try {
    const limit: number | undefined = req.body.limit;
    const alarms = await alarmService.getPopularAlarms(limit);
    res.status(200).json({data: alarms});
  } catch (err) {
    res.status(500).send(`Error while get popular alarm (${err.message})`);
  }
}

export async function updateAlarm(req: Request, res: Response) {
  try {
    const id = Number(req.params.alarmId);
    if (!id) {
      throw Error('Invalid params');
    }
    const title: string = req.body.title;
    const description: string = req.body.description;
    const url: string | null = req.body.url || null;
    const isActive: boolean = req.body.alarmState.isActive;
    const isHidden: boolean = req.body.alarmState.isHidden;
    const alarmType: 'enum' = req.body.alarmState.alarmType;
    const year: number = req.body.calendarCondition.year;
    const month: number = req.body.calendarCondition.month;
    const dayOfMonth: number = req.body.calendarCondition.dayOfMonth;
    const dayOfWeeks: number[] = req.body.calendarCondition.dayOfWeeks;
    const hour: number = req.body.calendarCondition.hour;
    const minute: number = req.body.calendarCondition.minute;
    const second: number = req.body.calendarCondition.second;
    const categoryIds: number[] = req.body.categoryIds || [];
    if (!description && !isActive && !isHidden && !alarmType) {
      throw Error('Invalid body');
    }
    const alarm = await alarmService.updateAlarm(
      id,
      title,
      description,
      isActive,
      isHidden,
      alarmType,
      year,
      month,
      dayOfMonth,
      dayOfWeeks,
      hour,
      minute,
      second,
      categoryIds,
      url
    );
    res.status(200).json({data: alarm});
  } catch (err) {
    res.status(500).send(`Error while update alarm (${err.message})`);
  }
}

export async function deleteAlarm(req: Request, res: Response) {
  try {
    const id = Number(req.params.alarmId);
    if (!id) {
      throw Error('Invalid params');
    }
    const alarm = await alarmService.deleteAlarm(id);
    res.status(200).json({deleteAlarmId: alarm});
  } catch (err) {
    res.status(500).send(`Error while delete alarm (${err.message})`);
  }
}

export async function toggleLike(req: Request, res: Response) {
  try {
    const alarmId = Number(req.params.alarmId);
    const userId = Number(req.user['id']);
    if (!alarmId || !userId) {
      throw Error('Invalid params');
    }
    const like = await alarmService.toggleLike(userId, alarmId);
    res.status(200).json({like});
  } catch (err) {
    res.status(500).send(`Error while toggle like (${err.message})`);
  }
}
