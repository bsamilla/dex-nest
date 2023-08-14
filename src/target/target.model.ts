import {
  JoinColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Challenge, PKMN } from 'src/models';
import { Progress } from 'src/progress/progress.model';

@ObjectType()
@Entity()
@Unique(['challenge', 'pkmn'])
export class Target {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Field(() => Challenge)
  @ManyToOne(() => Challenge, (challenge) => challenge.targets, { eager: true })
  @JoinColumn({
    name: 'challenge_id',
  })
  challenge: Challenge;

  @Field(() => PKMN)
  @ManyToOne(() => PKMN, (pkmn) => pkmn.targets, { eager: true })
  @JoinColumn({ name: 'pkmn_id' })
  pkmn: PKMN;

  @Field(() => [Progress])
  @OneToMany(() => Progress, (progress) => progress.target)
  progress: Progress[];
}
