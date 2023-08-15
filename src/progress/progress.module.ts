import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressResolver } from './progress.resolver';
import { ProgressService } from './progress.service';
import { Progress } from './progress.model';
import { Module } from '@nestjs/common';
import { TrainersModule } from 'src/trainers/trainers.module';
import { PKMNModule } from 'src/pkmn/pkmn.module';
import { ChallengeModule } from 'src/challenges/challenge.module';
import { TargetModule } from 'src/target/target.module';

@Module({
  imports: [
    TrainersModule,
    PKMNModule,
    ChallengeModule,
    TargetModule,
    TypeOrmModule.forFeature([Progress]),
  ],
  providers: [ProgressService, ProgressResolver],
  exports: [ProgressService],
})
export class ProgressModule {}
