import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  BaseEntity,
  JoinTable,
} from 'typeorm';
import {Comment} from './comment.entity';
import {Hashtag} from './hashtag.entity';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToMany(() => Hashtag)
  @JoinTable()
  hashtags: Hashtag[];

  @OneToMany(type => Comment, comment => comment.post)
  comments: Comment[];
  static id: number;
}
