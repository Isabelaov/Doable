import { Habit } from '../entities/habit.entity';

export interface HabitRepository {
  create(data: any): Promise<any>;
  edit(data: any): Promise<any>;
  getAll(): Promise<Habit[] | any>;
  delete(id: number): Promise<string>;
  // getOne(id: number): Promise<Habit>;
}
