import { Module } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainer } from './trainers.model';

@Module({
  imports: [TypeOrmModule.forFeature([Trainer])],
  providers: [TrainersService],
  exports: [TrainersService],
})
export class TrainersModule {}
