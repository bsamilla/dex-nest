import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { ProgressService } from './progress.service';
import { Progress } from './progress.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/auth/auth.decorator';

@Resolver()
export class ProgressResolver {
  constructor(private progressService: ProgressService) {}

  @Query(() => [Progress])
  @UseGuards(AuthGuard)
  getProgress(
    @Args('challengeId', { type: () => Int }) challengeId: number,
    @GetUser() user: any,
  ) {
    return this.progressService.findAllProgressForTrainerAndChallenge(
      user.id,
      challengeId,
    );
  }

  // @Mutation(() => Progress)
  // async updateProgress(
  //   @Args('trainerId') trainerId: number,
  //   @Args('challengeId') challengeId: number,
  //   @Args('pkmnId') pkmnId: number,
  // ) {
  //   const progress = await this.progressService.createOrUpdateProgress(
  //     trainerId,
  //     challengeId,
  //     pkmnId,
  //   );
  //   return progress;
  // }
}
