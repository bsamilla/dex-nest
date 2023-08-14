import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Target } from 'src/target/target.model';

@ObjectType()
@Entity()
export class Challenge {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Target])
  @OneToMany(() => Target, (target) => target.challenge)
  targets: Target[];
}
