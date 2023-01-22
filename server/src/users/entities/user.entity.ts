import { ApiProperty } from '@nestjs/swagger';

import {
  Column,
  ObjectIdColumn,
  ObjectID,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class Users {
  @ObjectIdColumn()
  id: ObjectID;

  @ApiProperty({ example: 'username, unique', description: 'username login' })
  @Column({ unique: true })
  public username: string;

  @ApiProperty({ example: '....', description: 'password login' })
  @Column()
  public password: string;

  @Column({
    default: true,
  })
  public enabled: boolean;

  @CreateDateColumn({
    default: `now()`,
    nullable: true,
  })
  public created: string;

  @Column({
    nullable: true,
  })
  public created_by: number;

  @CreateDateColumn({
    default: `now()`,
    nullable: true,
  })
  public modified: string;

  @Column({
    nullable: true,
  })
  public modified_by: number;
}
