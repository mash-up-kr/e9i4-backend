import {Alarm} from './alarm.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
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

  @Column({nullable: true, select: false})
  alarmId: number;

  @Column({
    type: 'enum',
    enum: AlarmType,
    default: AlarmType.bell,
  })
  alarmType = AlarmType;

  @OneToOne(() => Alarm)
  @JoinColumn()
  alarm: Alarm;
}
