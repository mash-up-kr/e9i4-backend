import {AlarmScrap} from './alarmScrap.entity';
import {AlarmState} from './alarmState.entity';
import {User} from './user.entity';
import {AlarmCategory} from './alarmCategory.entity';
import {AlarmLike} from './alarmLike.entity';
import {Category} from './category.entity';
import {CalendarCondition} from './calendarCondition.entity';
import {DayOfWeek} from './dayOfWeek.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export class Alarm extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({default: 'iguana.ga/alarm/:key'})
  shareUrl: string;

  @Column({nullable: true, default: null})
  imageUrl: string;

  @Column({default: 0})
  scrapCnt: number;

  @Column({default: false, select: false})
  isDeleted: boolean;

  @Column({default: 0})
  likeCnt: number;

  @Column({nullable: true})
  url: string;

  @Column({nullable: true})
  userId: number;

  @OneToMany(() => AlarmScrap, alarmScrap => alarmScrap.alarm)
  alarmScraps: AlarmScrap[];

  @OneToMany(() => AlarmCategory, alarmCategory => alarmCategory.alarm)
  alarmCategories: AlarmCategory[];

  @OneToMany(() => AlarmLike, alarmLike => alarmLike.alarm)
  alarmLikes: AlarmLike[];

  @ManyToOne(() => User, user => user.alarms, {onDelete: 'CASCADE'})
  user: User;

  @JoinTable()
  users: User[];

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @OneToOne(() => AlarmState, alarmState => alarmState.alarm)
  alarmState: AlarmState;

  @OneToOne(
    () => CalendarCondition,
    calendarCondition => calendarCondition.alarm
  )
  calendarCondition: CalendarCondition;

  @OneToMany(() => DayOfWeek, dayOfWeek => dayOfWeek.alarm)
  dayOfWeeks: DayOfWeek[];
}
