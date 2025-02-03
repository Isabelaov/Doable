export interface Habit {
  id: number;
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  reminderTime: string; // HH:MM:SS
  createdAt: string;
}
