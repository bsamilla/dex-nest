import DataLoader from 'dataloader';
import { Progress } from 'src/progress/progress.model';

export interface IDataloaders {
  progressLoader: DataLoader<{ trainerId: number; targetId: number }, Progress>;
}
