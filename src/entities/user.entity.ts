import {AlarmScrap} from './alarmScrap.entity';
import {Alarm} from './alarm.entity';
import {AlarmLike} from './alarmLike.entity';
import {AlarmState} from './alarmState.entity';
import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

export enum PlatformType {
  guest = 'GUEST',
  apple = 'APPLE',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  nickname: string;

  @Column({
    type: 'enum',
    enum: PlatformType,
    default: PlatformType.guest
  })
  platformType: PlatformType;

  @Column({unique: true, nullable: true})
  email: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;

  @OneToMany(type => AlarmScrap, alarmScrap => alarmScrap.alarm)
  alarmScraps: AlarmScrap[];

  @OneToMany(type => Alarm, alarm => alarm.user)
  alarms: Alarm[];

  @OneToMany(type => AlarmLike, alarmLike => alarmLike.alarm)
  alarmLikes: AlarmLike[];

  @ManyToMany(() => AlarmState)
  @JoinTable()
  alarmStates: AlarmState[];
}
