import {Alarm} from './alarm.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';

export enum AlarmType {
  bell = 'BELL',
  vibration = 'VIBRATION',
  silent = 'SILENT',
}

@Entity()
export class AlarmState extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column({default: true})
  isActive: boolean;

  @Column({default: false})
  isHidden: boolean;

  @Column({select: false})
  alarmId: number;

  @Column({
    type: 'enum',
    enum: AlarmType,
    default: AlarmType.bell,
  })
  alarmType = AlarmType;

  @ManyToOne(type => Alarm, alarm => alarm.alarmStates)
  alarm: Alarm;
}
