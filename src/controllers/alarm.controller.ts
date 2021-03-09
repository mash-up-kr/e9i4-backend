import {Request, Response, NextFunction} from 'express';
import * as alarmService from '../services/alarm.service';

export async function getAlarm(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const alarms = await alarmService.getAlarms();
    res.status(200).json({data: alarms});
  } catch (err) {
    res.status(500).send(`Error while get alarm (${err.message})`);
  }
}

export async function getMyAlarm(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = Number(req.headers.id);
    if (!userId) {
      throw Error('Invalid headers');
    }
    const myAlarms = await alarmService.getMyAlarms(userId);
    res.status(200).json({data: myAlarms});
  } catch (err) {
    res.status(500).send(`Error while get myAlarm (${err.message})`);
  }
}

export async function getIndividualAlarm(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const alarmId = Number(req.params.alarmId);
    if (!alarmId) {
      throw Error('Invalid params');
    }
    const individualAlarm = await alarmService.getIndividualAlarm(alarmId);
    res.status(200).json({data: individualAlarm});
  } catch (err) {
    res.status(500).send(`Error while get individualAlarm (${err.message})`);
  }
}
