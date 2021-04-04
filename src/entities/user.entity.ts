import {AlarmScrap} from './alarmScrap.entity';
import {Alarm} from './alarm.entity';
import {AlarmLike} from './alarmLike.entity';
import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

export enum PlatformType {
  guest = 'GUEST',
  apple = 'APPLE',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true, nullable: true})
  nickname: string;

  @Column({unique: true})
  sub: string;

  @Column({
    type: 'enum',
    enum: PlatformType,
    default: PlatformType.guest,
    select: false,
  })
  platformType: PlatformType;

  @Column({unique: true, nullable: true, select: false})
  email: string;

  @CreateDateColumn({select: false})
  public createdAt: Date;

  @UpdateDateColumn({select: false})
  public updatedAt: Date;

  @DeleteDateColumn({select: false})
  public deletedAt: Date;

  @OneToMany(() => AlarmScrap, alarmScrap => alarmScrap.alarm)
  alarmScraps: AlarmScrap[];

  @OneToMany(() => Alarm, alarm => alarm.user)
  alarms: Alarm[];

  @OneToMany(() => AlarmLike, alarmLike => alarmLike.alarm)
  alarmLikes: AlarmLike[];
}
