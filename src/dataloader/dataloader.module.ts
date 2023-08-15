import { Module } from '@nestjs/common';
import { DataloaderService } from './dataloader.service';
import { ProgressService } from 'src/progress/progress.service';
import { ProgressModule } from 'src/progress/progress.module';

@Module({
  imports: [ProgressModule],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
