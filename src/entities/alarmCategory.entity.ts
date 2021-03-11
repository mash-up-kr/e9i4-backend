import {Alarm} from './alarm.entity';
import {Category} from './category.entity';
import {Entity, PrimaryGeneratedColumn, ManyToOne, BaseEntity} from 'typeorm';

@Entity()
export class AlarmCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: bigint;

  @ManyToOne(type => Alarm, alarm => alarm.alarmCategories)
  alarm: Alarm;

  @ManyToOne(type => Category, category => category.alarmCategories)
  category: Category;
}
