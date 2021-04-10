import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import {Alarm} from './alarm.entity';
import {CalendarCondition} from './calendarCondition.entity';

@Entity()
export class DayOfWeek extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column()
  dayOfWeek: number;

  @ManyToOne(() => Alarm, alarm => alarm.dayOfWeeks, {
    onDelete: 'CASCADE',
  })
  alarm: Alarm;
  @ManyToOne(
    () => CalendarCondition,
    calendarCondition => calendarCondition.dayOfWeeks,
    {
      onDelete: 'CASCADE',
    }
  )
  calendarCondition: CalendarCondition;
}
