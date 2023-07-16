import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PKMN } from 'src/models';

@ObjectType()
@Entity()
export class Challenge {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [PKMN])
  @ManyToMany(() => PKMN)
  @JoinTable({
    name: 'challenge_pkmn',
    joinColumn: {
      name: 'challenge',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'pkmn',
      referencedColumnName: 'id',
    },
  })
  pkmns: PKMN[];
}
