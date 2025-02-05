import { HabitRepository } from '../domain/repositories/habit.repository';
import { HabitReq } from '../domain/request/habit.request';

export const createHabit = (repository: HabitRepository, data: HabitReq) => {
  return repository.create(data);
};

export const editHabit = (
  repository: HabitRepository,
  data: Partial<HabitReq>,
) => {
  return repository.edit(data);
};

export const getHabits = (repository: HabitRepository) => {
  return repository.getAll();
};

export const deleteHabit = (repository: HabitRepository, id: number) => {
  return repository.delete(id);
};
