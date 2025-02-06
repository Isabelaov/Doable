import { Frequencies } from '../../enums/frequency.enum';

export interface HabitReq {
  name: string;
  description?: string;
  frequency: Frequencies;
  reminderTime: string;
}
