import { Frequencies } from '../../enums/frequency.enum';
import { Progress } from './progress.entity';

export interface Habit {
  habit_id: any;
  progress_id: any;
  date: any;
  status: any;
  id: number;
  name: string;
  description?: string;
  frequency: Frequencies;
  reminderTime: string; // HH:MM
  createdAt: string;
  progress: Progress[];
}
