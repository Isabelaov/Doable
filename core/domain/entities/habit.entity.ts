import { Frequencies } from '../../enums/frequency.enum';

export interface Habit {
  id: number;
  name: string;
  description?: string;
  frequency: Frequencies;
  reminderTime: string; // HH:MM
  createdAt: string;
}
