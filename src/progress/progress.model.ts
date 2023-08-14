import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Challenge, PKMN, Trainer } from 'src/models';

@ObjectType()
@Entity()
export class Progress {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Field(() => [PKMN])
  @ManyToMany(() => PKMN, (pkmn) => pkmn.id, {
    cascade: true,
  })
  @JoinTable({
    name: 'chatched_pkmn',
    joinColumn: {
      name: 'progress_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'pkmn_id',
      referencedColumnName: 'id',
    },
  })
  pkmns: PKMN[];

  @Field(() => Challenge)
  @ManyToOne(() => Challenge, (challenge) => challenge.id)
  @JoinColumn({ name: 'challenge_id' })
  challenge: Challenge;

  @Field(() => Trainer)
  @ManyToOne(() => Trainer, (trainer) => trainer.id)
  @JoinColumn({ name: 'trainer_id' })
  trainer: Trainer;
}
