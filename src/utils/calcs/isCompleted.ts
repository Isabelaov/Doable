import { DateTime } from 'luxon';
import { Habit } from '../../../core/domain/entities/habit.entity';
import { Frequencies } from '../../../core/enums/frequency.enum';

export function isCompleted(habit: Habit): boolean {
  if (habit.progress.length === 0) {
    return false;
  }

  for (let i of habit.progress) {
    const now = DateTime.now();
    const progressDate = DateTime.fromJSDate(new Date(i.date));

    switch (habit.frequency) {
      case Frequencies.daily:
        return now.toLocaleString() === progressDate.toLocaleString();

      case Frequencies.weekly:
        const startOfWeek = now.startOf('week');
        const endOfWeek = now.endOf('week');

        return +startOfWeek <= +progressDate && +progressDate <= +endOfWeek;

      case Frequencies.monthly:
        return (
          progressDate.month === now.month && progressDate.year === now.year
        );
    }
  }

  return false;
}
