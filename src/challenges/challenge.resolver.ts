import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Challenge } from './challenge.model';
import { ChallengeService } from './challenge.service';

@Resolver()
export class ChallengeResolver {
  constructor(private challengeService: ChallengeService) {}

  @Query(() => [Challenge])
  getChallenges() {
    return this.challengeService.findAll();
  }

  @Query(() => Challenge, { nullable: true })
  getChallenge(@Args('id', { type: () => Int }) id: number) {
    return this.challengeService.findById(id);
  }
}
