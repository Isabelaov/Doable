import { Progress } from '../entities/progress.entity';
import { ProgressReq } from '../request/progress.request';
export interface ProgressRepository {
  create(data: ProgressReq): Promise<void>;
  getAll(): Promise<Progress[]>;
  getFromHabit(habitId: number): Promise<Progress[]>;
}
