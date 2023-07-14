import { Resolver, Query, Parent, ResolveField } from '@nestjs/graphql';
import { PKMN } from './pkmn.model';
import { PKMNService } from './pkmn.service';
import { varianceID } from 'src/enum';

@Resolver(() => PKMN)
export class PKMNResolver {
  constructor(private pkmnService: PKMNService) {}

  @Query(() => [PKMN])
  getAllPKMN() {
    return this.pkmnService.findAll();
  }

  @ResolveField(() => String)
  async imageURL(@Parent() pkmn: PKMN) {
    return `https://pokejungle.net/sprites/normal/${pkmn.pkmnID
      .toString()
      .padStart(4, '0')}${pkmn.variantID || ''}${
      varianceID[pkmn.variance as keyof typeof varianceID] || ''
    }.png`;
  }
}
