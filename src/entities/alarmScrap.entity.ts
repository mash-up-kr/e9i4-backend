import {Alarm} from './alarm.entity';
import {User} from './user.entity';
import {Entity, PrimaryGeneratedColumn, ManyToOne, BaseEntity} from 'typeorm';

@Entity()
export class AlarmScrap extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: bigint;

  @ManyToOne(type => Alarm, alarm => alarm.alarmScraps)
  alarm: Alarm;

  @ManyToOne(type => User, user => user.alarmScraps)
  user: User;
}
