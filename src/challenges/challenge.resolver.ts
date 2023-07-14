import { Resolver, Query } from '@nestjs/graphql';
import { Challenge } from './challenge.model';
import { ChallengeService } from './challenge.service';

@Resolver()
export class ChallengeResolver {
  constructor(private challengeService: ChallengeService) {}

  @Query(() => [Challenge])
  getAllChallenges() {
    return this.challengeService.findAll();
  }
}
