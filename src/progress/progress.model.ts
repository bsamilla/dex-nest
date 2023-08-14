import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Target, Trainer } from 'src/models';

@ObjectType()
@Entity()
@Unique(['target', 'trainer'])
export class Progress {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Field(() => Target)
  @ManyToOne(() => Target, (target) => target.progress, { eager: true })
  @JoinColumn({ name: 'target_id' })
  target: Target;

  @Field(() => Trainer)
  @ManyToOne(() => Trainer, (trainer) => trainer.targets, { eager: true })
  @JoinColumn({ name: 'trainer_id' })
  trainer: Trainer;
}
