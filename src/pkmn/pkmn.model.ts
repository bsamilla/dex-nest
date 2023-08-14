import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Target } from 'src/target/target.model';

@ObjectType()
@Entity()
export class PKMN {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Field(() => Int)
  @Column({
    type: 'integer',
    default: 0,
    name: 'dex_number',
  })
  dexNumber: number;

  @Field()
  @Column()
  name: string;

  @Field(() => String, { nullable: true })
  @Column({
    nullable: true,
    default: null,
  })
  variance?: string;

  @Field(() => String, { nullable: true })
  @Column({
    nullable: true,
    default: null,
    name: 'variant_id',
  })
  variantId?: string;

  @Field(() => String, { nullable: true })
  @Column({
    nullable: true,
    default: null,
    name: 'variant_name',
  })
  variantName?: string;

  @OneToMany(() => Target, (target) => target.pkmn)
  targets: Target[];

  @Field()
  spriteURL: string;
}
