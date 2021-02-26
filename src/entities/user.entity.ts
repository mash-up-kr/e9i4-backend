import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
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
    default: PlatformType.guest,
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
}
