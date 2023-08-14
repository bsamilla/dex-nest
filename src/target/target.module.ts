import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Target } from './target.model';
import { TargetService } from './target.service';
import { TargetResolver } from './target.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Target])],
  providers: [TargetService, TargetResolver],
  exports: [TargetService],
})
export class TargetModule {}
