import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import {Alarm} from './alarm.entity';

@Entity()
export class CalendarCondition extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column({nullable: true})
  year: number;

  @Column({nullable: true})
  month: number;

  @Column({nullable: true})
  dayOfMonth: number;

  @Column({nullable: true})
  hour: number;

  @Column({nullable: true})
  minute: number;

  @Column({nullable: true})
  second: number;

  @Column({nullable: true, select: false})
  alarmId: bigint;

  @OneToOne(() => Alarm)
  @JoinColumn()
  alarm: Alarm;
}
