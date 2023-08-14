import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Progress } from 'src/progress/progress.model';

@ObjectType()
@Entity()
export class Trainer {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field()
  @Column()
  password: string;

  @Field(() => [Progress], { nullable: true })
  @OneToMany(() => Progress, (progress) => progress.trainer)
  targets?: Progress[];
}
