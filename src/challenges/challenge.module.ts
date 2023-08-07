import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeResolver } from './challenge.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from './challenge.model';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge])],
  providers: [ChallengeService, ChallengeResolver],
  exports: [ChallengeService],
})
export class ChallengeModule {}
