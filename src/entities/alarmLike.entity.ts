import {Alarm} from './alarm.entity';
import {User} from './user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';

@Entity()
export class AlarmLike extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: bigint;

  @ManyToOne(type => Alarm, alarm => alarm.alarmLikes)
  alarm: Alarm;

  @ManyToOne(type => User, user => user.alarmLikes)
  user: User;
}
