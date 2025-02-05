export interface HabitReq {
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  reminderTime: string;
}
