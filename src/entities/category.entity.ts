import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import {AlarmCategory} from './alarmCategory.entity';
@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => AlarmCategory, alarmCategory => alarmCategory)
  alarmCategories: AlarmCategory[];
}
