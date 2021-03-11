import {AlarmScrap} from './alarmScrap.entity';
import {AlarmState} from './alarmState.entity';
import {User} from './user.entity';
import {AlarmCategory} from './alarmCategory.entity';
import {AlarmLike} from './alarmLike.entity';
import {Category} from './category.entity';
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
  cronData: string;

  @Column()
  description: string;

  @Column({default: 'iguana.ga/alarm/:key'})
  shareUrl: string;

  @Column({default: 'iguana.ga/alarm/:key'})
  imageUrl: string;

  @Column({default: 0})
  scrapCnt: number;

  @Column({default: false, select: false})
  isDeleted: boolean;

  @Column({default: 0})
  likeCnt: number;

  @Column({nullable: true})
  userId: number;

  @OneToMany(type => AlarmScrap, alarmScrap => alarmScrap.alarm)
  alarmScraps: AlarmScrap[];

  @OneToMany(type => AlarmCategory, alarmCategory => alarmCategory.alarm)
  alarmCategories: AlarmCategory[];

  @OneToMany(type => AlarmLike, alarmLike => alarmLike.alarm)
  alarmLikes: AlarmLike[];

  @ManyToOne(type => User, user => user.alarms)
  user: User;
  
  @JoinTable()
  users: User[];

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @OneToOne(() => AlarmState, alarmState => alarmState.alarm)
  alarmState: AlarmState
}
