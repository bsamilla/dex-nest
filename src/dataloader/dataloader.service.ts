import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { IDataloaders } from './dataloader.interface';
import { ProgressService } from 'src/progress/progress.service';
import { Progress } from 'src/progress/progress.model';

@Injectable()
export class DataloaderService {
  constructor(private readonly progressService: ProgressService) {}

  getLoaders(): IDataloaders {
    const progressLoader = this._createProgressLoader();
    return {
      progressLoader,
    };
  }

  private _createProgressLoader() {
    return new DataLoader<{ trainerId: number; targetId: number }, Progress>(
      async (keys: { trainerId: number; targetId: number }[]) =>
        await this.progressService.getMappedProgressByTarget(keys),
    );
  }
}
