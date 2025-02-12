import { ProgressRepository } from '../domain/repositories/progress.repository';
import { ProgressReq } from '../domain/request/progress.request';

export const createProgress = (
  repository: ProgressRepository,
  data: ProgressReq,
) => repository.create(data);

export const getProgress = (repository: ProgressRepository) =>
  repository.getAll();

export const getProgressFromHabit = (
  repository: ProgressRepository,
  habitId: number,
) => repository.getFromHabit(habitId);
