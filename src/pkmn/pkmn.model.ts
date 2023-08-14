import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

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

  @Field()
  spriteURL: string;
}
