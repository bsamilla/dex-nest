import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Target } from './target.model';
import { TargetService } from './target.service';
import { GetUser } from 'src/auth/auth.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver()
export class TargetResolver {
  constructor(private targetService: TargetService) {}

  @Query(() => [Target])
  @UseGuards(AuthGuard)
  getTargets(
    @Args('challengeId', { type: () => Int }) challengeId: number,
    @GetUser() user: any,
  ) {
    console.log(user);
    return this.targetService.findTargetsForChallenge(challengeId);
  }

  @Query(() => Target, { nullable: true })
  getTarget(@Args('id', { type: () => Int }) id: number) {
    return this.targetService.findById(id);
  }
}
