import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { ProgressService } from './progress.service';
import { Progress } from './progress.model';

@Resolver()
export class ProgressResolver {
  constructor(private progressService: ProgressService) {}

  @Query(() => [Progress])
  getProgress(
    @Args('trainerId', { type: () => Int }) trainerId: number,
    @Args('challengeId', { type: () => Int }) challengeId: number,
  ) {
    return this.progressService.findAll(trainerId, challengeId);
  }

  @Mutation(() => Progress)
  async updateProgress(
    @Args('trainerId') trainerId: number,
    @Args('challengeId') challengeId: number,
    @Args('pkmnId') pkmnId: number,
  ) {
    const progress = await this.progressService.createOrUpdateProgress(
      trainerId,
      challengeId,
      pkmnId,
    );
    return progress;
  }
}
