import {Request, Response, NextFunction} from 'express';
import * as alarmService from '../services/alarm.service';

export async function addAlarm(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cronData: string = req.body.alarm.cronData;
    const title: string = req.body.alarm.title;
    const description: string = req.body.alarm.description;
    const isActive: boolean = req.body.alarm.alarmState.isActive;
    const isHidden: boolean = req.body.alarm.alarmState.isHidden;
    const alarmType: 'enum' = req.body.alarm.alarmState.alarmType;
    const id = Number(req.headers.id);
    const categoryIds: number[] = req.body.categoryIds || [];
    const alarm = await alarmService.addAlarm(
      cronData,
      title,
      description,
      isActive,
      isHidden,
      alarmType,
      id,
      categoryIds
    );
    res.status(200).json({data: alarm});
  } catch (err) {
    res.status(500).send(`Error while add alarm (${err.message})`);
  }
}

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

export async function updateAlarm(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.alarmId);
    if (!id) {
      throw Error('Invalid params');
    }
    const title: string = req.body.title;
    const cronData: string = req.body.cronData;
    const description: string = req.body.description;
    const isActive: boolean = req.body.alarmState.isActive;
    const isHidden: boolean = req.body.alarmState.isHidden;
    const alarmType: 'enum' = req.body.alarmState.alarmType;
    if (!cronData && !description && !isActive) {
      throw Error('Invalid body');
    }
    const alarm = await alarmService.updateAlarm(
      id,
      title,
      cronData,
      description,
      isActive,
      isHidden,
      alarmType
    );
    res.status(200).json({data: alarm});
  } catch (err) {
    res.status(500).send(`Error while update alarm (${err.message})`);
  }
}
