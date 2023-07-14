import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class PKMN {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  ID: number;

  @Field(() => Int)
  @Column({
    type: 'integer',
    default: 0,
  })
  pkmnID: number;

  @Field()
  @Column()
  pkmnName: string;

  @Field(() => String, { nullable: true })
  @Column({
    nullable: true,
    default: null,
  })
  variance?: string;

  @Field()
  @Column({
    nullable: true,
    default: null,
  })
  variantID?: string;

  @Field(() => String, { nullable: true })
  @Column({
    nullable: true,
    default: null,
  })
  variantName?: string;

  @Field()
  imageURL: string;
}
