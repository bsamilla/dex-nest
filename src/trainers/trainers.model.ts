import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Challenge } from 'src/challenges/challenge.model';

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

  @Field(() => Challenge, { nullable: true })
  @ManyToOne(() => Challenge, (challenge) => challenge.id)
  @JoinColumn({ name: 'challenge_id' })
  challenge?: Challenge;
}
