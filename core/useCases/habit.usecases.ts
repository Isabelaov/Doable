import { HabitRepository } from '../domain/repositories/habit.repository';

export const createHabit = (repository: HabitRepository, data: any) => {
  return repository.create(data);
};

export const editHabit = (repository: HabitRepository, data: any) => {
  return repository.edit(data);
};

export const getHabits = (repository: HabitRepository) => {
  return repository.getAll();
};

export const deleteHabit = (repository: HabitRepository, id: number) => {
  return repository.delete(id);
};
