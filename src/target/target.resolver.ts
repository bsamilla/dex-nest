import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { Target } from './target.model';
import { TargetService } from './target.service';
import { GetUser } from 'src/auth/auth.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Progress } from 'src/progress/progress.model';
import { IDataloaders } from 'src/dataloader/dataloader.interface';

@Resolver(() => Target)
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

  @ResolveField('progress', () => [Progress])
  getProgress(
    @Parent() target: Target,
    @Context() { loaders }: { loaders: IDataloaders },
    @GetUser() user: any,
  ) {
    return loaders.progressLoader.load({
      trainerId: user.id,
      targetId: target.id,
    });
  }
}
