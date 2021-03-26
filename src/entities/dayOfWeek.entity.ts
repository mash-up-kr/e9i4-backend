import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import {Alarm} from './alarm.entity';

@Entity()
export class DayOfWeek extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column()
  dayOfWeek: number;

  @ManyToOne(() => Alarm, alarm => alarm.dayOfWeeks)
  alarm: Alarm;
}
