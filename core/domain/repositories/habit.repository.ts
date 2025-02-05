import { Habit } from '../entities/habit.entity';
import { HabitReq } from '../request/habit.request';

export interface HabitRepository {
  create(data: HabitReq): Promise<any>;
  edit(data: Partial<HabitReq>): Promise<any>;
  getAll(): Promise<Habit[] | any>;
  delete(id: number): Promise<string>;
  // getOne(id: number): Promise<Habit>;
}
