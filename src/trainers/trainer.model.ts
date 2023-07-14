import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Challenge } from 'src/challenges/challenge.model';

@ObjectType()
@Entity()
export class Trainer {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  ID: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Challenge, { nullable: true })
  @ManyToOne(() => Challenge)
  challenge?: Challenge;
}
