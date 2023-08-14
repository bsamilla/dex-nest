import { Resolver, Query, Parent, ResolveField } from '@nestjs/graphql';
import { PKMN } from './pkmn.model';
import { PKMNService } from './pkmn.service';
import { varianceID } from 'src/enum';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver(() => PKMN)
export class PKMNResolver {
  constructor(private pkmnService: PKMNService) {}

  @UseGuards(AuthGuard)
  @Query(() => [PKMN])
  getAllPKMN() {
    return this.pkmnService.findAll();
  }

  @ResolveField(() => String)
  spriteURL(@Parent() pkmn: PKMN) {
    const dexNumber = pkmn.dexNumber.toString().padStart(4, '0');
    const variant = pkmn.variantId ?? '';
    const variance = varianceID[pkmn.variance as keyof typeof varianceID] || '';
    return `${process.env.SPRITE_URL}${dexNumber}${variant}${variance}.png`;
  }
}
