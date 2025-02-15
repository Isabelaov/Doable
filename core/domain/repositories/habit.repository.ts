import { Habit } from '../entities/habit.entity';
import { HabitReq } from '../request/habit.request';

export interface HabitRepository {
  create(data: HabitReq): Promise<any>;
  edit(data: HabitReq, id: number): Promise<any>;
  getAll(): Promise<Habit[] | any>;
  delete(id: number): Promise<string>;
  deleteDB(): Promise<void>;
  // getOne(id: number): Promise<Habit>;
}
